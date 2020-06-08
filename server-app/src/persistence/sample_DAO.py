from .project import Sample
import datetime
from bson import ObjectId

PROTOCOLS = {'1': 'clinical_sample', '2': 'single_preparation',
             '3': 'pooling_preparation', '4': 'fractionation_preparation'}


def createClinicalSample(sampleJson):
    new_sample = Sample(**sampleJson)

    existing_sample_id = Sample.find_one(
        {"sourceSampleId": int(new_sample.sourceSampleId)})
    existing_sample_name = Sample.find_one({"name": new_sample.name})

    if((new_sample.sourceSampleId != 0 and existing_sample_id) or existing_sample_name):
        return 0
    else:
        created = new_sample.commit()
        return Sample.find_one({"id": created.inserted_id}).dump()


def createIndividualSample(sampleJson):
    new_sample = Sample(**sampleJson)

    existing_parent_sample = Sample.find_one(
        {"id": ObjectId(new_sample.parentSampleId)})
    existing_sample_name = Sample.find_one({"name": new_sample.name})
    if(existing_sample_name):
        return 0
    elif (existing_parent_sample):
        created = new_sample.commit()
        return Sample.find_one({"id": created.inserted_id}).dump()
    else:
        return -1


def createSample(sampleJson):
    new_sample = Sample(**sampleJson)

    existing_sample_name = Sample.find_one({"name": new_sample.name})

    if(existing_sample_name):
        return 0
    else:
        created = new_sample.commit()
        return Sample.find_one({"id": created.inserted_id}).dump()


def updateParentSample(id, parentSampleId):
    sample = Sample.find_one({"id": id})
    if(sample):
        sample.dump()
        if(parentSampleId == 0):
            sample.parentSampleId = None
        else:
            sample.parentSampleId = parentSampleId
        sample.updatedDate = datetime.datetime.now()
        sample.commit()
        updated_sample = Sample.find_one({"id": id})
        return 1
    else:
        return 0


def updateSampleName(id, newName):
    sample = Sample.find_one({"id": ObjectId(id)})
    if(sample):
        sample.dump()
        sample.name = newName
        sample.commit()
        updated_sample = Sample.find_one({"id":  ObjectId(id)})
        return updated_sample.dump()
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
                           "parentSampleId": ObjectId(parentId),
                           "protocolId": 4})
    result_samples = []
    for i in samples:
        result_samples.append(i.dump())
    return result_samples


def getPooledSamples(projectId, parentId):
    pooledSample = Sample.find_one({"id": parentId})
    samples = {}
    if (pooledSample and pooledSample.protocolId == 3):
        samples = Sample.find({"projectId": int(projectId),
                               "parentSampleId": parentId})
    result_samples = []
    for i in samples:
        result_samples.append(i.dump())
    return result_samples


def getSampleById(id):
    return Sample.find_one({"id": id})


def getClinicalSampleBySourceSampleId(id):
    return Sample.find_one({"sourceSampleId": int(id)})


def unlinkSamplesByProtocol(parentId, protocolId):
    samples = Sample.find({"parentSampleId": ObjectId(parentId),
                           "protocolId": protocolId})
    for i in samples:
        updateParentSample(i.id, 0)


def deleteSample(id):
    sampleToDelete = Sample.find_one({"id": ObjectId(id)})

    protocol = 0
    if (sampleToDelete):
        protocol = sampleToDelete.protocolId

# - when clinical sample: automattically unlink fractionated and individual (updating parentId to 0)
# - when pooled: automattically unlink clinical samples (updating parentId for clinical to 0)
# TODO cascade delete fractionated samples for clinical samples!!

    if(protocol == 3):
        unlinkSamplesByProtocol(sampleToDelete.id, 1)
    elif(protocol == 1):
        unlinkSamplesByProtocol(sampleToDelete.id, 2)
        unlinkSamplesByProtocol(sampleToDelete.id, 4)

    if(sampleToDelete):
        deleted_count = sampleToDelete.delete().deleted_count
        return 1
    else:
        return 0


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
