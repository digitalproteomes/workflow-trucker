from .models import ClinicalSample, IntermediateSample, MSReadySample
import datetime
from bson import ObjectId


def getMsReadySamplesByClinicalSample(clinicalSampleId, projectId):
    samples = MSReadySample.find({"projectId": ObjectId(projectId),
                                  "clinicalSamples": ObjectId(clinicalSampleId)})
    result_samples = []
    for i in samples:
        result_samples.append(i.dump())
    return result_samples


def getMsReadySampleByIntermediateSampleId(intermediateSampleId, projectId):
    samples = MSReadySample.find({"projectId": ObjectId(projectId),
                                  "intermediateSampleId": ObjectId(intermediateSampleId)})
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
    created = new_sample.commit()
    return MSReadySample.find_one({"id": created.inserted_id}).dump()


def getMSReadySampleById(id):
    return MSReadySample.find_one({"id": id})
