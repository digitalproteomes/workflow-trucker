from .project import Sample

PROTOCOLS = {'1': 'clinical_sample', '2': 'single_preparation',
             '3': 'pooling_preparation', '4': 'fractionation_preparation'}


def createSample(sampleJson):
    new_sample = Sample(**sampleJson)

    existing_sample_id = Sample.find_one(
        {"sampleId": int(new_sample.sampleId)})
    existing_sample_name = Sample.find_one({"name": new_sample.name})

    if(existing_sample_id or existing_sample_name):
        return 0
    else:
        new_sample.commit()
        new_sample.dump()
        print("Created: " + new_sample.name)
        return Sample.find_one({"sampleId": int(new_sample.sampleId)})


def updateParentSample(sampleId, parentsampleid):
    sample = Sample.find_one({"sampleId": int(sampleId)})
    if(sample):
        sample.dump()
        sample.parentSampleId = parentsampleid
        sample.commit()
        updated_sample = Sample.find_one({"sampleId": int(sampleId)})
        return 1
    else:
        return 0


def updateSampleName(sampleId, newName):
    sample = Sample.find_one({"sampleId": int(sampleId)})
    if(sample):
        sample.dump()
        sample.name = newName
        sample.commit()
        updated_sample = Sample.find_one({"sampleId": int(sampleId)})
        return 1
    else:
        return 0


def getAllSamples(projectId):
    samples = Sample.find({"projectId": int(projectId)})
    result_samples = []
    for i in samples:
        result_samples.append(i.dump())
    return result_samples


def getSamplesByProjectAndProtocolId(projectId, protocolId):
    samples = Sample.find({"projectId": int(projectId),
                           "protocolId": int(protocolId)})
    result_samples = []
    for i in samples:
        result_samples.append(i.dump())
    return result_samples


def getFractionatedSamples(projectId, parentId):
    samples = Sample.find({"projectId": int(projectId),
                           "parentSampleId": int(parentId),
                           "protocolId": 4})
    result_samples = []
    for i in samples:
        result_samples.append(i.dump())
    return result_samples


def getPooledSamples(projectId, parentId):
    pooledSample = Sample.find_one({"sampleId": int(parentId)})
    samples = {}
    if (pooledSample.protocolId == 3):
        samples = Sample.find({"projectId": int(projectId),
                               "parentSampleId": int(parentId)})
    result_samples = []
    for i in samples:
        result_samples.append(i.dump())
    return result_samples


def getSampleById(id):
    return Sample.find_one({"sampleId": int(id)})


def unlinkSamplesByProtocol(parentId, protocolId):
    samples = Sample.find({"parentSampleId": int(parentId),
                           "protocolId": protocolId})
    for i in samples:
        updateParentSample(i.sampleId, 0)


def deleteSample(id):
    sampleToDelete = Sample.find_one({"sampleId": int(id)})

    protocol = 0
    if (sampleToDelete):
        protocol = sampleToDelete.protocolId

# - when clinical sample: automattically unlink fractionated and individual (updating parentId to 0)
# - when pooled: automattically unlink clinical samples (updating parentId for clinical to 0)

    if(protocol == 3):
        unlinkSamplesByProtocol(sampleToDelete.sampleId, 1)
    elif(protocol == 1):
        unlinkSamplesByProtocol(sampleToDelete.sampleId, 2)
        unlinkSamplesByProtocol(sampleToDelete.sampleId, 4)

    if(sampleToDelete):
        deleted_count = sampleToDelete.delete().deleted_count
        if(deleted_count > 0):
            return 'Deleted ' + str(deleted_count) + ' samples(s)'
        else:
            return 'Could not delete'
    else:
        return 'There is no sample with the id: ' + str(id)


if __name__ == '__main__':
    for i in range(1, 231):
        new_sample = {
            "sampleId": i,
            "name": "PHRT_005_"+str(i)+"_CPAC",
            "projectId": "5",
            "protocolId": "1",
            "protocolName": "clinical_sample"
        }
        createSample(new_sample)
