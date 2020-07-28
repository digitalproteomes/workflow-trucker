from .models import Project
from bson import ObjectId


def createProject(projectJson):
    new_project = Project(**projectJson)
    created = new_project.commit()

    return Project.find_one({"id": created.inserted_id}).dump()


def getAllProjects():
    projects = Project.find()
    result_projects = []
    for i in projects:
        result_projects.append(i.dump())
    return result_projects


def getProjectById(id):
    project = Project.find_one({"id": ObjectId(id)})
    if(project):
        return project.dump()
    else:
        return None


def updateProject(id, name, ownerName, ownerORCID, description):
    project = Project.find_one({"id": ObjectId(id)})
    if(project):
        project.name = name
        project.ownerName = ownerName
        project.ownerORCID = ownerORCID
        project.description = description
        project.commit()
        return Project.find_one({"id": ObjectId(id)}).dump()
    else:
        return 0


def updateProjectStatus(id, status):
    project = Project.find_one({"id": ObjectId(id)})

    if(project):
        project.isLocked = status
        project.commit()

        updated_project = Project.find_one({"id": ObjectId(id)})
        print(updated_project.isLocked)
    else:
        print("Project not found")


def deleteProject(id):
    project_to_delete = Project.find_one({"id": ObjectId(id)})

    if(project_to_delete):
        deleted_count = project_to_delete.delete().deleted_count
        return 1
    else:
        return 0
