## Startup

1. Run the load_db.py file and it will automatically create the WorkflowDB and poplate it with 1 project from the sample_project.json file
2. Turn on the server by clicking run/debug on the project_controller.py class
3. Test in postman a simple get http://127.0.0.1:5000/project

## How to install python

and set the correct global version using pyenv

- https://opensource.com/article/19/5/python-3-default-mac
- scroll down to the "What should we do" section
- in VS Code, left bottom corner, when a .py file is open, click on Python and make sure you have the pyenv version selected

## How to correctly install the project dependencies

`pip install -r requirements.txt`

# // todo

1. use virtual environments with Conda

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
