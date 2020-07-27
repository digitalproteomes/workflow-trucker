import json
from persistence import sample_DAO as sampleDAO
from persistence import project_DAO as projectDAO
from persistence import msrun_DAO as msrunDAO
from persistence import speclib_DAO as speclibDAO
from persistence import swathanalysis_DAO as swathanalysisDAO
import datetime
from pymongo import MongoClient
import re

import os


def load_json(datafile):
    with open(datafile) as f:
        return json.load(f)


def insertProject(project):
    return projectDAO.createProject(project)


def insertSamples(samples, projectId):
    for i in samples:
        if i['protocolId'] == '1':
            insertClinicalSample(i, projectId)
        elif i['protocolId'] == '2':
            insertIndividualSample(i, projectId)
        elif i['protocolId'] == '3':
            insertPoolingSample(i, projectId)
        elif i['protocolId'] == '4':
            insertFractinationSample(i, projectId)
        else:
            print("Unkown protocol for sample: " + str(i))


def insertMSRuns(msruns, projectId):
    # all_ms_ready_samples = sampleDAO.getAllMsReadySamples(projectId)
    # print("All: " + str(len(all_ms_ready_samples)))
    for i in msruns:
        x = re.search("^sgoetze_A1*", i['name'])
        if x:
            samples = []
            sample_c = sampleDAO.getClinicalSampleBySourceSampleId(
                i['sample_ref']['sampleIdRef'])
            if sample_c != None:
                msrs = sampleDAO.getMsReadySamplesByClinicalSample(
                    sample_c['id'], projectId)

            for msr in msrs:
                if len(msr['clinicalSamples']) == 1:
                    new_msrun = {
                        "runId": i['id'],
                        "clinicalSamples": msr['clinicalSamples'],
                        "msReadySampleId": msr['id'],
                        "name": i['name'],
                        "projectId": projectId,
                        "protocolId": i['protocolId'],
                        "instrumentId": i['instrumentId'],
                        "updatedDate": datetime.datetime.now(),
                        "createdDate": datetime.datetime.now(),
                        "workflowTag": "Sample Preparation",
                        "description": "Generated from Excel archive",
                        "processingPerson": "System",
                    }
                    print(msrunDAO.createMsRun(new_msrun))


def insertLibGenMSRuns(projectId):
    frac_samples = sampleDAO.getIntermediateSamplesByProtocolAndProtocolId(
        "fractionation_preparation", projectId)
    name_counter = 25
    run_counter = 7
    for f in frac_samples:
        if(re.search("^MMA_library_batch-1_mix-*", f['name'])):
            msr_sample = sampleDAO.getMsReadySampleByIntermediateSampleId(
                f['id'], projectId)
            if(len(msr_sample) > 0):
                msr = msr_sample[0]
                new_msrun = {
                    "runId": run_counter,
                    "clinicalSamples": msr['clinicalSamples'],
                    "msReadySampleId": msr['id'],
                    "name": "sgoetze_C1902_0"+str(name_counter),
                    "projectId": projectId,
                    "protocolId": "DDA_protocol",
                    "instrumentId": "MS:1002877",
                    "updatedDate": datetime.datetime.now(),
                    "createdDate": datetime.datetime.now(),
                    "workflowTag": "Library Generation",
                    "description": "Generated from Excel archive",
                    "processingPerson": "System",
                }
                name_counter = name_counter+1
                run_counter = run_counter + 1
                print(msrunDAO.createMsRun(new_msrun))


def insertClinicalSample(sample, projectId):
    new_sample = {
        "sourceSampleId": sample['id'],
        "name": sample['name'],
        "projectId": projectId,
        "processingPerson": "System",
        "description": "Imported from Excel archive",
        "workflowTag": "Sample Preparation",
        "updatedDate": datetime.datetime.now(),
        "createdDate": datetime.datetime.now()
    }
    print(sampleDAO.createClinicalSample(new_sample))


def generate_MS_Ready(samples, projectId):
    for sample in samples:
        new_sample = {
            "name": "MSR_" + str(sample['name']),
            "projectId": projectId,
            "clinicalSamples": sample['clinicalSamples'],
            "intermediateSampleId": sample['id'],
            "workflowTag": "Sample Preparation",
            "description": "Generated from Excel archive",
            "processingPerson": "System",
            "updatedDate": datetime.datetime.now(),
            "createdDate": datetime.datetime.now()

        }
        print(sampleDAO.createMSReadySample(new_sample))


def insertIndividualSample(sample, projectId):
    clinicalSample = sampleDAO.getClinicalSampleBySourceSampleId(
        sample['sample_ref']['sampleIdRef'])
    new_sample = {
        "name": sample['name'],
        "projectId": projectId,
        "clinicalSamples": [clinicalSample['id']],
        "workflowTag": "Sample Preparation",
        "protocolName": "single_preparation",
        "description": "Imported from Excel archive",
        "processingPerson": "System",
        "updatedDate": datetime.datetime.now(),
        "createdDate": datetime.datetime.now()

    }
    print(sampleDAO.createIntermediateSample(new_sample))


