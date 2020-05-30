from pprint import pprint
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from persistence import sample_DAO as sampleDAO
from persistence import project_DAO as projectDAO
from flask_cors import CORS
from flask_api import status
import datetime

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
    return jsonify({'projects': projects, 'totalSize': len(projects)}), status.HTTP_200_OK

# samples section


@app.route('/sample', methods=['GET'])
def getAllSamples():
    samples = sampleDAO.getAllSamples(request.args.get('projectId'))
    return jsonify({'samples': samples, 'totalSize': len(samples)}), status.HTTP_200_OK


@app.route('/sample/clinical', methods=['GET'])
def getClinicalSamples():
    projectId = request.args.get('projectId')
    samples = sampleDAO.getSamplesByProjectAndProtocolId(
        projectId, 1)
    return jsonify({'samples': samples, 'totalSize': len(samples)}), status.HTTP_200_OK


@app.route('/sample/individual', methods=['GET'])
def getIndividualSamples():
    projectId = request.args.get('projectId')
    samples = sampleDAO.getSamplesByProjectAndProtocolId(
        projectId, 2)
    return jsonify({'samples': samples, 'totalSize': len(samples)}), status.HTTP_200_OK


@app.route('/sample/pooled', methods=['GET'])
def getPooledSamples():
    projectId = request.args.get('projectId')
    samples = sampleDAO.getSamplesByProjectAndProtocolId(
        projectId, 3)
    return jsonify({'samples': samples, 'totalSize': len(samples)}), status.HTTP_200_OK


@app.route('/sample/fractionated', methods=['GET'])
def getFractionatedSamples():
    projectId = request.args.get('projectId')
    samples = sampleDAO.getSamplesByProjectAndProtocolId(
        projectId, 4)
    return jsonify({'samples': samples, 'totalSize': len(samples)}), status.HTTP_200_OK


@app.route('/sample/fractionated/parent', methods=['GET'])
def getFractionatedSamplesByParent():
    projectId = request.args.get('projectId')
    parentId = request.args.get('parentId')
    samples = sampleDAO.getFractionatedSamples(projectId, parentId)
    return jsonify({'samples': samples, 'totalSize': len(samples)}), status.HTTP_200_OK


@app.route('/sample/clinical/parent', methods=['GET'])
def getClinicalSamplesByParent():
    projectId = request.args.get('projectId')
    parentId = request.args.get('parentId')
    samples = sampleDAO.getPooledSamples(projectId, parentId)
    return jsonify({'samples': samples, 'totalSize': len(samples)}), status.HTTP_200_OK


@app.route('/sample/protocol', methods=['GET'])
def getSamplesByProtocolId():
    projectId = request.args.get('projectId')
    protocolId = request.args.get('protocolId')
    samples = sampleDAO.getSamplesByProjectAndProtocolId(
        projectId, protocolId)
    return jsonify({'samples': samples, 'totalSize': len(samples)}), status.HTTP_200_OK


@app.route('/sample/clinical', methods=['POST'])
def createClinicalSample():
    data = request.json
    projectId = data.get('projectId')
    sampleId = data.get('sampleId')
    name = data.get('name')

    new_sample = {
        "sourceSampleId": sampleId,
        "name": name,
        "projectId": projectId,
        "parentSampleId": 0,
        "protocolId": "1",
        "protocolName": "clinical_sample",
        "updatedDate": datetime.datetime.now(),
        "createdDate": datetime.datetime.now()
    }
    created_sample = sampleDAO.createSample(new_sample)
    if(created_sample == 0):
        return jsonify({'created_sample_id': 'null', 'success': 'false'}), status.HTTP_404_NOT_FOUND
    else:
        return jsonify({'created_sample_id': created_sample.sampleId, 'success': 'true'}), status.HTTP_200_OK


