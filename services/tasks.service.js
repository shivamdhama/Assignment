const mongoose = require('mongoose');
const task = require('../db/tasks.schema');
const Promise = require('bluebird');
const _ = require('lodash');
const error = require('../errors/error.json');

class TaskService {

    /**
     * Function will create a task and save the record in Database
     * @param {*} reqBody 
     * @param {reqBody.description} description Task description
     * @param {reqBody.name} name Task name
     * @param {reqBody.createdBy} createdBy Email id of creater
     * @param {reqBody.assignedTo} assignedTo Task assigned to
     */
    async createTask(reqBody) {
        try {
            // Count total task exist in the system:
            let totalTask = await task.count();

            // Preparing the object for new task
            let prepareObject = {
                id: 'T-'+ totalTask++,
                name: reqBody.name,
                description: reqBody.description,
                createdBy: reqBody.createdBy,
                assignedTo: reqBody.assignedTo
            }

            // Save the result into Database
            const result = await task.create(prepareObject);
            if (!result) {
                return { code: 400, success: false, data: "Bad Request! Something went wrong." }
            }
            return { code: 200, success: true, data: "Task created" }
        } catch (error) {
            console.error("Error occured while creating task ", error);
            return { code: 500,  success: false, data: "Internal server error" };
        }

    }

    /**
     * Function will return the task details
     * @param {taskId} taskId 
     */
    async getTasks(taskId, queryParms) {
        try {
            let tasks;
            // Fetch result for specific task
            if(taskId)
                tasks = await task.find({id: taskId});
            else {

                // Apply pagination and calculate the startIndex and endIndex
                const pageNumber = parseInt(queryParms.pageNumber) || 0;
                const limit = parseInt(queryParms.limit) || 10;
                const startIndex = pageNumber * limit;
                const endIndex = (pageNumber + 1) * limit;
                tasks = await task.find()
                .sort("createdAt")
                .skip(startIndex)
                .limit(limit);
            }
            return { code: 200, success: true, data: tasks };

        } catch (error) {
            console.error("Error occured while fetching task ", error);
            return {code: 500, success: false, data: 'Error occured while fetching the record' };
        }
    }

    /**
     * Function will delete an task from DB.
     *  @param {taskId} taskId 
     */
    async deleteTask(taskId) {
        try {
            // Check if task exist in database or not.
            let taskDetails = await task.find({id: taskId});
            if(_.isEmpty(taskDetails)) {
                return error.TaskNotFound;;
            }
            await task.deleteOne({id: taskId});
            return { code: 200, success: true, data: 'Task deleted successfully' };
        }
        catch(err) {
            console.error("Error occured while deleting task ", err);
            return {code: 500, success: false, data: 'Error occured while deleting the task' };
        }
    }

    /**
     * Function will update the task details
     * @param {*} reqBody Task request body
     * @param {reqBody.status} status Task status
     * @param {reqBody.description} description Task description
     * @param {reqBody.name} name Task name
     * @param {reqBody.assignedTo} assignedTo Task assigned to user
     */
    async updateTask(reqBody) {
        try {
            // Check if order exist in database or not.
            let taskDetails = await task.find({id: reqBody.id});
            
            if(_.isEmpty(taskDetails)) {
                return error.TaskNotFound;
            }

            // Updating the required arguments
            let updateArgs = {
                updatedAt: new Date()
            };
            if(reqBody.hasOwnProperty('status')) {
                updateArgs.status = reqBody.status
            }
            if(reqBody.hasOwnProperty('description')) {
                updateArgs.description = reqBody.description
            }
            if(reqBody.hasOwnProperty('name')) {
                updateArgs.name = reqBody.name
            }
            if(reqBody.hasOwnProperty('assignedTo')) {
                updateArgs.assignedTo = reqBody.assignedTo
            }
           
            await task.updateOne({id: reqBody.id}, updateArgs);
            return { code: 200, success: true, data: 'Task updated successfully' };
        }
        catch(err) {
            console.error("Error occured while updating task ", err);
            return {code: 500, success: false, data: 'Error occured while updating the task' };
        }
    }

    /**
     * Function will return the task metric based on filter key 
     * @param {filterKey} filterKey filterKey may be status or timeline
     */
    async getTasksMetric(filterKey) {
        try {
            let tasksDetails = await task.find();
            let response;
            let resultMetric = []
            // Case 1: When filter key is equal to status
            if(filterKey === 'status') {
                let open = 0,close = 0,inprogess = 0;
                // Incrementing the task based on status
                for(let i = 0; i < tasksDetails.length; i++) {
                    if(tasksDetails[i].status === 'open')
                        open++;
                    else if(tasksDetails[i].status === 'inprogesss')
                        inprogess++;
                    else
                        close++;
                }
                // Preparing the response
                response = {
                    'open_tasks': open,
                    'close_tasks': close,
                    'inprogress_tasks': inprogess
                }
            }


            // Case 2: When filter key is equal to timeline i.e else case
            else {

                // Aggregate the result based on the created at and fetching the task status
                let result = await task.aggregate([
                    {$group: {
                        _id:{ month: { $month: "$createdAt" } , year: { $year: "$createdAt" }},  
                        taskStatus: { 
                            $push: {
                                status: "$status",
                            } 
                        }
                    }}
                ]);

                // Preparing the result based on the month and year
                result.forEach(element => {
                    let open = 0,close = 0,inprogess = 0;
                    element.taskStatus.forEach(st => {
                        if(st.status === 'open'){
                            open++;
                        }
                        else if(st.status === 'inprogress'){
                            inprogess++;
                        }
                        else{
                            close++;
                        }
                    })
                    const date = new Date();
                    date.setMonth(element._id.month - 1);
                      
                    let month = date.toLocaleString('en-US', { month: 'long' });
                    resultMetric.push({
                        "date": month + " " + element._id.year,
                        metric: {
                            'open_tasks': open,
                            'close_tasks': close,
                            'inprogress_tasks': inprogess
                        }
                    })
                });
                response = resultMetric;              
            }
            return { code: 200, success: true, data: response };

        } catch (error) {
            console.error("Error occured while fetching task metric ", error);
            return {code: 500, success: false, data: 'Error occured while fetching the record' };
        }
    }

}

module.exports = TaskService;