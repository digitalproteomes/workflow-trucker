from .models import MSRun, ClinicalSample
from bson import ObjectId
import datetime


def createMsRun(msrunJson):
    new_msrun = MSRun(**msrunJson)
    new_msrun = new_msrun.commit()

    return MSRun.find_one({"id": new_msrun.inserted_id}).dump()


def getAllMSRunsByProjectId(projectId):
    msruns = MSRun.find({"projectId": ObjectId(projectId)})
    result_msruns = []
    for i in msruns:
        result_msruns.append(i.dump())
    return result_msruns


def getAllMSRunsByProjectAndTag(tag, projectId):
    msruns = MSRun.find({"workflowTag": tag, "projectId": ObjectId(projectId)})
    result_msruns = []
    for i in msruns:
        result_msruns.append(i.dump())
    return result_msruns


def getMsRunsByClinicalSampleId(clinicalSampleId):
    msruns = MSRun.find(
        {"clinicalSamples": ObjectId(clinicalSampleId)})
    result_msruns = []
    for i in msruns:
        result_msruns.append(i.dump())
    return result_msruns


def getMsRunsByMSReadySampleId(msrId):
    msruns = MSRun.find(
        {"msReadySampleId": ObjectId(msrId)})
    result_msruns = []
    for i in msruns:
        result_msruns.append(i.dump())
    return result_msruns


def getMsRun(id):
    return MSRun.find_one({"id": id})


def getMsRunByName(name):
    run = MSRun.find_one({"name": name})
    if(run):
        return run.dump()
    else:
        return None


def updateMSRun(id, msReadySampleId, clinicalSamples, instrumentId, sopFileName, description, instrumentMethod, processingPerson):
    run = MSRun.find_one({"id": ObjectId(id)})
    if(run):
        run.msReadySampleId = msReadySampleId
        run.clinicalSamples = clinicalSamples
        run.instrumentId = instrumentId
        run.sopFileName = sopFileName
        run.description = description
        run.instrumentMethod = instrumentMethod
        run.processingPerson = processingPerson
        run.description = description
        run.commit()
        return MSRun.find_one({"id": ObjectId(id)}).dump()
    else:
        return 0


def deleteMSrun(id):
    runToDelete = MSRun.find_one({"id": ObjectId(id)})

    if(runToDelete):
        deleted_count = runToDelete.delete().deleted_count
        return 1
    else:
        return 0


def augmentMSRunNames(runIds):
    augmentedruns = []

    for i in runIds:
        msRun = getMsRun(ObjectId(i))
        augmentedruns.append({"id": i, "name": msRun['name']})

    return augmentedruns
