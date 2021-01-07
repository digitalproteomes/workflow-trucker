from flask import Blueprint
from flask import Flask, jsonify, request
from flask_api import status
from bson import ObjectId
import datetime


from persistence import MSRunDAO
from persistence import projectDAO
from persistence import clinicalSampleDAO, msReadySamplesDAO

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
    msg = ""
    not_found_ms_ready = []
    found_ms_ready = []

    for i in msRuns:
        msReadySample = msReadySamplesDAO.getMSReadySampleByName(
            i['msReadySampleName'])
        if(msReadySample != None):
            new_msrun = {
                "clinicalSamples": msReadySample['clinicalSamples'],
                "msReadySampleId": msReadySample['id'],
                "name": i['name'],
                "projectId": i['projectId'],
                "protocolId": i['runMode'],
                "instrumentId": i['instrumentId'],
                "sopFileName": "PHRT_Mass_Spectrometry_SOP",
                "instrumentMethod": i['instrumentMethod'],
                "updatedDate": datetime.datetime.now(),
                "createdDate": datetime.datetime.now(),
                "workflowTag": "Library Generation",
                "description": i['description'],
                "processingPerson": i['processingPerson'],
            }
            new_run = MSRunDAO.createMsRun(new_msrun)
            found_ms_ready.append(i['msReadySampleName'])
        else:
            not_found_ms_ready.append(i['msReadySampleName'])

    if(len(found_ms_ready) > 0):
        msg = 'MS Runs were created successfully for samples with names: ' + \
            str(found_ms_ready) + '.'
    if(len(not_found_ms_ready) > 0):
        msg = msg + ' Inexistent MS Ready Samples that have been discarded: ' + \
            str(not_found_ms_ready) + '.'

    return msg, status.HTTP_200_OK
