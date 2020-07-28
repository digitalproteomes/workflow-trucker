from flask import Blueprint
from flask import Flask, jsonify, request
from flask_api import status
from bson import ObjectId

from persistence import clinicalSampleDAO
from persistence import intermediateSampleDAO
from persistence import msReadySamplesDAO
from persistence import projectDAO


sample_api = Blueprint('sample_api', __name__)

# clinical


@sample_api.route("/sample/clinical/all",  methods=['GET'])
def getAllClinicalSamples():
    samples = clinicalSampleDAO.getAllClinicalSamples()
    return jsonify(samples), status.HTTP_200_OK


@sample_api.route("/sample/clinical",  methods=['GET'])
def getClinicalSamplesByProject():
    projectId = request.args.get('projectId')

    if (projectDAO.getProjectById(projectId)):
        samples = clinicalSampleDAO.getClinicalSamplesByProject(projectId)
        return jsonify(samples), status.HTTP_200_OK
    else:
        return 'Project with id does not exist.', status.HTTP_404_NOT_FOUND


@sample_api.route('/sample/clinical/id', methods=['GET'])
def getClinicalSampleById():
    id = ObjectId(request.args.get('id'))
    sample = clinicalSampleDAO.getClinicalSampleById(id)

    if(sample):
        return jsonify(sample.dump()), status.HTTP_200_OK
    else:
        return 'Clinical Sample with id does not exist.', status.HTTP_404_NOT_FOUND


# intermediate

@sample_api.route("/sample/intermediate",  methods=['GET'])
def getIntermediateSamplesByProject():
    projectId = request.args.get('projectId')

    if (projectDAO.getProjectById(projectId)):
        samples = intermediateSampleDAO.getIntermediateSamplesByProject(
            projectId)
        return jsonify(samples), status.HTTP_200_OK
    else:
        return 'Project with id does not exist.', status.HTTP_404_NOT_FOUND


@sample_api.route('/sample/intermediate/id', methods=['GET'])
def getIntermediateSampleById():
    id = ObjectId(request.args.get('id'))
    sample = intermediateSampleDAO.getIntermediateSampleById(id)

    if(sample):
        return jsonify(sample.dump()), status.HTTP_200_OK
    else:
        return 'Intermediate Sample with id does not exist.', status.HTTP_404_NOT_FOUND


# msready


@sample_api.route("/sample/msready",  methods=['GET'])
def getMsReadySamplesByProject():
    projectId = request.args.get('projectId')

    if (projectDAO.getProjectById(projectId)):
        samples = msReadySamplesDAO.getMsReadySamplesByProject(projectId)
        return jsonify(samples), status.HTTP_200_OK
    else:
        return 'Project with id does not exist.', status.HTTP_404_NOT_FOUND


@sample_api.route('/sample/msready/id', methods=['GET'])
def getMsReadySamplesById():
    id = ObjectId(request.args.get('id'))
    sample = msReadySamplesDAO.getMSReadySampleById(id)

    if(sample):
        return jsonify(sample.dump()), status.HTTP_200_OK
    else:
        return 'Ms Ready Sample with id does not exist.', status.HTTP_404_NOT_FOUND
