from .models import ClinicalSample, IntermediateSample, MSReadySample
import datetime
from bson import ObjectId


def createIntermediateSample(sampleJson):
    new_sample = IntermediateSample(**sampleJson)

    existing_sample_name = IntermediateSample.find_one(
        {"name": new_sample.name, "projectId": ObjectId(new_sample.projectId)})

    if(existing_sample_name):
        return 0
    else:
        created = new_sample.commit()
        return IntermediateSample.find_one({"id": created.inserted_id}).dump()


def getIntermediateSamplesByProjectAndProtocolId(protocol, projectId):
    samples = IntermediateSample.find({"projectId": ObjectId(projectId),
                                       "protocolName": protocol})
    result_samples = []
    for i in samples:
        result_samples.append(i.dump())
    return result_samples


def getIntermediateSamplesByProject(projectId):
    samples = IntermediateSample.find({"projectId": ObjectId(projectId)})
    result_samples = []
    for i in samples:
        result_samples.append(i.dump())
    return result_samples


def getIntermediateSamplesByClinicalSampleId(clinicalSampleId):
    samples = IntermediateSample.find(
        {"clinicalSamples": ObjectId(clinicalSampleId)})
    result_samples = []
    for i in samples:
        result_samples.append(i.dump())
    return result_samples


def getIntermediateSampleById(id):
    return IntermediateSample.find_one({"id": id})


def augmentIntermediateSampleNames(sampleIds):
    augmentedSamples = []

    for i in sampleIds:
        sample = getIntermediateSampleById(ObjectId(i))
        augmentedSamples.append({"id": i, "name": sample['name']})

    return augmentedSamples


def getIntermediateSampleName(sampleId):
    sample = getIntermediateSampleById(ObjectId(sampleId))
    return sample['name']
