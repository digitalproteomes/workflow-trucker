from .project import Sample

PROTOCOLS = {'1': 'clinical_sample', '2': 'single_preparation',
             '3': 'pooling_preparation', '4': 'fractionation_preparation'}


def createSample(sampleJson):
    new_sample = Sample(**sampleJson)
    new_sample.commit()
    new_sample.dump()

    # print("Created: " + new_sample.name)
    return Sample.find_one({"projectId": 5})


def updateParentSample(sampleId, parentsampleid):
    sample = Sample.find_one({"sampleId": int(sampleId)})
    if(sample.sampleId):
        sample.dump()
        sample.parentSampleId = parentsampleid
        sample.commit()
        updated_sample = Sample.find_one({"sampleId": int(sampleId)})
        # print (updated_sample.parentSampleId)
    else:
        print("Sample not found with id: " + sampleId)


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
