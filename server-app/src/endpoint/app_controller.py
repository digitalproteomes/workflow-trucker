from pprint import pprint
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from persistence import sample_DAO as sampleDAO
from persistence import project_DAO as projectDAO
from persistence import msrun_DAO as msrunDAO
from flask_cors import CORS
from flask_api import status
import datetime
from bson import ObjectId

app = Flask(__name__)
CORS(app)

# https://stackoverflow.com/a/23542795
# silalbert@sysbc-mac-533 src % python -m endpoint.sample_controller

# TODO split in separate controllers


# msruns section
@app.route('/msruns', methods=['GET'])
def getAllMsRuns():
    msruns = msrunDAO.getAllMSRuns()
    return jsonify(msruns), status.HTTP_200_OK

# project section


@app.route('/test', methods=['GET'])
def getTestResponse():
    return "test response"


@app.route('/project/all', methods=['GET'])
def getAllProjects():
    projects = projectDAO.getAllProjects()
    return jsonify(projects), status.HTTP_200_OK


@app.route('/project', methods=['GET'])
def getProjectById():
    id = request.args.get('id')
    project = projectDAO.getProjectById(id)
    return jsonify(project), status.HTTP_200_OK


@app.route('/project', methods=['POST'])
def createProject():
    data = request.json
    id = data.get('id')
    name = data.get('name')
    ownerName = data.get('ownerName')
    ownerORCID = data.get('ownerORCID')
    description = data.get('description')

    new_project = {
        "projectId": id,
        "name": name,
        "ownerName": ownerName,
        "ownerORCID": ownerORCID,
        "description": description,
        "isLocked": "false",
        "updatedDate": datetime.datetime.now(),
        "createdDate": datetime.datetime.now()
    }

    # within this method we have the error
    project = projectDAO.createProject(new_project)
    return jsonify(project), status.HTTP_200_OK


@app.route('/project', methods=['DELETE'])
def deleteProject():
    id = request.args.get('id')
    sts = projectDAO.deleteProject(id)
    if(sts == 0):
        return 'Project with id does not exist.', status.HTTP_404_NOT_FOUND
    else:
        return '', status.HTTP_200_OK


@app.route('/project', methods=['PUT'])
def updateProject():
    data = request.json
    id = data.get('id')
    name = data.get('name')
    ownerName = data.get('ownerName')
    ownerORCID = data.get('ownerORCID')
    description = data.get('description')
    project = projectDAO.updateProject(
        id, name, ownerName, ownerORCID, description)
    if(project == 0):
        return 'Project with id does not exist.', status.HTTP_404_NOT_FOUND
    else:
        return jsonify(project), status.HTTP_200_OK

# samples section


@app.route('/sample', methods=['GET'])
def getAllSamples():
    samples = sampleDAO.getAllSamples(request.args.get('projectId'))
    return jsonify(samples), status.HTTP_200_OK


@app.route('/sample/clinical', methods=['GET'])
def getClinicalSamples():
    projectId = request.args.get('projectId')
    samples = sampleDAO.getSamplesByProjectAndProtocolId(
        projectId, 1)
    return jsonify(samples), status.HTTP_200_OK


@app.route('/sample/clinical/id', methods=['GET'])
def getClinicalSampleByIds():
    id = ObjectId(request.args.get('id'))
    sample = sampleDAO.getSampleById(id)
    return jsonify(sample.dump()), status.HTTP_200_OK


@app.route('/sample/individual', methods=['GET'])
def getIndividualSamples():
    projectId = request.args.get('projectId')
    samples = sampleDAO.getSamplesByProjectAndProtocolId(
        projectId, 2)
    return jsonify(samples), status.HTTP_200_OK


@app.route('/sample/pooled', methods=['GET'])
def getPooledSamples():
    projectId = request.args.get('projectId')
    samples = sampleDAO.getSamplesByProjectAndProtocolId(
        projectId, 3)
    return jsonify(samples), status.HTTP_200_OK


@app.route('/sample/fractionated', methods=['GET'])
def getFractionatedSamples():
    projectId = request.args.get('projectId')
    samples = sampleDAO.getSamplesByProjectAndProtocolId(
        projectId, 4)
    return jsonify(samples), status.HTTP_200_OK


@app.route('/sample/fractionated/parent', methods=['GET'])
def getFractionatedSamplesByParent():
    projectId = request.args.get('projectId')
    parentId = request.args.get('parentId')
    samples = sampleDAO.getFractionatedSamples(projectId, parentId)
    return jsonify(samples), status.HTTP_200_OK


