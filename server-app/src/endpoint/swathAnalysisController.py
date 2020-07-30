from flask import Blueprint
from flask import Flask, jsonify, request
from flask_api import status

from persistence import swathAnalysisDAO, clinicalSampleDAO, MSRunDAO
from persistence import projectDAO

swathanalysis_api = Blueprint('swathanalysis_api', __name__)


@swathanalysis_api.route("/swathanalyses/project",  methods=['GET'])
def getAllSwathAnalysis():
    projectId = request.args.get('projectId')

    if (projectDAO.getProjectById(projectId)):
        swath_analysis = swathAnalysisDAO.getSWATHByProject(projectId)
        for s in swath_analysis:
            augmentedClinicalSamples = clinicalSampleDAO.augmentClinicalSampleNames(
                s['clinicalSamples'])
            augmentedMSRuns = MSRunDAO.augmentMSRunNames(
                s['msRunIds'])
            s['clinicalSamples'] = augmentedClinicalSamples
            s['msRunIds'] = augmentedMSRuns
        return jsonify(swath_analysis), status.HTTP_200_OK
    else:
        return 'Project with id does not exist.', status.HTTP_404_NOT_FOUND
