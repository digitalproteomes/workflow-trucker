import json


class SampleJourney:

    def __init__(self):
        self.clinicalSampleNames = []
        self.intermediateSampleNames = []
        self.msReadySampleNames = []
        self.msRunNames = []
        self.swathAnalysisNames = []
        self.specLibNames = []
        self.outputProteinMatrixNames = []
        self.outputSpecLibNames = []
        self.links = []

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__)

    def apendClinicalSampleName(self, clinicalSampleName):
        self.clinicalSampleNames.append(clinicalSampleName)

    def appendIntermediateSampleName(self, intermediateSampleName):
        self.intermediateSampleNames.append(intermediateSampleName)

    def appendMsReadySampleName(self, msReadySampleName):
        self.msReadySampleNames.append(msReadySampleName)

    def appendMsRunName(self, msRunName):
        self.msRunNames.append(msRunName)

    def appendSwathAnalysis(self, swathAnalysisName):
        self.swathAnalysisNames.append(swathAnalysisName)

    def appendOutputProteinMatrixName(self, outputProteinMatrixName):
        self.outputProteinMatrixNames.append(outputProteinMatrixName)

    def appendSpecralLibrary(self, specLibName):
        self.specLibNames.append(specLibName)

    def appendOutputSpecralLibrary(self, outputSpecLibName):
        self.outputSpecLibNames.append(outputSpecLibName)

    def appendLink(self, nodeStart, nodeEnd, label):
        link = {}
        link["nodeStart"] = nodeStart
        link["nodeEnd"] = nodeEnd
        link["label"] = label
        self.links.append(link)
