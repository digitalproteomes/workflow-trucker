import json
from persistence import sample_DAO as sampleDAO
from persistence import project_DAO as projectDAO


def load_json(datafile):
    with open(datafile) as f:
        return json.load(f)


def insertProject(project):
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


def insertClinicalSample(sample):
    # print("inserting clinical sample")
    new_sample = {
        "sampleId": sample['id'],
        "name": sample['name'],
        "projectId": "5",
        "protocolId": "1",
        "protocolName": "clinical_sample"
    }
    sampleDAO.createSample(new_sample)


def insertIndividualSample(sample):
    # print("inserting individual sample")
    new_sample = {
        "sampleId": sample['id'],
        "name": sample['name'],
        "projectId": "5",
        "parentSampleId": sample['sample_ref']['sampleIdRef'],
        "protocolId": "2",
        "protocolName": "single_preparation",

    }
    sampleDAO.createSample(new_sample)


def insertPoolingSample(sample):
    # print("inserting clinical sample")
    new_sample = {
        "sampleId": sample['id'],
        "name": sample['name'],
        "projectId": "5",
        "protocolId": "3",
        "protocolName": "pooling_preparation",

    }
    sampleDAO.createSample(new_sample)
    for i in sample['sample_ref']:
        sampleDAO.updateParentSample(i['sampleIdRef'], sample['id'])


def insertFractinationSample(sample):
    print("inserting Fractination sample")
    new_sample = {
        "sampleId": sample['id'],
        "name": sample['name'],
        "projectId": "5",
        "parentSampleId": sample['sample_ref']['sampleIdRef'],
        "protocolId": "4",
        "protocolName": "fractionation_preparation",
    }
    sampleDAO.createSample(new_sample)


if __name__ == '__main__':
    project_json = load_json("resources/sample_project.json")
    new_project = {
        "projectId": "5",
        "name": "CPAC",
        "ownerName": "Patrick Pedrioli",
        "ownerORCID": "0000-0001-6719-9139",
        "description": "MMA Project",
        "isLocked": "false"
    }
    insertProject(new_project)
    insertSamples(project_json['sample'])
    sampleDAO.getSamplesByProjectAndProtocolId('5', '4')
