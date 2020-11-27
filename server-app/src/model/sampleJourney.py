import json


class SampleJourney:

    def __init__(self):
        pass

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__)

    def setClinicalSampleName(self, clinicalSampleName):
        self.clinicalSampleName = clinicalSampleName

    def setIntermediateSample(self, intermediateSampleName, samplePrepSOP):
        self.intermediateSampleName = intermediateSampleName
        self.samplePrepSOP = samplePrepSOP

    def setMsReadySampleName(self, msReadySampleName):
        self.msReadySampleName = msReadySampleName

    def setMsRun(self, msRunName, MSPrepSOP):
        self.msRunName = msRunName
        self.MSPrepSOP = MSPrepSOP

    def setSwathAnalysis(self, swathAnalysisName, swathAnalysisSOP, specLibName, outputProteinMatrixName):
        self.swathAnalysisName = swathAnalysisName
        self.swathAnalysisSOP = swathAnalysisSOP
        self.specLibName = specLibName
        self.outputProteinMatrixName = outputProteinMatrixName

    def setSpecralLibrary(self, specLibName, libGenSOP, outputSpecLibName):
        self.specLibName = specLibName
        self.libGenSOP = libGenSOP
        self.outputSpecLibName = outputSpecLibName
