import json
from persistence import clinicalSampleDAO
from persistence import projectDAO
from persistence import MSRunDAO
from persistence import spectralLibraryDAO
from persistence import intermediateSampleDAO
from persistence import swathAnalysisDAO
from persistence import msReadySamplesDAO
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
    counter = 1
    for i in samples:
        if i['protocolId'] == '1':
            insertClinicalSample(i, projectId, counter)
            counter = counter + 1
        elif i['protocolId'] == '2':
            insertIndividualSample(i, projectId)
        elif i['protocolId'] == '3':
            insertPoolingSample(i, projectId)
        elif i['protocolId'] == '4':
            insertFractinationSample(i, projectId)
        else:
            print("Unkown protocol for sample: " + str(i))


def insertMSRuns(msruns, projectId):
    for i in msruns:
        x = re.search("^sgoetze_A1*", i['name'])
        if x:
            samples = []
            sample_c = clinicalSampleDAO.getClinicalSampleByClinicalSampleCode(
                str(int(i['sample_ref']['sampleIdRef'])))
            if sample_c != None:
                msrs = msReadySamplesDAO.getMsReadySamplesByClinicalSample(
                    sample_c['id'])

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
                        "sopFileName": "PHRT_Mass_Spectrometry_SOP",
                        "updatedDate": datetime.datetime.now(),
                        "createdDate": datetime.datetime.now(),
                        "workflowTag": "Sample Preparation",
                        "description": "Generated from Excel archive",
                        "processingPerson": "System",
                    }
                    print(MSRunDAO.createMsRun(new_msrun))


def insertLibGenMSRuns(projectId):
    frac_samples = intermediateSampleDAO.getIntermediateSamplesByProjectAndProtocolId(
        "fractionation_preparation", projectId)
    name_counter = 25
    run_counter = 7
    for f in frac_samples:
        if(re.search("^IS_MMA_library_batch-1_mix-*", f['name'])):
            msr_sample = msReadySamplesDAO.getMsReadySampleByIntermediateSampleId(
                f['id'])
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
                    "sopFileName": "PHRT_Mass_Spectrometry_SOP",
                    "updatedDate": datetime.datetime.now(),
                    "createdDate": datetime.datetime.now(),
                    "workflowTag": "Library Generation",
                    "description": "Generated from Excel archive",
                    "processingPerson": "System",
                }
                name_counter = name_counter+1
                run_counter = run_counter + 1
                print(MSRunDAO.createMsRun(new_msrun))


def insertClinicalSample(sample, projectId, counter):
    new_sample = {
        "clinicalSampleCode": str(int(sample['id'])),
        "name": sample['name'],
        "sampleCounter": counter,
        "projectId": projectId,
        "processingPerson": "System",
        "description": "Imported from Excel archive",
        "workflowTag": "Sample Preparation",
        "updatedDate": datetime.datetime.now(),
        "createdDate": datetime.datetime.now()
    }
    print(clinicalSampleDAO.createClinicalSample(new_sample))


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
        print(msReadySamplesDAO.createMSReadySample(new_sample))


def insertIndividualSample(sample, projectId):
    clinicalSample = clinicalSampleDAO.getClinicalSampleByClinicalSampleCode(
        sample['sample_ref']['sampleIdRef'])
    new_sample = {
        "name":  "IS_" + str(sample['name']),
        "projectId": projectId,
        "clinicalSamples": [clinicalSample['id']],
        "workflowTag": "Sample Preparation",
        "protocolName": "single_preparation",
        "sopFileName": "PHRT_Sample_Preparation_SOP",
        "description": "Imported from Excel archive",
        "processingPerson": "System",
        "updatedDate": datetime.datetime.now(),
        "createdDate": datetime.datetime.now()

    }
    print(intermediateSampleDAO.createIntermediateSample(new_sample))


