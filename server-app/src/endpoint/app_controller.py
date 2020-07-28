import os
from pprint import pprint
from flask import Flask, jsonify, request
from flask_cors import CORS

from endpoint.sampleController import sample_api
from endpoint.projectController import project_api
from endpoint.MSRunController import msrun_api

app = Flask(__name__)
CORS(app)

app.register_blueprint(sample_api)
app.register_blueprint(project_api)
app.register_blueprint(msrun_api)

# https://stackoverflow.com/a/23542795
# silalbert@sysbc-mac-533 src % python -m endpoint.sample_controller


if __name__ == '__main__':
    try:
        if (os.environ['WorkflowEnvironment'] == "Docker"):
            host = '0.0.0.0'
        else:
            host = '127.0.0.1'
    except KeyError:
        host = '127.0.0.1'

    app.run(debug=True, host=host)
