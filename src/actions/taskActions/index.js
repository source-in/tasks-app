const { createTask } = require('./createTask');
const { deleteTask } = require('./deleteTask');
const { updateTask } = require('./updateTask');
const { getTasks } = require('./getTasks');

module.exports.taskAction = {
    createTask,
    updateTask,
    deleteTask,
    getTasks
}