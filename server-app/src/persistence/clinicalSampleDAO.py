from .models import ClinicalSample
import datetime
from bson import ObjectId


def getClinicalSamplesByProject(projectId):
    samples = ClinicalSample.find({"projectId": ObjectId(projectId)})
    result_samples = []
    for i in samples:
        result_samples.append(i.dump())
    return result_samples


def getAllClinicalSamples():
    samples = ClinicalSample.find()
    result_samples = []
    for i in samples:
        result_samples.append(i.dump())
    return result_samples


def getClinicalSampleBySourceSampleId(id):
    return ClinicalSample.find_one({"sourceSampleId": int(id)})


def getClinicalSampleById(id):
    return ClinicalSample.find_one({"id": id})


def deleteSample(id):
    sampleToDelete = Sample.find_one({"id": ObjectId(id)})
    if(sampleToDelete):
        deleted_count = sampleToDelete.delete().deleted_count
        return 1
    else:
        return 0


def createClinicalSample(sampleJson):
    new_sample = ClinicalSample(**sampleJson)

    existing_sample_name = ClinicalSample.find_one(
        {"name": new_sample.name, "projectId": ObjectId(new_sample.projectId)})

    if(existing_sample_name):
        return 0
    else:
        created = new_sample.commit()
        return ClinicalSample.find_one({"id": created.inserted_id}).dump()


def augmentClinicalSampleNames(sampleIds):
    augmentedSamples = []

    for i in sampleIds:
        sample = getClinicalSampleById(ObjectId(i))
        augmentedSamples.append({"id": i, "name": sample['name']})

    return augmentedSamples
