const mongoose = require('mongoose');

// Task schema
const taskSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
    createdBy: {
        type: String,
        required: true
    },
    assignedTo: {
        type: String,
        default: null
    },
    status: {
        type: String,
        default: 'open'  // Possible value are open|inprogress|closed
    }
})

//Creating the collection Tasks
const tasks = mongoose.model('tasks', taskSchema);
module.exports = tasks;