@app.route('/sample/individual', methods=['POST'])
def createIndividualSample():
    data = request.json
    projectId = data.get('projectId')
    name = data.get('name')
    parentSampleId = data.get('parentSampleId')

    new_sample = {
        "sourceSampleId": 0,
        "name": name,
        "projectId": projectId,
        "parentSampleId": parentSampleId,
        "protocolId": "2",
        "protocolName": "single_preparation",
        "updatedDate": datetime.datetime.now(),
        "createdDate": datetime.datetime.now()
    }
    created_sample = sampleDAO.createSample(new_sample)
    if(created_sample == 0):
        return jsonify({'created_sample_id': 'null', 'success': 'false'})
    else:
        return jsonify({'created_sample_id': created_sample.sampleId, 'success': 'true'})


@app.route('/sample/pooled', methods=['POST'])
def createPooledSample():
    data = request.json
    projectId = data.get('projectId')
    id = data.get('id')
    name = data.get('name')
    childSampleIds = data.get('childSampleIds')

    new_sample = {
        "sourceSampleId": 0,
        "name": name,
        "projectId": projectId,
        "protocolId": "3",
        "protocolName": "pooling_preparation",
        "updatedDate": datetime.datetime.now(),
        "createdDate": datetime.datetime.now()
    }

    created_sample = sampleDAO.createSample(new_sample)
    failedIds = []
    if(created_sample != 0):
        for i in childSampleIds:
            if(sampleDAO.updateParentSample(i, id) == 0):
                failedIds.append(i)

    if(created_sample == 0):
        return jsonify({'created_sample_id': 'null', 'success': 'false', 'failed_child_ids': failedIds})
    else:
        return jsonify({'created_sample_id': created_sample.id, 'success': 'true', 'failed_child_ids': failedIds})


@app.route('/sample/fractionated', methods=['POST'])
def createFractionatedSamples():
    data = request.json
    projectId = data.get('projectId')
    parentSampleId = data.get('parentSampleId')
    fractionatedSamples = data.get('fractionatedSamples')

    if (sampleDAO.getSampleById(parentSampleId)):
        successIds = []
        failedIds = []
        for i in fractionatedSamples:
            new_sample = {
                "sourceSampleId": 0,
                "name": i['name'],
                "projectId": projectId,
                "parentSampleId": parentSampleId,
                "protocolId": "4",
                "protocolName": "fractionation_preparation",
                "updatedDate": datetime.datetime.now(),
                "createdDate": datetime.datetime.now()
            }
            if(sampleDAO.createSample(new_sample) != 0):
                successIds.append(i['id'])
            else:
                failedIds.append(i['id'])
        return jsonify({'success': 'true', 'success_child_ids': successIds, 'failed_child_ids': failedIds})
    else:
        return jsonify({'success': 'false', 'message': "Parrent sample does not exist"})


@app.route('/sample/unlink', methods=['PUT'])
def removeFromPooledSample():
    data = request.json
    id = data.get('id')
    if(sampleDAO.updateParentSample(id, 0) == 0):
        return jsonify({'unlinked_sample_id': 'null', 'success': 'false'})
    else:
        return jsonify({'unlinked_sample_id': id, 'success': 'true'})


@app.route('/sample', methods=['PUT'])
def updateSampleName():
    data = request.json
    id = data.get('id')
    newName = data.get('newName')
    if(sampleDAO.updateSampleName(id, newName) == 0):
        return jsonify({'updated_sample_id': 'null', 'success': 'false'}), status.HTTP_204_NO_CONTENT
    else:
        return jsonify({'updatedsample_id': id, 'success': 'true'}), status.HTTP_200_OK


@app.route('/sample', methods=['DELETE'])
def deleteSample():
    id = request.args.get('id')
    message = sampleDAO.deleteSample(id)
    return jsonify({'message': message})


if __name__ == '__main__':
    # please note that binding to 0.0.0.0 may be a big security issue. please research
    app.run(debug=True, host='127.0.0.1')
