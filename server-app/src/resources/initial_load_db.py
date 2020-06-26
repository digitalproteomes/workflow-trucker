import json
from persistence import sample_DAO as sampleDAO
from persistence import project_DAO as projectDAO
from persistence import msrun_DAO as msrunDAO
import datetime
from pymongo import MongoClient

import os


def load_json(datafile):
    with open(datafile) as f:
        return json.load(f)


def insertProject(project):
    print("inserting project")
    projectDAO.createProject(project)


def insertSamples(samples):
    for i in samples:
        if i['protocolId'] == '1':
            insertClinicalSample(i)
        elif i['protocolId'] == '2':
            insertIndividualSample(i)
        elif i['protocolId'] == '3':
            insertPoolingSample(i)
        elif i['protocolId'] == '4':
            insertFractinationSample(i)
        else:
            print("Unkown protocol for sample: " + str(i))


def insertMSRuns(msruns):

    for i in msruns:
        samples = []
        sample_c = sampleDAO.getClinicalSampleBySourceSampleId(
            i['sample_ref']['sampleIdRef'])
        if sampleDAO.getClinicalSampleBySourceSampleId(
                i['sample_ref']['sampleIdRef']):
            mysample = sample_c.dump()
            samples.append(sample_c['id'])
        new_msrun = {
            "samples": samples,
            "name": i['name'],
            "projectId": "5",
            "protocolId": i['protocolId'],
            "instrumentId": i['instrumentId'],
            "updatedDate": datetime.datetime.now(),
            "createdDate": datetime.datetime.now()
        }
        msrunDAO.createMsRun(new_msrun)
        print("Inserted " + i['name'])


def insertClinicalSample(sample):
    print("inserting clinical sample")
    new_sample = {
        "sourceSampleId": sample['id'],
        "name": sample['name'],
        "projectId": "5",
        "protocolId": "1",
        "protocolName": "clinical_sample",
        "updatedDate": datetime.datetime.now(),
        "createdDate": datetime.datetime.now()
    }
    sampleDAO.createSample(new_sample)


def insertIndividualSample(sample):
    print("inserting individual sample")
    parentSample = sampleDAO.getClinicalSampleBySourceSampleId(
        sample['sample_ref']['sampleIdRef'])
    new_sample = {
        "sourceSampleId": 0,
        "name": sample['name'],
        "projectId": "5",
        "parentSampleId": parentSample.id,
        "protocolId": "2",
        "protocolName": "single_preparation",
        "updatedDate": datetime.datetime.now(),
        "createdDate": datetime.datetime.now()

    }
    sampleDAO.createSample(new_sample)


def insertPoolingSample(sample):
    print("inserting pooling sample")
    new_sample = {
        "sourceSampleId": 0,
        "name": sample['name'],
        "projectId": "5",
        "protocolId": "3",
        "protocolName": "pooling_preparation",
        "updatedDate": datetime.datetime.now(),
        "createdDate": datetime.datetime.now()

    }
    parentSample = sampleDAO.createSample(new_sample)

    for i in sample['sample_ref']:
        sample_c = sampleDAO.getClinicalSampleBySourceSampleId(
            i['sampleIdRef']).dump()
        if(sample_c):
            sampleDAO.updateParentSample(sample_c['id'], parentSample['id'])


def insertFractinationSample(sample):
    print("inserting Fractination sample")
    parentSample = sampleDAO.getClinicalSampleBySourceSampleId(
        sample['sample_ref']['sampleIdRef'])
    parentSampleId = 0
    if (parentSample):
        parentSampleId = parentSample.id
    else:
        parentSampleId = sampleDAO.getClinicalSampleBySourceSampleId(1).id
    new_sample = {
        "sourceSampleId": 0,
        "name": sample['name'],
        "projectId": "5",
        "parentSampleId": parentSampleId,
        "protocolId": "4",
        "protocolName": "fractionation_preparation",
        "updatedDate": datetime.datetime.now(),
        "createdDate": datetime.datetime.now()
    }
    sampleDAO.createSample(new_sample)


if __name__ == '__main__':
    try:
        if (os.environ['WorkflowEnvironment'] == "Docker"):
            db = MongoClient('host.docker.internal', 27017)
        else:
            db = MongoClient('localhost', 27017)
    except KeyError:
        db = MongoClient('localhost', 27017)

    client = db  # MongoClient('localhost', 27017)

    # to delete database, uncomment the next line
    dblist = client.list_database_names()
    if "WorkflowDB" in dblist:
        print("The database exists. Deleting and recreating...")
        client.drop_database('WorkflowDB')

    project_json = load_json("resources/sample_project.json")
    new_project = {
        "projectId": "5",
        "name": "CPAC",
        "ownerName": "Patrick Pedrioli",
        "ownerORCID": "0000-0001-6719-9139",
        "description": "MMA Project",
        "isLocked": "false",
        "updatedDate": datetime.datetime.now(),
        "createdDate": datetime.datetime.now()
    }
    insertProject(new_project)
    insertSamples(project_json['sample'])
    # sampleDAO.getSamplesByProjectAndProtocolId('5', '4')
    insertMSRuns(project_json['ms_run'])
