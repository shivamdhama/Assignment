## Problem statement
You are tasked with building a system to keep track of your tasks. You will need to write CRUD APIs for managing tasks and API to get the metrics for your tasks. You should use Node.js for the backend, any database for managing database interactions.

## Solution
I have created a service that will take care of all the operation like GET, POST, PUT, DELETE.

1. API -> GET /tasks/ -> It will return all the task based on pagination.
2. API -> POST /tasks -> User can create a task
3. API -> DELETE /tasks -> User can delete the task.
4. API -> PUT /tasks -> User can update the various field of task like name, description, status, assignedTo.
5. API -> GET /tasks/taskId/:id -> Get a specific task based on Id.
6. API -> GET /tasks/metric -> Get task metric based on status and timeline.

In the implementation of the task management system, I have created one schema having the fields like -> name, id, description, status, createdBy, assignedTo.

## Tech stack
* Backend - Node JS

## How to run the application
### Required Packages
* Node JS v16+
* MongoDB v5+

### Steps
1. Pull the code from github link - and go to the project directory
2. Run mongo db service or docker container and update the ```config.json``` file  with connection string.
2. Install the packges by executing the command ```npm i```.
3. Run the applicatio  by executing ```node server.js```.