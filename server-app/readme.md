## Startup

1. Run the load_db.py file and it will automatically create the WorkflowDB and poplate it with 1 project from the sample_project.json file
2. Turn on the server by clicking run/debug on the project_controller.py class
3. Test in postman a simple get http://127.0.0.1:5000/project

## How to install python

and set the correct global version using pyenv

- https://opensource.com/article/19/5/python-3-default-mac
- scroll down to the "What should we do" section
- in VS Code, left bottom corner, when a .py file is open, click on Python and make sure you have the pyenv version selected

## How to create virtual environments

- in the root folder, run `python -m venv env\python3.7`
- this will create a virtual environment having the version of the python instance used to create it
- within VS Code, choose this newly created virtual environment
- the `.vscode\settings.json` file will an entry for `"python.pythonPath": "path-to-virtual-environment"`
- virtual environments on macOS ([link]())
  - details on how to stuff go here
- virtual environments on windows ([link](https://www.techcoil.com/blog/how-to-create-a-python-3-virtual-environment-in-windows-10/))
  - if you wanna use python from the command line also, activate the virtual environment within your system using
  - `.\env\python3.7\Scripts\activate.bat`
    - in case this doesn't work, just call python and pip using the relative path
    - `.\env\python3.7\Scripts\pip.exe install umongo`

## How to create the requirements.txt

- activate the virtual environment
- `pip install` all the the necessary packages for the app to run
- `pip freeze` to generate the `requirements.txt` file
  - `.\env\python3.7\Scripts\pip.exe freeze > src\requirements.txt` to be more specific

## How to correctly install the project dependencies

`pip install -r requirements.txt`

## Creating the docker image

- build image `docker build -f automation\dockerfile -t workflow-tracker-rest-api:0.1 .`
- start container `docker run -p 5000:5000 workflow-tracker-rest-api:0.1`
- bash into container
  - `docker run -it --entrypoint /bin/bash workflow-tracker-rest-api:0.1`
  - `docker run -it workflow-tracker-rest-api:0.1 bin/bash`
- start up the entire app
  - `workflow-tracker\server-app\automation> docker-compose up`
  - or in detached mode `workflow-tracker\server-app\automation> docker-compose up -d`
- stop the entire app
  - `CTRL+C`
  - `workflow-tracker\server-app\automation> docker-compose down`

## Docker nice to have commands

- stop all `docker stop $(docker ps -a -q)`
- remove all `docker rm $(docker ps -a -q)`
- remove force all `docker rm -f $(docker ps -a -q)`

# Startup

- initialize db `workflow-tracker\server-app\src> ..\env\python3.7\Scripts\python.exe -m resources.initial_load_db`
- instantite endpoints `workflow-tracker\server-app\src> ..\env\python3.7\Scripts\python.exe -m endpoint.app_controller`

# Troubleshooting

### Python modules and their execution

- Python works using modules
- For the folder which contains the python files to become a module, it has to have a `__init__.py` file
- When referencing a _sibling_ module, and you want to execute that file, from right there, python won't recognize the sibling module because it is completely out of its scope
- so for python to see the sibling modules, it has to have an overview over them
- to do that, you have to run python.exe from a parent folder with a specified entry module
  - e.g.: silalbert@sysbc-mac-533 src % `python -m endpoint.sample_controller`
- more info [here](https://stackoverflow.com/a/23542795)

### Flask host binding

- make sure when you start the app to bind the host also to 0.0.0.0 (idea comes from [here](https://stackoverflow.com/questions/30323224/deploying-a-minimal-flask-app-in-docker-server-connection-issues))
  ```
  if __name__ == '__main__':
      app.run(debug=True, host='0.0.0.0')
  ```

# // todo

1. use virtual environments with Conda (only if the python venv solution is not enough)

   - generate requirements.txt file by freezing the environments
   - more info here https://medium.com/@boscacci/why-and-how-to-make-a-requirements-txt-f329c685181e
   - effects in VS Code https://code.visualstudio.com/docs/python/environments

## launch.json file example

```
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Sample controller - Python: Module",
      "type": "python",
      "request": "launch",
      "module": "endpoint.sample_controller",
      "cwd": "${workspaceFolder}/src"
    },
    {
      "name": "Python: Current File",
      "type": "python",
      "request": "launch",
      "program": "${file}",
      "console": "integratedTerminal"
    }
  ]
}
```

# Start the application

- run initial_load_db.py
- then run app_controller.py
