import flask
from flask import Blueprint
from flask import Flask, jsonify, request, render_template
from flask_api import status


from pymongo import MongoClient
import json
from gridfs import GridFS

from persistence import swathAnalysisDAO, clinicalSampleDAO, MSRunDAO
from persistence import projectDAO, artefactDAO

sop_api = Blueprint('sop_api', __name__)
# instance = getMongoInstance()

client = MongoClient(port=27017)
mongo = client.WorkflowDB
GRID_FS = GridFS(mongo)
# db = PyMongo(mongo)


@sop_api.route('/upload',  methods=['POST'])
def upload():
    # response.content_type = 'application/json'
    sop_file = request.files['sop_file']
    with GRID_FS.new_file(filename=sop_file.filename) as fp:
        fp.write(sop_file)
        file_id = fp._id
    # If the file is found in the database then the save
    # was successful else an error occurred while saving.
    if GRID_FS.find_one(file_id) is not None:
        new_artefact = {
            "name": "test",
            "sopFileName": sop_file.filename,
            "encodedFileId": file_id
        }
        created_artf = artefactDAO.createArtefact(
            new_artefact)
        return jsonify(created_artf), status.HTTP_200_OK
    else:
        return json.dumps({'status': 'Error occurred while saving file.'})


@sop_api.route('/download',  methods=['GET'])
def download():
    filename = request.args.get('filename')
    grid_fs_file = GRID_FS.find_one({'filename': filename})
    response = flask.make_response(grid_fs_file.read())
    # response.mimetype = grid_fs_file.content_type
    response.headers['Content-Type'] = 'application/octet-stream'
    response.headers["Content-Disposition"] = "attachment; filename={}".format(
        filename)
    return response


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


@sop_api.route("/file/render")
def render():
    return '''
        <form method="POST" action = "/upload" enctype="multipart/form-data">
            <input type="file" name="sop_file">
            <input type="submit">
        </form>
    '''
