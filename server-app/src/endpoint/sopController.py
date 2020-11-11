import flask
from flask import Blueprint
from flask import Flask, jsonify, request, render_template
from flask_api import status
import os
import json
import datetime
from bson import ObjectId


from pymongo import MongoClient
import json
from gridfs import GridFS

from persistence import swathAnalysisDAO, clinicalSampleDAO, MSRunDAO
from persistence import projectDAO, artefactDAO


import urllib.request
from werkzeug.utils import secure_filename


sop_api = Blueprint('sop_api', __name__)
# instance = getMongoInstance()

try:
    if (os.environ['WorkflowEnvironment'] == "Docker"):
        db = MongoClient('host.docker.internal', 27017)
    else:
        db = MongoClient('localhost', 27017)
except KeyError:
    db = MongoClient('localhost', 27017)

client = db

mongo = client.WorkflowDB
GRID_FS = GridFS(mongo)
# db = PyMongo(mongo)


# @sop_api.route('/upload',  methods=['POST'])
# def upload():
#     # response.content_type = 'application/json'
#     sop_file = request.files['sop_file']
#     with GRID_FS.new_file(filename=sop_file.filename) as fp:
#         fp.write(sop_file)
#         file_id = fp._id
#     # If the file is found in the database then the save
#     # was successful else an error occurred while saving.
#     if GRID_FS.find_one(file_id) is not None:
#         new_artefact = {
#             "name": "test",
#             "sopFileName": sop_file.filename,
#             "encodedFileId": file_id,
#             "updatedDate": datetime.datetime.now(),
#             "createdDate": datetime.datetime.now(),
#             "processingPerson": "System"
#         }
#         created_artf = artefactDAO.createArtefact(
#             new_artefact)
#         return jsonify(created_artf), status.HTTP_200_OK
#     else:
#         return json.dumps({'status': 'Error occurred while saving file.'})


# @sop_api.route('/download',  methods=['GET'])
# def download():
#     filename = request.args.get('filename')
#     grid_fs_file = GRID_FS.find_one({'filename': filename})
#     response = flask.make_response(grid_fs_file.read())
#     # response.mimetype = grid_fs_file.content_type
#     response.headers['Content-Type'] = 'application/octet-stream'
#     response.headers["Content-Disposition"] = "attachment; filename={}".format(
#         filename)
#     return response

@sop_api.route('/sops/project',  methods=['GET'])
def getAllSOPs():
    projectId = request.args.get('projectId')
    if (projectDAO.getProjectById(projectId)):
        sops = artefactDAO.getAllArtefacts(projectId)
        return jsonify(sops), status.HTTP_200_OK
    else:
        return 'Project with id does not exist.', status.HTTP_404_NOT_FOUND


@sop_api.route('/sops/project/type',  methods=['GET'])
def getSOPsByType():
    projectId = request.args.get('projectId')
    artefactClass = request.args.get('sopType')
    if (projectDAO.getProjectById(projectId)):
        sops = artefactDAO.getArtefactsByType(projectId, artefactClass)
        return jsonify(sops), status.HTTP_200_OK
    else:
        return 'Project with id does not exist.', status.HTTP_404_NOT_FOUND


@sop_api.route('/download/artefact',  methods=['GET'])
def downloadArtefact():
    artefactName = request.args.get('artefactName')
    artefact = artefactDAO.getArtefactByFilename(artefactName)
    grid_fs_file = GRID_FS.find_one({'filename': artefact.sopFileName})
    response = flask.make_response(grid_fs_file.read())
    # response.mimetype = grid_fs_file.content_type
    response.headers['Content-Type'] = 'application/octet-stream'
    response.headers["Content-Disposition"] = "attachment; filename={}".format(
        artefact.sopFileName)
    return response


@sop_api.route('/sops', methods=['DELETE'])
def deleteSOP():
    id = request.args.get('id')
    # artefact = artefactDAO.getArtefactByFilename(artefactName)
    sts = artefactDAO.deleteSOP(id)
    if(sts == 0):
        return 'SOP with id does not exist.', status.HTTP_404_NOT_FOUND
    else:
        return '', status.HTTP_200_OK

# @sop_api.route("/file/render")
# def render():
#     return '''
#         <form method="POST" action = "/file-upload" enctype="multipart/form-data">
#             <input type="file" name="file">
#             <input type="submit">
#         </form>
#     '''

# upload sample from https://www.roytuts.com/python-flask-rest-api-file-upload/


ALLOWED_EXTENSIONS = set(
    ['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'tsv', 'xls'])


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@sop_api.route('/file-upload', methods=['POST'])
def upload_file():
    # check if the post request has the file part
    if 'file' not in request.files:
        resp = jsonify({'message': 'No file part in the request'})
        resp.status_code = 400
        return resp
    file = request.files['file']
    if file.filename == '':
        resp = jsonify({'message': 'No file selected for uploading'})
        resp.status_code = 400
        return resp
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)

        with GRID_FS.new_file(filename=filename) as fp:
            fp.write(file)
            file_id = fp._id
        # If the file is found in the database then the save
        # was successful else an error occurred while saving.
        if GRID_FS.find_one(file_id) is not None:
            # print("request" + request)
            data = request.form
            if data['sop_data'] != None:
                print(str(data['sop_data']))
                fields = json.loads(data['sop_data'])
                processingPerson = fields['processingPerson']
                description = fields['description']
                artefactClass = fields.get('artefactClass')
                name = fields['name']
                projectId = fields.get('projectId')
                owner = fields.get('owner')
                revision = fields.get('revision')
                new_artefact = {
                    "name": name,
                    "sopFileName": filename,
                    "encodedFileId": file_id,
                    "updatedDate": datetime.datetime.now(),
                    "createdDate": datetime.datetime.now(),
                    "processingPerson": processingPerson,
                    "description": description,
                    "projectId": projectId,
                    "owner": owner,
                    "revision": revision,
                    "artefactClass": artefactClass
                }
                created_artf = artefactDAO.createArtefact(
                    new_artefact)
                return jsonify(created_artf), status.HTTP_200_OK
            else:
                resp = jsonify({'message': 'Error with fields'})
                resp.status_code = 400
                return resp
        else:
            # file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            resp = jsonify({'message': 'File already exists'})
            resp.status_code = 201
            return resp
    else:
        resp = jsonify(
            {'message': 'Allowed file types are txt, pdf, png, jpg, jpeg, gif, tsv, xls'})
        resp.status_code = 400
        return resp
