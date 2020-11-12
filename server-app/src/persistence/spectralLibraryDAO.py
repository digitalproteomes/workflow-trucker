from .models import SpectralLibrary
from bson import ObjectId
import datetime


def createSpectralLibrary(splJson):
    new_spl = SpectralLibrary(**splJson)
    new_spl = new_spl.commit()

    return SpectralLibrary.find_one({"id": new_spl.inserted_id}).dump()


def getAllLibrariesForProject(projectId):
    spls = SpectralLibrary.find({"projectId": ObjectId(projectId)})
    result_spls = []
    for i in spls:
        result_spls.append(i.dump())
    return result_spls


def getLibrariesForMSRun(msRunId):
    spls = SpectralLibrary.find({"msRunIds": ObjectId(msRunId)})
    result_spls = []
    for i in spls:
        result_spls.append(i.dump())
    return result_spls
