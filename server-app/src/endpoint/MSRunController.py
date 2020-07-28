from flask import Blueprint
from flask import Flask, jsonify, request
from flask_api import status
from bson import ObjectId


from persistence import MSRunDAO
from persistence import projectDAO
from persistence import clinicalSampleDAO

msrun_api = Blueprint('msrun_api', __name__)


@msrun_api.route('/msrun', methods=['GET'])
def getMSRunsByProjectId():
    projectId = request.args.get('projectId')
    if (projectDAO.getProjectById(projectId)):
        msruns = MSRunDAO.getAllMSRunsByProjectId(projectId)
        for s in msruns:
            augmentedClinicalSamples = clinicalSampleDAO.augmentClinicalSampleNames(
                s['clinicalSamples'])
            s['clinicalSamples'] = augmentedClinicalSamples
        return jsonify(msruns), status.HTTP_200_OK
    else:
        return 'Project with id does not exist.', status.HTTP_404_NOT_FOUND


@msrun_api.route('/msrun/id', methods=['GET'])
def getMSRunById():
    id = ObjectId(request.args.get('id'))
    msrun = MSRunDAO.getMsRun(id)
    if(msrun):
        msrun = msrun.dump()
        augmentedClinicalSamples = clinicalSampleDAO.augmentClinicalSampleNames(
            msrun['clinicalSamples'])
        msrun['clinicalSamples'] = augmentedClinicalSamples
        return jsonify(msrun), status.HTTP_200_OK
    else:
        return 'MS Run with id does not exist.', status.HTTP_404_NOT_FOUND


@msrun_api.route('/msrun', methods=['POST'])
def createMSRun():
    data = request.json
    projectId = data.get('projectId')
    name = data.get('name')
    protocolId = data.get('protocolId')
    instrumentId = data.get('instrumentId')
    runCode = data.get('runCode')
    workflowTag = data.get('workflowTag')
    msReadySampleId = data.get('msReadySampleId')
    description = data.get('description')
    processingPerson = data.get('processingPerson')

    new_msrun = {
        "msReadySampleId": msReadySampleId,
        "clinicalSamples": clinicalSamples,
        "name": name,
        "projectId": projectId,
        "protocolId": protocolId,
        "instrumentId": instrumentId,
        "runCode": runCode,
        "updatedDate": datetime.datetime.now(),
        "createdDate": datetime.datetime.now(),
        "workflowTag": workflowTag,
        "processingPerson": processingPerson
    }

    created_ms_run = MSRunDAO.createMsRun(new_msrun)

    return jsonify(created_ms_run), status.HTTP_200_OK


@msrun_api.route('/msrun', methods=['DELETE'])
def deleteRun():
    id = request.args.get('id')
    sts = MSRunDAO.deleteMSrun(id)
    if(sts == 0):
        return 'MS Run with id does not exist.', status.HTTP_404_NOT_FOUND
    else:
        return '', status.HTTP_200_OK
