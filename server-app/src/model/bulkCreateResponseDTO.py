import json


class BulkCreateResponseDTO:

    def __init__(self):
        self.createSuccess = []
        self.createFail = []
        self.overwritten = []

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__)

    def appendCreateSuccess(self, entity):
        self.createSuccess.append(entity)

    def appendCreateFail(self, entity):
        self.createFail.append(entity)

    def appendOverwritten(self, entity):
        self.overwritten.append(entity)
