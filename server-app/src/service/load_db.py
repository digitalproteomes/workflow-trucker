import json
from pymongo import MongoClient
import datetime
from collections import OrderedDict
import collections

# TODO remove this file once umongo is stable


def load_json(datafile):
    with open(datafile) as f:
        return json.load(f)


if __name__ == '__main__':
    client = MongoClient('localhost', 27017)

    # to delete database, uncomment the next line
    dblist = client.list_database_names()
    if "WorkflowDB" in dblist:
        print("The database exists. Deleting and recreating...")
        client.drop_database('WorkflowDB')

    db = client['WorkflowDB']
    db.create_collection("project")

    vexpr = {"$jsonSchema": {
        "bsonType": "object",
        "required": ["projectId", "name", "owner", "sampleIds", "description", "createdDate", "updatedDate", "isLocked"],
        "properties": {
                    "name": {
                        "bsonType": "string",
                        "description": "must be a string and is required"
                    },
            "projectId": {
                        "bsonType": "int",
                        "description": "must be an integer and is required"
                    },
            "sampleIds": {
                        "bsonType": "array",
                        "description": "must be an array if the field exists"
                    },
            "description": {
                        "bsonType": ["string"],
                        "description": "must be a string if the field exists"
                    },
            "owner": {
                        "bsonType": "object",
                        "required": ["name"],
                        "properties": {
                            "name": {
                                "bsonType": "string",
                                "description": "must be a string if the field exists"
                            },
                            "ORCID": {
                                "bsonType": "string",
                                "description": "must be a string and is required"
                            }
                        }
                    },
            "createdDate": {
                        "bsonType": ["date"],
                        "description": "must be a date if the field exists"
                    },
            "updatedDate": {
                        "bsonType": ["date"],
                        "description": "must be a date if the field exists"
                    },
            "isLocked": {
                        "bsonType": "bool",
                        "description": "must be a boolean and is required"
                    }
        }
    }
    }

    # orderedDict = collections.OrderedDict()
    cmd = OrderedDict([('collMod', 'project'),
                       ('validator', vexpr)])

    x = db.project.insert_one({
        "projectId": 5,
        "name": "CPAC",
        "description": "MMA project",
        "sampleIds": [1, 2, 3],
        "owner": {
            "ORCID": "0000-0001-6719-9139",
            "name": "Patrick Pedrioli"
        },
        "updatedDate": datetime.datetime.now(),
        "createdDate": datetime.datetime.now(),
        "isLocked": 0
    })

    # collection_project = db['Project']
    # project_json = load_json("server-app/src/resources/sample_project.json")
    # collection_project.insert_one(project_json)
    for q in db.project.find():
        print(q)
    client.close()