def insertPoolingSample(sample, projectId):
    sample_col = []
    for i in sample['sample_ref']:
        sample_c = sampleDAO.getClinicalSampleBySourceSampleId(
            i['sampleIdRef']).dump()
        sample_col.append(sample_c['id'])

    new_sample = {
        "name": sample['name'],
        "projectId": projectId,
        "clinicalSamples": sample_col,
        "workflowTag": "Sample Preparation",
        "protocolName": "pooling_preparation",
        "description": "Imported from Excel archive",
        "processingPerson": "System",
        "updatedDate": datetime.datetime.now(),
        "createdDate": datetime.datetime.now()

    }
    print(sampleDAO.createIntermediateSample(new_sample))


def insertFractinationSample(sample, projectId):
    pooledSamples = sampleDAO.getIntermediateSamplesByProtocolAndProtocolId(
        "pooling_preparation", projectId)
    if sample['sample_ref']['sampleIdRef'] == "231":
        IS = pooledSamples[0]
    else:
        IS = pooledSamples[1]

    new_sample = {
        "name": sample['name'],
        "projectId": projectId,
        "clinicalSamples": IS['clinicalSamples'],
        "parentSamples": [IS['id']],
        "workflowTag": "Sample Preparation",
        "protocolName": "fractionation_preparation",
        "description": "Imported from Excel archive",
        "processingPerson": "System",
        "updatedDate": datetime.datetime.now(),
        "createdDate": datetime.datetime.now()
    }
    sampleDAO.createIntermediateSample(new_sample)


def insertSpectralLibrary(spl, projectId):
    ms_runs = msrunDAO.getAllMSRunsByProjectId(projectId)
    ms_run_ids = []
    involved_clinical_samples = []
    for ms_run in ms_runs:
        if(re.search("^sgoetze_C1902-*", ms_run['name'])):
            ms_run_ids.append(ms_run['id'])
            for j in ms_run['clinicalSamples']:
                if j not in involved_clinical_samples:
                    involved_clinical_samples.append(j)

    new_spl = {
        "libId": 1,
        "clinicalSamples": involved_clinical_samples,
        "msRunIds": ms_run_ids,
        "name": "PHRT_001_005_CPAC_Lib",
        "projectId": projectId,
        "protocolId": "1",
        "protocolName": spl['protocolId'],
        "updatedDate": datetime.datetime.now(),
        "createdDate": datetime.datetime.now(),
        "workflowTag": "Library Generation",
        "description": "Generated from Excel archive",
        "proteinDatabaseOrganism": spl['protein_database']['organism'],
        "proteinDatabaseVersion": spl['protein_database']['version']
    }

    print(speclibDAO.createSpectralLibrary(new_spl))


def insertSWATHAnalysis(swa, projectId):
    spl = speclibDAO.getAllLibrariesForProject(projectId)
    ms_runs = msrunDAO.getAllMSRunsByProjectId(projectId)
    ms_run_ids = []
    involved_clinical_samples = []
    for ms_run in ms_runs:
        if(re.search("^sgoetze_A1902_-*", ms_run['name'])):
            ms_run_ids.append(ms_run['id'])
            for j in ms_run['clinicalSamples']:
                if j not in involved_clinical_samples:
                    involved_clinical_samples.append(j)

    new_swa = {
        "swathId": 1,
        "clinicalSamples": involved_clinical_samples,
        "msRunIds": ms_run_ids,
        "name": "PHRT_001_005_CPAC_SWATH",
        "spectralLibraryId": spl[0]['id'],
        "projectId": projectId,
        "protocolId": "1",
        "protocolName": swa['protocolId'],
        "updatedDate": datetime.datetime.now(),
        "createdDate": datetime.datetime.now(),
        "workflowTag": "SWATHAnalysis",
        "description": "Generated from Excel archive"
    }

    print(swathanalysisDAO.createSWATHAnalysis(new_swa))


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

    print("insert project")
    print("")
    projectId = insertProject(new_project)['id']

    print("")
    print("___________________________________________________________")
    print("")

    print("insert samples")
    print("")
    insertSamples(project_json['sample'], projectId)

    print("")
    print("___________________________________________________________")
    print("")

    frac_samples = sampleDAO.getIntermediateSamplesByProtocolAndProtocolId(
        "fractionation_preparation", projectId)
    sing_prep_samples = sampleDAO.getIntermediateSamplesByProtocolAndProtocolId(
        "single_preparation", projectId)

    print("insert ms ready samples")
    print("")

    generate_MS_Ready(frac_samples, projectId)
    generate_MS_Ready(sing_prep_samples, projectId)

    print("")
    print("___________________________________________________________")
    print("")

    print("insert ms runs")
    print("")
    insertMSRuns(project_json['ms_run'], projectId)

    print("")
    print("___________________________________________________________")
    print("")

    print("insert ms runs for lib generation")
    print("")
    insertLibGenMSRuns(projectId)

    print("")
    print("___________________________________________________________")
    print("")

    print("insert Spectral Library")
    print("")
    insertSpectralLibrary(project_json['spectral_library'], projectId)

    print("")
    print("___________________________________________________________")
    print("")

    print("insert SWATH Analysis")
    insertSWATHAnalysis(project_json['swath_analysis'], projectId)

    print("Everything inserted sucessfully")
