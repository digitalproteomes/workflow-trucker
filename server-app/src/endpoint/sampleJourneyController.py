from flask import Blueprint
from flask import Flask, jsonify, request
from flask_api import status
from model.sampleJourney import SampleJourney

from service import sampleJourneyService

sampleJourney_api = Blueprint('sampleJourney_api', __name__)


@sampleJourney_api.route("/sampleJourney/sample",  methods=['GET'])
def getSampleJourney():
    sampleId = request.args.get('sampleId')
    sampleJourney = sampleJourneyService.processSampleJourney(sampleId)
    if (sampleJourney != None):
        return sampleJourney.toJson(), status.HTTP_200_OK
    else:
        return 'Sample with id does not exist.', status.HTTP_404_NOT_FOUND
