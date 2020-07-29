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


@sample_api.route("/samples/clinical/project",  methods=['GET'])
def getAllClinicalSamples():
    projectId = request.args.get('projectId')

    if (projectDAO.getProjectById(projectId)):
        samples = clinicalSampleDAO.getClinicalSamplesByProject(projectId)
        return jsonify(samples), status.HTTP_200_OK
    else:
        return 'Project with id does not exist.', status.HTTP_404_NOT_FOUND


@sample_api.route('/samples/clinical', methods=['GET'])
def getClinicalSampleById():
    id = ObjectId(request.args.get('id'))
    sample = clinicalSampleDAO.getClinicalSampleById(id)

    if(sample):
        return jsonify(sample.dump()), status.HTTP_200_OK
    else:
        return 'Clinical Sample with id does not exist.', status.HTTP_404_NOT_FOUND


# intermediate

@sample_api.route("/samples/intermediate/project",  methods=['GET'])
def getIntermediateSamplesByProject():
    projectId = request.args.get('projectId')

    if (projectDAO.getProjectById(projectId)):
        samples = intermediateSampleDAO.getIntermediateSamplesByProject(
            projectId)
        for s in samples:
            augmentedClinicalSamples = clinicalSampleDAO.augmentClinicalSampleNames(
                s['clinicalSamples'])
            s['clinicalSamples'] = augmentedClinicalSamples
        return jsonify(samples), status.HTTP_200_OK
    else:
        return 'Project with id does not exist.', status.HTTP_404_NOT_FOUND


@sample_api.route('/samples/intermediate', methods=['GET'])
def getIntermediateSampleById():
    id = ObjectId(request.args.get('id'))
    sample = intermediateSampleDAO.getIntermediateSampleById(id)

    if(sample):
        sample = sample.dump()
        augmentedClinicalSamples = clinicalSampleDAO.augmentClinicalSampleNames(
            sample['clinicalSamples'])
        sample['clinicalSamples'] = augmentedClinicalSamples
        return jsonify(sample), status.HTTP_200_OK
    else:
        return 'Intermediate Sample with id does not exist.', status.HTTP_404_NOT_FOUND


@sample_api.route('/samples/intermediate/clinical', methods=['GET'])
def getIntermediateSamplesByClinicalSampleId():
    clinicalSampleId = ObjectId(request.args.get('id'))
    if clinicalSampleDAO.getClinicalSampleById(clinicalSampleId):
        samples = intermediateSampleDAO.getIntermediateSamplesByClinicalSampleId(
            clinicalSampleId)
        for s in samples:
            augmentedClinicalSamples = clinicalSampleDAO.augmentClinicalSampleNames(
                s['clinicalSamples'])
            s['clinicalSamples'] = augmentedClinicalSamples
        return jsonify(samples), status.HTTP_200_OK
    else:
        return 'Clinical Sample with id does not exist.', status.HTTP_404_NOT_FOUND


# msready


@sample_api.route("/samples/msready/project",  methods=['GET'])
def getMsReadySamplesByProject():
    projectId = request.args.get('projectId')

    if (projectDAO.getProjectById(projectId)):
        samples = msReadySamplesDAO.getMsReadySamplesByProject(projectId)
        for s in samples:
            augmentedClinicalSamples = clinicalSampleDAO.augmentClinicalSampleNames(
                s['clinicalSamples'])
            s['clinicalSamples'] = augmentedClinicalSamples
        return jsonify(samples), status.HTTP_200_OK
    else:
        return 'Project with id does not exist.', status.HTTP_404_NOT_FOUND


@sample_api.route('/samples/msready', methods=['GET'])
def getMsReadySamplesById():
    id = ObjectId(request.args.get('id'))
    sample = msReadySamplesDAO.getMSReadySampleById(id)

    if(sample):
        sample = sample.dump()
        augmentedClinicalSamples = clinicalSampleDAO.augmentClinicalSampleNames(
            sample['clinicalSamples'])
        sample['clinicalSamples'] = augmentedClinicalSamples
        return jsonify(sample), status.HTTP_200_OK
    else:
        return 'Ms Ready Sample with id does not exist.', status.HTTP_404_NOT_FOUND


@sample_api.route('/samples/msready/clinical', methods=['GET'])
def getMsReadySamplesByClinicalSampleId():
    clinicalSampleId = ObjectId(request.args.get('id'))
    if clinicalSampleDAO.getClinicalSampleById(clinicalSampleId):
        samples = msReadySamplesDAO.getMSReadySamplesByClinicalSampleId(
            clinicalSampleId)
        for s in samples:
            augmentedClinicalSamples = clinicalSampleDAO.augmentClinicalSampleNames(
                s['clinicalSamples'])
            s['clinicalSamples'] = augmentedClinicalSamples
        return jsonify(samples), status.HTTP_200_OK
    else:
        return 'Clinical Sample with id does not exist.', status.HTTP_404_NOT_FOUND
