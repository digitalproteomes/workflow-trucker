from flask import Blueprint
from flask import Flask, jsonify, request
from flask_api import status

from persistence import spectralLibraryDAO, clinicalSampleDAO, MSRunDAO
from persistence import projectDAO

spectrallibraries_api = Blueprint('spectrallibraries_api', __name__)


@spectrallibraries_api.route("/spectrallibraries/project",  methods=['GET'])
def getAllSpectralLibraries():
    projectId = request.args.get('projectId')

    if (projectDAO.getProjectById(projectId)):
        spec_libs = spectralLibraryDAO.getAllLibrariesForProject(projectId)
        for s in spec_libs:
            augmentedClinicalSamples = clinicalSampleDAO.augmentClinicalSampleNames(
                s['clinicalSamples'])
            augmentedMSRuns = MSRunDAO.augmentMSRunNames(
                s['msRunIds'])
            s['clinicalSamples'] = augmentedClinicalSamples
            s['msRunIds'] = augmentedMSRuns
        return jsonify(spec_libs), status.HTTP_200_OK
    else:
        return 'Project with id does not exist.', status.HTTP_404_NOT_FOUND