@app.route('/sample/clinical/parent', methods=['GET'])
def getClinicalSamplesByParent():
    projectId = request.args.get('projectId')
    parentId = request.args.get('parentId')
    samples = sampleDAO.getPooledSamples(projectId, ObjectId(parentId))
    return jsonify(samples), status.HTTP_200_OK


@app.route('/sample/protocol', methods=['GET'])
def getSamplesByProtocolId():
    projectId = request.args.get('projectId')
    protocolId = request.args.get('protocolId')
    samples = sampleDAO.getSamplesByProjectAndProtocolId(
        projectId, protocolId)
    return jsonify(samples), status.HTTP_200_OK


@app.route('/sample/clinical', methods=['POST'])
def createClinicalSample():
    data = request.json
    projectId = data.get('projectId')
    sampleId = data.get('sourceSampleId')
    name = data.get('name')

    new_sample = {
        "sourceSampleId": sampleId,
        "name": name,
        "projectId": projectId,
        "protocolId": "1",
        "protocolName": "clinical_sample",
        "updatedDate": datetime.datetime.now(),
        "createdDate": datetime.datetime.now()
    }
    created_sample = sampleDAO.createClinicalSample(new_sample)
    if(created_sample == 0):
        return 'Source sample id already exists.', status.HTTP_400_BAD_REQUEST
    else:
        return jsonify(created_sample), status.HTTP_200_OK


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
        "parentSampleId": ObjectId(parentSampleId),
        "protocolId": "2",
        "protocolName": "single_preparation",
        "updatedDate": datetime.datetime.now(),
        "createdDate": datetime.datetime.now()
    }
    created_sample = sampleDAO.createIndividualSample(new_sample)
    if(created_sample == -1):
        return 'Parent sample id does not exist.', status.HTTP_404_NOT_FOUND
    elif (created_sample == 0):
        return 'Name already exists.', status.HTTP_400_BAD_REQUEST
    else:
        return jsonify(created_sample), status.HTTP_200_OK


@app.route('/sample/pooled', methods=['POST'])
def createPooledSample():
    data = request.json
    projectId = data.get('projectId')
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
            if(sampleDAO.updateParentSample(ObjectId(i), ObjectId(created_sample['id'])) == 0):
                failedIds.append(i)

    if(created_sample == 0):
        return 'Name already exists.', status.HTTP_400_BAD_REQUEST
    else:
        return jsonify(created_sample), status.HTTP_200_OK


@app.route('/sample/fractionated', methods=['POST'])
def createFractionatedSamples():
    data = request.json
    projectId = data.get('projectId')
    parentSampleId = ObjectId(data.get('parentSampleId'))
    fractionatedSamples = data.get('fractionatedSamples')
    return_samples = []
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
            created_frac_sample = sampleDAO.createSample(new_sample)
            return_samples.append(created_frac_sample)
        return jsonify(return_samples), status.HTTP_200_OK
    else:
        return 'Parent sample id does not exist', status.HTTP_404_NOT_FOUND


@app.route('/sample/unlink', methods=['PUT'])
def removeFromPooledSample():
    data = request.json
    id = data.get('id')
    if(sampleDAO.updateParentSample(ObjectId(id), 0) == 0):
        return 'Sample with id not found', status.HTTP_404_NOT_FOUND
    else:
        return '', status.HTTP_200_OK


@app.route('/sample/link', methods=['PUT'])
def addToPooledSample():
    data = request.json
    id = data.get('id')
    parentSampleId = data.get('parentSampleId')
    if(sampleDAO.updateParentSample(ObjectId(id), ObjectId(parentSampleId)) == 0):
        return jsonify({'message': 'Sample with id not found'}), status.HTTP_404_NOT_FOUND
    else:
        return '', status.HTTP_200_OK


@app.route('/sample', methods=['PUT'])
def updateSampleName():
    data = request.json
    id = data.get('id')
    newName = data.get('newName')
    sample = sampleDAO.updateSampleName(id, newName)
    if(sample == 0):
        return 'Source with id does not exist.', status.HTTP_404_NOT_FOUND
    else:
        return jsonify(sample), status.HTTP_200_OK


@app.route('/sample', methods=['DELETE'])
def deleteSample():
    id = request.args.get('id')
    sts = sampleDAO.deleteSample(id)
    if(sts == 0):
        return 'Sample with id does not exist.', status.HTTP_404_NOT_FOUND
    else:
        return '', status.HTTP_200_OK


if __name__ == '__main__':
    # please note that binding to 0.0.0.0 may be a big security issue. please research
    app.run(debug=True, host='0.0.0.0')
    # debug purposes
    # app.run(debug=True, host='127.0.0.1')
