const router = require('express').Router();
const taskServices = require('../services/tasks.service');
const taskServiceInst = new taskServices();
const validator = require('../middleware/tasks.validation');

// API to get all tasks
router.get('/tasks', async function(req, res) {
    console.info("API -> GET /tasks");
    let result;
    try {
        // Calling the function to get the order data.
        result = await taskServiceInst.getTasks(undefined, req.query);
        return res.status(result.code).json(result);
    }
    catch(err) {
        return res.status(result.code).json(result);
    }}   
)

// API to create a task
router.post('/tasks', validator.createTaskValidation,  async function(req, res) {
    console.info("API -> POST /tasks");
    let result;
    try {
        const result = await taskServiceInst.createTask(req.body);
        return res.status(result.code).json(result);
    }
    catch(err) {
        return res.status(result.code).json(result);
    }}
)

// API to get a task detail based on task id.
router.get('/tasks/taskId/:id', async function(req, res) {
    console.info("API -> GET /tasks/taskId/:id")
    let result;
    try {
        result = await taskServiceInst.getTasks(req.params.id);
        return res.status(result.code).json(result);
    }
    catch(err) {
        return res.status(result.code).json(result);
    }}   
)

//API to delete a task
router.delete('/tasks', validator.taskIdValidation, async function(req, res) {
    console.info("API -> DELETE /tasks");
    let result;
    try {
        result = await taskServiceInst.deleteTask(req.body.id);
        return res.status(result.code).json(result);
    }
    catch(err) {
        return res.status(result.code).json(result);
    }}   
)

//API to update the task, user can update name, description, status, assignedTo keys.
router.put('/tasks', validator.updateTaskValidation, async function(req, res) {
    console.info("API -> UPDATE /tasks");
    let result;
    try {
        result = await taskServiceInst.updateTask(req.body);
        return res.status(result.code).json(result);
    }
    catch(err) {
        return res.status(result.code).json(result);
    }}   
)

//API to get the task metric based on status and timeline.
router.get('/tasks/metric', async function(req, res) {
    console.info("API -> GET /tasks/metric");
    let result;
    try {
        result = await taskServiceInst.getTasksMetric(req.query.filterKey);
        return res.status(result.code).json(result);
    }
    catch(err) {
        return res.status(result.code).json(result);
    }}   
)
module.exports = router;
