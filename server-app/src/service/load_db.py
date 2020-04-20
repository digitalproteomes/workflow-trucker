import json
from pymongo import MongoClient


def load_json(datafile):
    with open(datafile) as f:
        return json.load(f)


if __name__ == '__main__':
    client = MongoClient('localhost', 27017)

    # to delete database, uncomment the next line
    client.drop_database('WorkflowDB')

    db = client['WorkflowDB']
    collection_project = db['Project']
    project_json = load_json("server-app/src/resources/sample_project.json")
    collection_project.insert_one(project_json)
    client.close()