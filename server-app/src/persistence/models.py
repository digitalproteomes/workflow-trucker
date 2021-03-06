from datetime import datetime
from pymongo import MongoClient
import umongo
from umongo import Instance, Document, fields, validate

import os

# db = MongoClient().test

try:
    if (os.environ['WorkflowEnvironment'] == "Docker"):
        db = MongoClient('host.docker.internal', 27017)
    else:
        db = MongoClient('localhost', 27017)
except KeyError:
    db = MongoClient('localhost', 27017)

instance = Instance(db.WorkflowDB)


@instance.register
class Project(Document):
    projectId = fields.StrField(required=True)
    name = fields.StrField(required=True)
    ownerName = fields.StrField(required=True)
    ownerORCID = fields.StrField(required=True)
    description = fields.StrField()
    createdDate = fields.DateTimeField(default=datetime.now)
    updatedDate = fields.DateTimeField(default=datetime.now)
    samples = fields.ListField(fields.ReferenceField("Sample"))
    isLocked = fields.BooleanField(default="false")

    class Meta:
        collection_name = "project"


@instance.register
class ClinicalSample(Document):
    clinicalSampleCode = fields.StringField(required=True)
    sampleCounter = fields.IntegerField(required=True)
    name = fields.StrField(required=True)
    projectId = fields.ObjectIdField(required=True)
    workflowTag = fields.StrField(required=False)
    quality = fields.StrField(required=False)
    description = fields.StrField()
    processingPerson = fields.StrField()
    createdDate = fields.DateTimeField(
        validate=validate.Range(min=datetime(1900, 1, 1)))
    updatedDate = fields.DateTimeField(
        validate=validate.Range(min=datetime(1900, 1, 1)))

    class Meta:
        collection_name = "clinicalSample"


@instance.register
class IntermediateSample(Document):
    name = fields.StrField(required=True)
    projectId = fields.ObjectIdField(required=True)
    clinicalSamples = fields.ListField(fields.ObjectIdField, required=False)
    parentSamples = fields.ListField(fields.ObjectIdField, required=False)
    protocolName = fields.StrField(required=True)
    workflowTag = fields.StrField(required=False)
    sopFileName = fields.StrField(required=False)
    description = fields.StrField()
    processingPerson = fields.StrField()
    createdDate = fields.DateTimeField(
        validate=validate.Range(min=datetime(1900, 1, 1)))
    updatedDate = fields.DateTimeField(
        validate=validate.Range(min=datetime(1900, 1, 1)))

    class Meta:
        collection_name = "intermediateSample"


@instance.register
class MSReadySample(Document):
    name = fields.StrField(required=True)
    projectId = fields.ObjectIdField(required=True)
    clinicalSamples = fields.ListField(fields.ObjectIdField, required=False)
    intermediateSampleId = fields.ObjectIdField(required=True)
    msReadySampleName = fields.StrField(required=False)
    workflowTag = fields.StrField(required=False)
    quality = fields.StrField(required=False)
    peptideNo = fields.FloatField(required=False)
    description = fields.StrField(required=False)
    concentration = fields.StrField(required=False)
    processingPerson = fields.StrField(required=False)
    currentLocation = fields.StrField(required=False)
    createdDate = fields.DateTimeField(
        validate=validate.Range(min=datetime(1900, 1, 1)))
    updatedDate = fields.DateTimeField(
        validate=validate.Range(min=datetime(1900, 1, 1)))

    class Meta:
        collection_name = "msReadySample"


@instance.register
class MSRun(Document):
    runId = fields.IntegerField(required=False)
    name = fields.StrField(required=True)
    projectId = fields.ObjectIdField(required=True)
    clinicalSamples = fields.ListField(fields.ObjectIdField, required=False)
    msReadySampleId = fields.ObjectIdField(required=True)
    msReadySampleName = fields.StrField(required=False)
    protocolId = fields.StrField(required=True)
    protocolName = fields.StrField(required=False)
    sopFileName = fields.StrField(required=False)
    description = fields.StrField(required=False)
    instrumentId = fields.StrField(required=True)
    instrumentMethod = fields.StrField(required=False)
    runCode = fields.StrField(required=False)
    status = fields.StrField(required=False)
    processingPerson = fields.StrField(required=False)
    workflowTag = fields.StrField(required=False)
    createdDate = fields.DateTimeField(
        validate=validate.Range(min=datetime(1900, 1, 1)))
    updatedDate = fields.DateTimeField(
        validate=validate.Range(min=datetime(1900, 1, 1)))

    class Meta:
        collection_name = "MSRun"


@instance.register
class SpectralLibrary(Document):
    libId = fields.IntegerField(required=False)
    name = fields.StrField(required=True)
    projectId = fields.ObjectIdField(required=True)
    clinicalSamples = fields.ListField(fields.ObjectIdField, required=False)
    msRunIds = fields.ListField(fields.ObjectIdField, required=False)
    protocolId = fields.StrField(required=True)
    protocolName = fields.StrField(required=False)
    sopFileName = fields.StrField(required=False)
    specLibFilename = fields.StrField(required=False)
    description = fields.StrField(required=False)
    proteinDatabaseOrganism = fields.StrField(required=True)
    proteinDatabaseVersion = fields.StrField(required=True)
    workflowTag = fields.StrField(required=False)
    createdDate = fields.DateTimeField(
        validate=validate.Range(min=datetime(1900, 1, 1)))
    updatedDate = fields.DateTimeField(
        validate=validate.Range(min=datetime(1900, 1, 1)))

    class Meta:
        collection_name = "SpectralLibrary"


@instance.register
class SWATHAnalysis(Document):
    swathId = fields.IntegerField(required=False)
    name = fields.StrField(required=True)
    projectId = fields.ObjectIdField(required=True)
    clinicalSamples = fields.ListField(fields.ObjectIdField, required=False)
    msRunIds = fields.ListField(fields.ObjectIdField, required=False)
    protocolId = fields.StrField(required=True)
    protocolName = fields.StrField(required=False)
    sopFileName = fields.StrField(required=False)
    proteinMatrixFileName = fields.StrField(required=False)
    description = fields.StrField(required=False)
    workflowTag = fields.StrField(required=False)
    spectralLibraryId = fields.ObjectIdField(required=True)
    createdDate = fields.DateTimeField(
        validate=validate.Range(min=datetime(1900, 1, 1)))
    updatedDate = fields.DateTimeField(
        validate=validate.Range(min=datetime(1900, 1, 1)))

    class Meta:
        collection_name = "SWATHAnalysis"


@instance.register
class Artefact(Document):
    name = fields.StrField(required=True)
    projectId = fields.ObjectIdField(required=False)
    # SOP
    sopFileName = fields.StrField(required=False)
    encodedFileId = fields.ObjectIdField(required=False)
    artefactClass = fields.StrField(required=False)
    description = fields.StrField(required=False)
    owner = fields.StrField(required=False)
    revision = fields.StrField(required=False)
    processingPerson = fields.StrField()
    createdDate = fields.DateTimeField(
        validate=validate.Range(min=datetime(1900, 1, 1)))
    updatedDate = fields.DateTimeField(
        validate=validate.Range(min=datetime(1900, 1, 1)))

    class Meta:
        collection_name = "Artefacts"
