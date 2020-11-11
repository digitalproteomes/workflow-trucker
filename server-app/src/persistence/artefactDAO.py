from .models import Artefact
from bson import ObjectId
import datetime


def createArtefact(splJson):
    new_spl = Artefact(**splJson)
    new_spl = new_spl.commit()

    return Artefact.find_one({"id": new_spl.inserted_id}).dump()


def getAllArtefacts(projectId):
    spls = Artefact.find({"projectId": ObjectId(projectId)})
    result_spls = []
    for i in spls:
        result_spls.append(i.dump())
    return result_spls


def getArtefactsByType(projectId, artefactClass):
    spls = Artefact.find({"projectId": ObjectId(
        projectId), "artefactClass": artefactClass})
    result_spls = []
    for i in spls:
        result_spls.append(i.dump())
    return result_spls


def deleteSOP(id):
    sopToDelete = Artefact.find_one({"id": ObjectId(id)})

    if(sopToDelete):
        deleted_count = sopToDelete.delete().deleted_count
        return deleted_count
    else:
        return 0


def getArtefactByFilename(artefactName):
    return Artefact.find_one({"sopFileName": artefactName})
