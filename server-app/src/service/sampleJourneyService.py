
from model.sampleJourney import SampleJourney
from persistence import clinicalSampleDAO
from persistence import projectDAO
from persistence import MSRunDAO
from persistence import spectralLibraryDAO
from persistence import intermediateSampleDAO
from persistence import swathAnalysisDAO
from persistence import msReadySamplesDAO
from pymongo import MongoClient

import os


def setComputationalEntries(sampleJourney, msrunId):
    specLibs = spectralLibraryDAO.getLibrariesForMSRun(msrunId)
    swas = swathAnalysisDAO.getSWATHForMSRun(msrunId)

    if len(specLibs) > 0:
        specLib = specLibs[0]
        spl_name = specLib['name']
        spl_sop = specLib['sopFileName']
        spl_file = specLib['specLibFilename']
        sampleJourney.setSpecralLibrary(spl_name, spl_sop, spl_file)

    if len(swas) > 0:
        swa = swas[0]
        swa_name = swa['name']
        swa_spl_name = spectralLibraryDAO.getSpectralLibraryById(
            swa['spectralLibraryId'])['name']
        swa_sop = swa['sopFileName']
        swa_file = swa['proteinMatrixFileName']
        sampleJourney.setSwathAnalysis(
            swa_name, swa_sop, swa_spl_name, swa_file)

    return sampleJourney


def setMsPrepEntries(sampleJourney, ins):
    msrs = msReadySamplesDAO.getMsReadySampleByIntermediateSampleId(ins['id'])
    if len(msrs) > 0:
        msr = msrs[0]
        msr_name = msr['name']
        sampleJourney.setMsReadySampleName(msr_name)
        msruns = MSRunDAO.getMsRunsByMSREadySampleId(msr['id'])
        for r in msruns:
            msrun_name = r['name']
            msrun_sop = r['sopFileName']
            sampleJourney.setMsRun(msrun_name, msrun_sop)
            setComputationalEntries(sampleJourney, msrunId=r['id'])
    return sampleJourney


def processSampleJourney(sampleId):
    sampleJourney = SampleJourney()

    clinicalSampleName = clinicalSampleDAO.getClinicalSampleById(sampleId)[
        'name']
    sampleJourney.setClinicalSampleName(clinicalSampleName=clinicalSampleName)

    intermediateSamples = intermediateSampleDAO.getIntermediateSamplesByClinicalSampleId(
        sampleId)

    for ins in intermediateSamples:
        is_name = ins['name']
        is_protocol = ins['sopFileName']
        sampleJourney.setIntermediateSample(
            intermediateSampleName=is_name, samplePrepSOP=is_protocol)

        setMsPrepEntries(sampleJourney, ins)
    return sampleJourney


if __name__ == '__main__':
    try:
        if os.environ['WorkflowEnvironment'] == 'Docker':
            db = MongoClient('host.docker.internal', 27017)
        else:
            db = MongoClient('localhost', 27017)
    except KeyError:
        db = MongoClient('localhost', 27017)

    client = db  # MongoClient('localhost', 27017)
    sampleId = \
        clinicalSampleDAO.getClinicalSampleByName('PHRT_005_004_CPAC'
                                                  )['id']
    sampleJourney = processSampleJourney(sampleId)
    print("SUCCESS")
