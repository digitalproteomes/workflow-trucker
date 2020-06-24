from .project import MSRun
from bson import ObjectId


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
