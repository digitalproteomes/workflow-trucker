
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


def setComputationalEntries(sampleJourney, msrun):
    specLibs = spectralLibraryDAO.getLibrariesForMSRun(msrun['id'])
    swas = swathAnalysisDAO.getSWATHForMSRun(msrun['id'])

    if len(specLibs) > 0:
        specLib = specLibs[0]
        spl_name = specLib['name']
        spl_sop = specLib['sopFileName']
        spl_file = specLib['specLibFilename']

        if(spl_name not in sampleJourney.specLibNames):
            sampleJourney.appendSpecralLibrary(spl_name)
        sampleJourney.appendLink(msrun['name'], spl_name, spl_sop)

        if(spl_file not in sampleJourney.outputSpecLibNames):
            sampleJourney.appendOutputSpecralLibrary(spl_file)
        sampleJourney.appendLink(spl_name, spl_file, "output")

    if len(swas) > 0:
        swa = swas[0]
        swa_name = swa['name']
        swa_spl_name = spectralLibraryDAO.getSpectralLibraryById(
            swa['spectralLibraryId'])['name']
        swa_sop = swa['sopFileName']
        swa_file = swa['proteinMatrixFileName']

        if(swa_name not in sampleJourney.swathAnalysisNames):
            sampleJourney.appendSwathAnalysis(swa_name)
        sampleJourney.appendLink(msrun['name'], swa_name, swa_sop)

        if(swa_file not in sampleJourney.outputProteinMatrixNames):
            sampleJourney.appendOutputProteinMatrixName(swa_file)
        sampleJourney.appendLink(swa_name, swa_file, "output")
        sampleJourney.appendLink(swa_name, swa_spl_name, "uses")

    return sampleJourney


def setMsPrepEntries(sampleJourney, ins):
    msrs = msReadySamplesDAO.getMsReadySampleByIntermediateSampleId(ins['id'])
    if len(msrs) > 0:
        msr = msrs[0]
        msr_name = msr['name']
        sampleJourney.appendMsReadySampleName(msr_name)
        sampleJourney.appendLink(ins['name'], msr_name, "")
        msruns = MSRunDAO.getMsRunsByMSReadySampleId(msr['id'])
        for r in msruns:
            msrun_name = r['name']
            msrun_sop = r['sopFileName']
            sampleJourney.appendMsRunName(msrun_name)
            sampleJourney.appendLink(msr_name, msrun_name, msrun_sop)

            setComputationalEntries(sampleJourney, r)
    return sampleJourney


def processSampleJourney(sampleId):
    sampleJourney = SampleJourney()

    clinicalSampleName = clinicalSampleDAO.getClinicalSampleById(sampleId)[
        'name']
    sampleJourney.apendClinicalSampleName(clinicalSampleName)

    intermediateSamples = intermediateSampleDAO.getIntermediateSamplesByClinicalSampleId(
        sampleId)

    for ins in intermediateSamples:
        is_name = ins['name']
        is_protocol = ins['sopFileName']
        sampleJourney.appendIntermediateSampleName(is_name)
        sampleJourney.appendLink(clinicalSampleName, is_name, is_protocol)

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
        clinicalSampleDAO.getClinicalSampleByName('PHRT_005_194_CPAC'
                                                  )['id']
    sampleJourney = processSampleJourney(sampleId)
    print("SUCCESS")
