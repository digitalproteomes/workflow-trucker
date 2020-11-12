from .models import SWATHAnalysis
from bson import ObjectId
import datetime


def createSWATHAnalysis(swaJson):
    new_swa = SWATHAnalysis(**swaJson)
    new_swa = new_swa.commit()

    return SWATHAnalysis.find_one({"id": new_swa.inserted_id}).dump()


def getAllSWATH():
    swas = SWATHAnalysis.find()
    result_swas = []
    for i in swas:
        result_swas.append(i.dump())
    return result_swas


def getSWATHByProject(projectId):
    swas = SWATHAnalysis.find({"projectId": ObjectId(projectId)})
    result_swas = []
    for i in swas:
        result_swas.append(i.dump())
    return result_swas


def getSWATHForMSRun(msRunId):
    swas = SWATHAnalysis.find({"msRunIds": ObjectId(msRunId)})
    result_swas = []
    for i in swas:
        result_swas.append(i.dump())
    return result_swas