def insertPoolingSample(sample, projectId):
    sample_col = []
    for i in sample['sample_ref']:
        sample_c = clinicalSampleDAO.getClinicalSampleByClinicalSampleCode(
            str(int(i['sampleIdRef']))).dump()
        sample_col.append(sample_c['id'])

    new_sample = {
        "name": "IS_" + str(sample['name']),
        "projectId": projectId,
        "clinicalSamples": sample_col,
        "workflowTag": "Sample Preparation",
        "protocolName": "pooling_preparation",
        "description": "Imported from Excel archive",
        "sopFileName": "PHRT_Sample_Preparation_SOP",
        "processingPerson": "System",
        "updatedDate": datetime.datetime.now(),
        "createdDate": datetime.datetime.now()

    }
    print(intermediateSampleDAO.createIntermediateSample(new_sample))


def insertFractinationSample(sample, projectId):
    pooledSamples = intermediateSampleDAO.getIntermediateSamplesByProjectAndProtocolId(
        "pooling_preparation", projectId)
    if sample['sample_ref']['sampleIdRef'] == "231":
        IS = pooledSamples[0]
    else:
        IS = pooledSamples[1]

    new_sample = {
        "name": "IS_" + str(sample['name']),
        "projectId": projectId,
        "clinicalSamples": IS['clinicalSamples'],
        "parentSamples": [IS['id']],
        "workflowTag": "Sample Preparation",
        "protocolName": "fractionation_preparation",
        "sopFileName": "PHRT_Sample_Preparation_SOP",
        "description": "Imported from Excel archive",
        "processingPerson": "System",
        "updatedDate": datetime.datetime.now(),
        "createdDate": datetime.datetime.now()
    }
    intermediateSampleDAO.createIntermediateSample(new_sample)


def insertSpectralLibrary(spl, projectId):
    ms_runs = MSRunDAO.getAllMSRunsByProjectId(projectId)
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
        "specLibFilename": "PHRT_005_Spec_Lib.tsv",
        "sopFileName": "PHRT_Data_Analysis_SOP",
        "workflowTag": "Library Generation",
        "description": "Generated from Excel archive",
        "proteinDatabaseOrganism": spl['protein_database']['organism'],
        "proteinDatabaseVersion": spl['protein_database']['version']
    }

    print(spectralLibraryDAO.createSpectralLibrary(new_spl))


def insertSWATHAnalysis(swa, projectId):
    spl = spectralLibraryDAO.getAllLibrariesForProject(projectId)
    ms_runs = MSRunDAO.getAllMSRunsByProjectId(projectId)
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
        "sopFileName": "PHRT_Data_Analysis_SOP",
        "proteinMatrixFileName": "PHRT_005_Protein_Matrix.tsv",
        "updatedDate": datetime.datetime.now(),
        "createdDate": datetime.datetime.now(),
        "workflowTag": "SWATHAnalysis",
        "description": "Generated from Excel archive"
    }

    print(swathAnalysisDAO.createSWATHAnalysis(new_swa))


if __name__ == '__main__':
    try:
        if (os.environ['WorkflowEnvironment'] == "Docker"):
            db = MongoClient('host.docker.internal', 27017)
        else:
            db = MongoClient('localhost', 27017)
    except KeyError:
        db = MongoClient('localhost', 27017)

    client = db  # MongoClient('localhost', 27017)

    # this deletes the database
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

    new_project = {
        "projectId": "6",
        "name": "Melanoma",
        "ownerName": "Patrick Pedrioli",
        "ownerORCID": "0000-0001-6719-9139",
        "description": "Melanoma Project",
        "isLocked": "false",
        "updatedDate": datetime.datetime.now(),
        "createdDate": datetime.datetime.now()
    }

    print("insert second project")
    print("")
    insertProject(new_project)

    print("")
    print("___________________________________________________________")
    print("")

    print("insert samples")
    print("")
    insertSamples(project_json['sample'], projectId)

    print("")
    print("___________________________________________________________")
    print("")

    frac_samples = intermediateSampleDAO.getIntermediateSamplesByProjectAndProtocolId(
        "fractionation_preparation", projectId)
    sing_prep_samples = intermediateSampleDAO.getIntermediateSamplesByProjectAndProtocolId(
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

    print("Project Id: " + str(projectId))

    print("Everything inserted sucessfully")
