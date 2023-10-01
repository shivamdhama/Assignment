const _ = require('lodash');
const error = require('../errors/error.json');

// Function will validate the create task attribute
function createTaskValidation(req, res, next) {
    if(typeof req.body.name === "undefined" || req.body.createdBy === 'undefined' ) {
        return res.status(400).json(error.InsufficentArguments);
    }

    if(req.body.hasOwnProperty('name') && (_.isEmpty(req.body.name) || !_.isString(req.body.name))){
        return res.status(412).json({code: 412, custom_code: 'VALIDATION_ERROR', data : 'Task name should be of type string'});
    }

    if(req.body.hasOwnProperty('description') && (!_.isString(req.body.description))){
        return res.status(412).json({code: 412, custom_code: 'VALIDATION_ERROR', data : 'Task description should be of type string'});
    }

    if(req.body.hasOwnProperty('createdBy') && (_.isEmpty(req.body.createdBy) || !_.isString(req.body.createdBy))){
        return res.status(412).json({code: 412, custom_code: 'VALIDATION_ERROR', data : 'Created by should be of type string'});
    }
    return next();
}

// Function will validate the task Id attribute
function taskIdValidation(req, res, next) {
    if(typeof req.body.id === "undefined" ) {
        return res.status(400).json(error.InsufficentArguments);
    }
    if(_.isEmpty(req.body.id) || !_.isString(req.body.id)){
        return res.status(412).json({code: 412, custom_code: 'VALIDATION_ERROR', data : 'Task Id should be of type string'});
    }
    return next();
}

// Function will validate the update task API attribute
function updateTaskValidation(req, res, next) {
    if(typeof req.body.id === "undefined" ) {
        return res.status(400).json(error.InsufficentArguments);
    }

    if(req.body.hasOwnProperty('id') && (_.isEmpty(req.body.id) || !_.isString(req.body.id))){
        return res.status(412).json({code: 412, custom_code: 'VALIDATION_ERROR', data : 'Task id should be of type string'});
    }

    if(req.body.hasOwnProperty('name') && (_.isEmpty(req.body.name) || !_.isString(req.body.name))){
        return res.status(412).json({code: 412, custom_code: 'VALIDATION_ERROR', data : 'Task name should be of type string'});
    }

    if(req.body.hasOwnProperty('description') && (!_.isString(req.body.description))){
        return res.status(412).json({code: 412, custom_code: 'VALIDATION_ERROR', data : 'Task description should be of type string'});
    }

    if(req.body.hasOwnProperty('createdBy') && (_.isEmpty(req.body.createdBy) || !_.isString(req.body.createdBy))){
        return res.status(412).json({code: 412, custom_code: 'VALIDATION_ERROR', data : 'Created by should be of type string'});
    }

    if(req.body.hasOwnProperty('assignedTo') && (_.isEmpty(req.body.assignedTo) || !_.isString(req.body.assignedTo))){
        return res.status(412).json({code: 412, custom_code: 'VALIDATION_ERROR', data : 'Assigned to should be of type string'});
    }
    return next();
}

module.exports = {
    createTaskValidation: createTaskValidation,
    taskIdValidation: taskIdValidation,
    updateTaskValidation: updateTaskValidation
}