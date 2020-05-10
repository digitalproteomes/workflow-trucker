from pprint import pprint
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'WorkflowDB'
app.config['MONGO_URI'] = 'mongodb://127.0.0.1:27017/WorkflowDB'

mongo = PyMongo(app)

# Almost deprecated.TODO: remove this when umongo is safe


@app.route('/project', methods=['GET'])
def get_all_projects():
    project = mongo.db.Project
    output = []

    for q in project.find():
        # 'id': q['id'],
        output.append(
            {'name': q['unit'], 'project_leader': q['project_leader'], 'sample': q['sample']})

    return jsonify({'result': output})


@app.route('/sample', methods=['GET'])
def get_all_samples():
    project = mongo.db.Project
    output = []

    for q in project.find():
        output.append({'sample': q['sample']})

    return jsonify({'result': output})


@app.route('/sample/<pname>', methods=['GET'])
def get_all_samples_for_project(pname):
    project = mongo.db.Project
    output = []

    q = project.find_one({'unit': pname})

    if q:
        output.append({'sample': q['sample']})
    else:
        output = 'No results found'

    return jsonify({'result': output})


@app.route('/project/<name>', methods=['GET'])
def get_project_by_name(name):
    project = mongo.db.Project

    q = project.find_one({'unit': name})

    if q:
        output = {'id': q['id'], 'name': q['unit'],
                  'project_leader': q['project_leader'], 'sample': q['sample']}

    else:
        output = 'No results found'

    return jsonify({'result': output})


@app.route('/project/<name>', methods=['DELETE'])
def delete_project_by_name(name):
    # todo - get project by a unique id (not the primary key in the db, and not the project name)
    # todo - all the project related operations should be done based on its defined unique identifier
    # why? - e.g.: in case of a project rename, all the saved links/references, etc would still be valid.
    # why? - The primary key should not be used as unique id because it would hurt future migrations and would expose the db details (not good)
    project = mongo.db.Project

    q = project.find_one({'unit': name})

    x = project.delete_one(q)

    output = str(x.deleted_count) + " documents deleted."

    return jsonify({'result': output})


@app.route('/project', methods=['POST'])
def add_project():
    project = mongo.db.Project

    name = request.json['name']
    id = request.json['id']
    project_leader = request.json['project_leader']
    sample = request.json['sample']

    project_id = project.insert(
        {'id': id, 'unit': name, 'project_leader': project_leader, 'sample': sample})
    new_project = project.find_one({'_id': project_id})

    output = {'id': new_project['id'], 'name': new_project['unit'], 'project_leader': new_project['project_leader'],
              'sample': new_project['sample']}

    return jsonify({'result': output})


@app.route('/project', methods=['PUT'])
def update_project():
    project = mongo.db.Project

    name = request.json['name']
    id = request.json['id']

    myquery = {"id": id}

    newvalues = {"$set": {"unit": name}}

    x = project.update_one(myquery, newvalues)

    new_project = project.find_one({'id': id})

    output = {'id': new_project['id'], 'name': new_project['unit'], 'project_leader': new_project['project_leader'],
              'sample': new_project['sample']}

    return jsonify({'result': output})


if __name__ == '__main__':
    app.run(debug=True)