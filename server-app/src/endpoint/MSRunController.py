from flask import Blueprint
from flask import Flask, jsonify, request
from flask_api import status
from bson import ObjectId
import datetime


from persistence import MSRunDAO
from persistence import projectDAO
from persistence import artefactDAO
from persistence import clinicalSampleDAO, msReadySamplesDAO
from model.bulkCreateResponseDTO import BulkCreateResponseDTO

msrun_api = Blueprint('msrun_api', __name__)


@msrun_api.route('/msruns/project', methods=['GET'])
def getMSRunsByProjectId():
    projectId = request.args.get('projectId')
    if (projectDAO.getProjectById(projectId)):
        msruns = MSRunDAO.getAllMSRunsByProjectId(projectId)
        for msrun in msruns:
            augmentedClinicalSamples = clinicalSampleDAO.augmentClinicalSampleNames(
                msrun['clinicalSamples'])
            msReadySampleName = msReadySamplesDAO.getMSReadySampleName(
                msrun['msReadySampleId'])
            msrun['clinicalSamples'] = augmentedClinicalSamples
            msrun['msReadySampleName'] = msReadySampleName
        return jsonify(msruns), status.HTTP_200_OK
    else:
        return 'Project with id does not exist.', status.HTTP_404_NOT_FOUND


@msrun_api.route('/msruns', methods=['GET'])
def getMSRunById():
    id = ObjectId(request.args.get('id'))
    msrun = MSRunDAO.getMsRun(id)
    if(msrun):
        msrun = msrun.dump()
        augmentedClinicalSamples = clinicalSampleDAO.augmentClinicalSampleNames(
            msrun['clinicalSamples'])
        msReadySampleName = msReadySamplesDAO.getMSReadySampleName(
            msrun['msReadySampleId'])
        msrun['clinicalSamples'] = augmentedClinicalSamples
        msrun['msReadySampleName'] = msReadySampleName
        return jsonify(msrun), status.HTTP_200_OK
    else:
        return 'MS Run with id does not exist.', status.HTTP_404_NOT_FOUND


@msrun_api.route('/msruns', methods=['DELETE'])
def deleteRun():
    id = request.args.get('id')
    sts = MSRunDAO.deleteMSrun(id)
    if(sts == 0):
        return 'MS Run with id does not exist.', status.HTTP_404_NOT_FOUND
    else:
        return '', status.HTTP_200_OK


@msrun_api.route('/msruns/clinical', methods=['GET'])
def getMsRunsByClinicalSampleId():
    clinicalSampleId = ObjectId(request.args.get('id'))
    if clinicalSampleDAO.getClinicalSampleById(clinicalSampleId):
        msruns = MSRunDAO.getMsRunsByClinicalSampleId(
            clinicalSampleId)
        for ms_run in msruns:
            augmentedClinicalSamples = clinicalSampleDAO.augmentClinicalSampleNames(
                ms_run['clinicalSamples'])
            msReadySampleName = msReadySamplesDAO.getMSReadySampleName(
                ms_run['msReadySampleId'])
            ms_run['clinicalSamples'] = augmentedClinicalSamples
            ms_run['msReadySampleName'] = msReadySampleName
        return jsonify(msruns), status.HTTP_200_OK
    else:
        return 'Clinical Sample with id does not exist.', status.HTTP_404_NOT_FOUND


@msrun_api.route('/msruns', methods=['POST'])
def createMSRuns():
    data = request.json
    msRuns = data.get('samples')
    responseDTO = BulkCreateResponseDTO()

    for i in msRuns:
        msReadySample = msReadySamplesDAO.getMSReadySampleByName(
            i['msReadySampleName'])

        sop = "NA"
        if(msReadySample != None):
            if i['runMode'] == "DIA":
                entry = artefactDAO.getArtefactById(i['SOPDIA'])
                if(entry != None):
                    sop = entry['name']
            elif i['runMode'] == "DDA":
                entry = artefactDAO.getArtefactById(i['SOPDDA'])
                if(entry != None):
                    sop = entry['name']

            description = ""
            if i['description'] != None:
                description = i['description']

            existingMSRun = MSRunDAO.getMsRunByName(i['name'])

            if(existingMSRun != None):
                MSRunDAO.updateMSRun(
                    existingMSRun['id'], msReadySample['id'], msReadySample['clinicalSamples'], i['instrumentId'], sop,
                    description, i['instrumentMethod'], i['processingPerson'])
                responseDTO.appendOverwritten(i['name'])

            else:
                new_msrun = {
                    "clinicalSamples": msReadySample['clinicalSamples'],
                    "msReadySampleId": msReadySample['id'],
                    "name": i['name'],
                    "projectId": i['projectId'],
                    "protocolId": i['runMode'],
                    "instrumentId": i['instrumentId'],
                    "sopFileName": sop,
                    "instrumentMethod": i['instrumentMethod'],
                    "updatedDate": datetime.datetime.now(),
                    "createdDate": datetime.datetime.now(),
                    "workflowTag": "Library Generation",
                    "description": description,
                    "processingPerson": i['processingPerson'],
                }
                new_run = MSRunDAO.createMsRun(new_msrun)
                responseDTO.appendCreateSuccess(i['name'])
        else:
            responseDTO.appendCreateFail(i['name'])

    return responseDTO.toJson(), status.HTTP_200_OK
