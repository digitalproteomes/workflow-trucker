from flask import Blueprint
from flask import Flask, jsonify, request
from flask_api import status

from persistence import projectDAO

project_api = Blueprint('project_api', __name__)


@project_api.route('/projects/all', methods=['GET'])
def getAllProjects():
    projects = projectDAO.getAllProjects()
    return jsonify(projects), status.HTTP_200_OK


@project_api.route('/projects', methods=['GET'])
def getProjectById():
    id = request.args.get('id')
    project = projectDAO.getProjectById(id)
    if project:
        return jsonify(project), status.HTTP_200_OK
    else:
        return 'Project with id does not exist.', status.HTTP_404_NOT_FOUND


@project_api.route('/projects', methods=['POST'])
def createProject():
    data = request.json
    id = data.get('id')
    name = data.get('name')
    ownerName = data.get('ownerName')
    ownerORCID = data.get('ownerORCID')
    description = data.get('description')

    new_project = {
        "projectId": id,
        "name": name,
        "ownerName": ownerName,
        "ownerORCID": ownerORCID,
        "description": description,
        "isLocked": "false",
        "updatedDate": datetime.datetime.now(),
        "createdDate": datetime.datetime.now()
    }

    # within this method we have the error
    project = projectDAO.createProject(new_project)
    return jsonify(project), status.HTTP_200_OK


@project_api.route('/projects', methods=['DELETE'])
def deleteProject():
    id = request.args.get('id')
    sts = projectDAO.deleteProject(id)
    if(sts == 0):
        return 'Project with id does not exist.', status.HTTP_404_NOT_FOUND
    else:
        return '', status.HTTP_200_OK


@project_api.route('/projects', methods=['PUT'])
def updateProject():
    data = request.json
    id = data.get('id')
    name = data.get('name')
    ownerName = data.get('ownerName')
    ownerORCID = data.get('ownerORCID')
    description = data.get('description')
    project = projectDAO.updateProject(
        id, name, ownerName, ownerORCID, description)
    if(project == 0):
        return 'Project with id does not exist.', status.HTTP_404_NOT_FOUND
    else:
        return jsonify(project), status.HTTP_200_OK
