from flask import Blueprint
from flask import Flask, jsonify, request
from flask_api import status
from bson import ObjectId
import datetime

from persistence import clinicalSampleDAO
from persistence import intermediateSampleDAO
from persistence import msReadySamplesDAO
from persistence import projectDAO


sample_api = Blueprint('sample_api', __name__)

# clinical


@sample_api.route("/samples/clinical/counter",  methods=['GET'])
def getMaxCounter():
    projectId = request.args.get('projectId')

    if (projectDAO.getProjectById(projectId)):
        sample = clinicalSampleDAO.getMaxCounter(projectId)
        return jsonify({"max_counter": sample['sampleCounter']}), status.HTTP_200_OK
    else:
        return 'Project with id does not exist.', status.HTTP_404_NOT_FOUND


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


@sample_api.route('/samples/clinical', methods=['POST'])
def createClinicalSamples():
    data = request.json
    samples = data.get('samples')
    success_names = []
    for i in samples:
        new_sample = {
            "clinicalSampleCode": i['clinicalSampleCode'],
            "name": i['name'],
            "sampleCounter": i['sampleCounter'],
            "projectId": i['projectId'],
            "processingPerson": i['processingPerson'],
            "description": i['description'],
            "workflowTag": i['workflowTag'],
            "updatedDate": datetime.datetime.now(),
            "createdDate": datetime.datetime.now()
        }
        created_sample = clinicalSampleDAO.createClinicalSample(new_sample)
        if(created_sample == 0):
            msg = 'Sample with name: '+i['name']+' already exists.'
            if(len(success_names) > 0):
                msg = msg+'The correct samples: ' + \
                    str(success_names) + ' have been created.'
            return msg, status.HTTP_400_BAD_REQUEST
        else:
            success_names.append(i['name'])

    return 'The correct samples: '+str(success_names) + ' have been created', status.HTTP_200_OK


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
            # if('parentSamples' in s):
            #     augmentedIntermediateSamples = intermediateSampleDAO.augmentIntermediateSampleNames(
            #         s['parentSamples'])
            #     s['parentSamples'] = augmentedIntermediateSamples
            s['clinicalSamples'] = augmentedClinicalSamples

        return jsonify(samples), status.HTTP_200_OK
    else:
        return 'Project with id does not exist.', status.HTTP_404_NOT_FOUND


@sample_api.route('/samples/intermediate', methods=['GET'])
def getIntermediateSampleById():
    id = ObjectId(request.args.get('id'))
    s = intermediateSampleDAO.getIntermediateSampleById(id)

    if(s):
        s = s.dump()
        augmentedClinicalSamples = clinicalSampleDAO.augmentClinicalSampleNames(
            s['clinicalSamples'])
        # if('parentSamples' in s):
        #     augmentedIntermediateSamples = intermediateSampleDAO.augmentIntermediateSampleNames(
        #         s['parentSamples'])
        #     s['parentSamples'] = augmentedIntermediateSamples
        s['clinicalSamples'] = augmentedClinicalSamples

        return jsonify(s), status.HTTP_200_OK
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
            # augmentedIntermediateSamples = intermediateSampleDAO.augmentIntermediateSampleNames(
            #     s['parentSamples'])
            s['clinicalSamples'] = augmentedClinicalSamples
            # s['parentSamples'] = augmentedIntermediateSamples
        return jsonify(samples), status.HTTP_200_OK
    else:
        return 'Clinical Sample with id does not exist.', status.HTTP_404_NOT_FOUND


@sample_api.route('/samples/intermediate/singleprep', methods=['POST'])
def createSinglePrepSamples():
    data = request.json
    samples = data.get('samples')
    success_names = []
    for i in samples:
        clinicalSample = clinicalSampleDAO.getClinicalSampleById(
            ObjectId(i['clinicalSampleId']))
        is_name = "IS_" + str(clinicalSample['name'])
        new_sample = {
            "clinicalSamples": [i['clinicalSampleId']],
            "name": is_name,
            "projectId": clinicalSample['projectId'],
            "processingPerson": i['processingPerson'],
            "description": i['description'],
            "workflowTag": i['workflowTag'],
            "protocolName": "single_preparation",
            "updatedDate": datetime.datetime.now(),
            "createdDate": datetime.datetime.now()
        }

        created_sample = intermediateSampleDAO.createIntermediateSample(
            new_sample)
        if(created_sample == 0):
            msg = 'Sample with name: ' + is_name+' already exists.'
            if(len(success_names) > 0):
                msg = msg+'The correct samples: ' + \
                    str(success_names) + ' have been created.'
            return msg, status.HTTP_400_BAD_REQUEST
        else:
            success_names.append(created_sample['name'])

    return 'The correct samples: '+str(success_names) + ' have been created', status.HTTP_200_OK
# msready


@sample_api.route("/samples/msready/project",  methods=['GET'])
def getMsReadySamplesByProject():
    projectId = request.args.get('projectId')

    if (projectDAO.getProjectById(projectId)):
        samples = msReadySamplesDAO.getMsReadySamplesByProject(projectId)
        for s in samples:
            augmentedClinicalSamples = clinicalSampleDAO.augmentClinicalSampleNames(
                s['clinicalSamples'])
            intermediateSampleName = intermediateSampleDAO.getIntermediateSampleName(
                s['intermediateSampleId'])
            s['clinicalSamples'] = augmentedClinicalSamples
            s['intermediateSampleName'] = intermediateSampleName
        return jsonify(samples), status.HTTP_200_OK
    else:
        return 'Project with id does not exist.', status.HTTP_404_NOT_FOUND


@sample_api.route('/samples/msready', methods=['GET'])
def getMsReadySamplesById():
    id = ObjectId(request.args.get('id'))
    sample = msReadySamplesDAO.getMSReadySampleById(id)

    if(sample):
        s = sample.dump()
        augmentedClinicalSamples = clinicalSampleDAO.augmentClinicalSampleNames(
            s['clinicalSamples'])
        intermediateSampleName = intermediateSampleDAO.getIntermediateSampleName(
            s['intermediateSampleId'])
        s['clinicalSamples'] = augmentedClinicalSamples
        s['intermediateSampleName'] = intermediateSampleName
        return jsonify(s), status.HTTP_200_OK
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
            intermediateSampleName = intermediateSampleDAO.getIntermediateSampleName(
                s['intermediateSampleId'])
            s['clinicalSamples'] = augmentedClinicalSamples
            s['intermediateSampleName'] = intermediateSampleName
        return jsonify(samples), status.HTTP_200_OK
    else:
        return 'Clinical Sample with id does not exist.', status.HTTP_404_NOT_FOUND
