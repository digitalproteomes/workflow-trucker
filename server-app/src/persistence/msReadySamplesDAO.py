from .models import ClinicalSample, IntermediateSample, MSReadySample
import datetime
from bson import ObjectId


def getMsReadySamplesByClinicalSample(clinicalSampleId):
    samples = MSReadySample.find(
        {"clinicalSamples": ObjectId(clinicalSampleId)})
    result_samples = []
    for i in samples:
        result_samples.append(i.dump())
    return result_samples


def getMsReadySampleByIntermediateSampleId(intermediateSampleId,):
    samples = MSReadySample.find(
        {"intermediateSampleId": ObjectId(intermediateSampleId)})
    result_samples = []
    for i in samples:
        result_samples.append(i.dump())
    return result_samples


def getMsReadySamplesByProject(projectId):
    samples = MSReadySample.find({"projectId": ObjectId(projectId)
                                  })
    result_samples = []
    for i in samples:
        result_samples.append(i.dump())
    return result_samples


def createMSReadySample(sampleJson):
    new_sample = MSReadySample(**sampleJson)

    existing_sample_name = MSReadySample.find_one(
        {"name": new_sample.name, "projectId": ObjectId(new_sample.projectId)})

    if(existing_sample_name):
        return 0
    else:
        created = new_sample.commit()
        return MSReadySample.find_one({"id": created.inserted_id}).dump()


def getMSReadySampleById(id):
    return MSReadySample.find_one({"id": id})


def getMSReadySamplesByClinicalSampleId(clinicalSampleId):
    samples = MSReadySample.find(
        {"clinicalSamples": ObjectId(clinicalSampleId)})
    result_samples = []
    for i in samples:
        result_samples.append(i.dump())
    return result_samples


def augmentMSReadySampleNames(sampleIds):
    augmentedSamples = []

    for i in sampleIds:
        sample = getMSReadySampleById(ObjectId(i))
        augmentedSamples.append({"id": i, "name": sample['name']})

    return augmentedSamples


def getMSReadySampleName(sampleId):
    sample = getMSReadySampleById(ObjectId(sampleId))
    return sample['name']
