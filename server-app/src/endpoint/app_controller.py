import os
from pprint import pprint
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_pymongo import PyMongo

from endpoint.sampleController import sample_api
from endpoint.projectController import project_api
from endpoint.MSRunController import msrun_api
from endpoint.sopController import sop_api
from endpoint.swathAnalysisController import swathanalysis_api
from endpoint.spectralLibraryController import spectrallibraries_api


app = Flask(__name__)
# CORS(app)
# app.config[MONGO_URI] = 'mongodb://localhost:27017/WorkflowDB'
# instance = PyMongo(app)

app.register_blueprint(sample_api)
app.register_blueprint(project_api)
app.register_blueprint(msrun_api)
app.register_blueprint(swathanalysis_api)
app.register_blueprint(spectrallibraries_api)
app.register_blueprint(sop_api)

CORS(app)


# https://stackoverflow.com/a/23542795
# silalbert@sysbc-mac-533 src % python -m endpoint.sample_controller


# def getMongoInstance():
#     return instance


if __name__ == '__main__':
    try:
        if (os.environ['WorkflowEnvironment'] == "Docker"):
            host = '0.0.0.0'
        else:
            host = '127.0.0.1'
    except KeyError:
        host = '127.0.0.1'

    app.run(debug=True, host=host)
