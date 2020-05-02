from .project import Project


def createProject(projectJson):
    new_project = Project(**projectJson)
    new_project.commit()
    # project = projectJson.dump()
    # created_project = Project.find_one({"projectId": project.projectId})

    return 1


def getAllProjects():
    projects = Project.find()
    result_projects = []
    for i in projects:
        result_projects.append(i.dump())
    return result_projects


def getProjectById(id):
    return Project.find_one({"projectId": id})


def updateProjectStatus(id, status):
    project = Project.find_one({"projectId": id})

    if(project):
        project.isLocked = status
        project.commit()

        updated_project = Project.find_one({"projectId": id})
        print(updated_project.isLocked)
    else:
        print("Project not found")


def deleteProject(id):
    project_to_delete = Project.find_one({"projectId": id})

    if(project_to_delete):
        deleted_count = project_to_delete.delete().deleted_count
        if(deleted_count > 0):
            return 'Deleted ' + str(deleted_count) + ' project(s)'
        else:
            return 'Could not delete'
    else:
        return 'There is no project with the id: ' + str(id)


if __name__ == '__main__':
    project_id = 15

    new_project = {
        "projectId": project_id,
        "name": "JD Project",
        "ownerName": "Joana Doe",
        "ownerORCID": "0000-0000-0000-0000",
        "description": "Sample Project",
        "isLocked": "false"
    }

    createProject(new_project)

    print(getProjectById(project_id))

    updateProjectStatus(project_id, 'true')

    print(deleteProject(project_id))
