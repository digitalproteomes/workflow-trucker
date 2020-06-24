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
    projectId = fields.IntegerField(required=True)
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
class Sample(Document):
    sourceSampleId = fields.IntegerField(required=True)
    name = fields.StrField(required=True)
    projectId = fields.IntegerField(fields.ReferenceField("Project"))
    parentSampleId = fields.ObjectIdField(required=False, allow_none=True)
    protocolId = fields.IntegerField(required=True)
    protocolName = fields.StrField(required=True)
    description = fields.StrField()
    ProcessingPerson = fields.StrField()
    createdDate = fields.DateTimeField(
        validate=validate.Range(min=datetime(1900, 1, 1)))
    updatedDate = fields.DateTimeField(
        validate=validate.Range(min=datetime(1900, 1, 1)))

    class Meta:
        collection_name = "sample"


@instance.register
class MSRun(Document):
    runId = fields.IntegerField(required=False)
    name = fields.StrField(required=True)
    projectId = fields.IntegerField(fields.ReferenceField("Project"))
    sampleId = fields.IntegerField(required=False)
    protocolId = fields.StrField(required=True)
    protocolName = fields.StrField(required=False)
    description = fields.StrField(required=False)
    instrumentId = fields.StrField(required=True)
    createdDate = fields.DateTimeField(
        validate=validate.Range(min=datetime(1900, 1, 1)))
    updatedDate = fields.DateTimeField(
        validate=validate.Range(min=datetime(1900, 1, 1)))

    class Meta:
        collection_name = "MSRun"
