from pprint import pprint
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from persistence import sample_DAO as sampleDAO
from persistence import project_DAO as projectDAO
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# https://stackoverflow.com/a/23542795
# silalbert@sysbc-mac-533 src % python -m endpoint.sample_controller

# TODO split in separate controllers

# project section

@app.route('/test', methods=['GET'])
def getTestResponse():
    return "test response"

@app.route('/project', methods=['GET'])
def getAllProjects():
    projects = projectDAO.getAllProjects()
    return jsonify({'projects': projects, 'totalSize': len(projects)})

# samples section


@app.route('/sample', methods=['GET'])
def getAllSamples():
    samples = sampleDAO.getAllSamples(request.args.get('projectId'))
    return jsonify({'samples': samples, 'totalSize': len(samples)})


@app.route('/sample/protocol', methods=['GET'])
def getSamplesByProtocolId():
    projectId = request.args.get('projectId')
    protocolId = request.args.get('protocolId')
    samples = sampleDAO.getSamplesByProjectAndProtocolId(
        projectId, protocolId)
    # todo - the projectId is string, and the protocolId is number. These should be consistent
    # todo - projectId in this case is redundant, if possible it should be dropped from the return DTO
    return jsonify({'samples': samples, 'totalSize': len(samples)})


@app.route('/sample/fractionated', methods=['GET'])
def getFractionatedSamples():
    projectId = request.args.get('projectId')
    parentId = request.args.get('parentId')
    samples = sampleDAO.getFractionatedSamples(projectId, parentId)
    return jsonify({'samples': samples, 'totalSize': len(samples)})


@app.route('/sample/pooled', methods=['GET'])
def getPooledSamples():
    projectId = request.args.get('projectId')
    parentId = request.args.get('parentId')
    samples = sampleDAO.getPooledSamples(projectId, parentId)
    return jsonify({'samples': samples, 'totalSize': len(samples)})


if __name__ == '__main__':
    # please note that binding to 0.0.0.0 may be a big security issue. please research
    app.run(debug=True, host='0.0.0.0')
