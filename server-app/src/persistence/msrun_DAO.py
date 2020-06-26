from .project import MSRun, Sample
from bson import ObjectId
import datetime


def createMsRun(msrunJson):
    new_msrun = MSRun(**msrunJson)
    new_msrun = new_msrun.commit()

    return MSRun.find_one({"id": new_msrun.inserted_id}).dump()


def getAllMSRuns():
    msruns = MSRun.find()
    result_msruns = []
    for i in msruns:
        result_msruns.append(i.dump())
    return result_msruns


def getMsRun(id):
    ms_run = MSRun.find_one({"id": id})
    if(ms_run):
        return ms_run.dump()
    else:
        return None


def deleteMSrun(id):
    runToDelete = MSRun.find_one({"id": ObjectId(id)})

    if(runToDelete):
        deleted_count = runToDelete.delete().deleted_count
        return 1
    else:
        return 0


def addSampleToRun(msRunId, sampleId):
    runToUpdate = MSRun.find_one({"id": ObjectId(msRunId)})
    sample = Sample.find_one({"id": ObjectId(sampleId)})

    if(sample and runToUpdate):
        runToUpdate.dump()

        samples = runToUpdate.samples
        samples.append(sampleId)
        runToUpdate.samples = samples

        runToUpdate.updatedDate = datetime.datetime.now()

        runToUpdate.commit()
        updated_run = MSRun.find_one({"id": ObjectId(msRunId)})
        return 1
    else:
        return 0


def removeSampleFromRun(msRunId, sampleId):
    runToUpdate = MSRun.find_one({"id": ObjectId(msRunId)})
    sample = Sample.find_one({"id": ObjectId(sampleId)})

    if(sample and runToUpdate):
        runToUpdate.dump()

        samples = runToUpdate.samples
        samples.remove(sampleId)
        runToUpdate.samples = samples

        runToUpdate.updatedDate = datetime.datetime.now()

        runToUpdate.commit()
        updated_run = MSRun.find_one({"id": ObjectId(msRunId)})
        return 1
    else:
        return 0
