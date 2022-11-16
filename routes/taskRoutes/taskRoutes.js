"use strict";

const {
  TaskController,
} = require("../../src/controllers/taskController/taskController");
const { baseRouteUrl } = require("../globalVariables");

const TaskRoutes = (app, auth) => {
  app.get(`${baseRouteUrl}/tasks/list`, TaskController.getTasks);
  app.post(`${baseRouteUrl}/tasks/create`, TaskController.createTask);
  app.patch(`${baseRouteUrl}/tasks/update/:userId`, TaskController.updateTask);
  app.delete(`${baseRouteUrl}/tasks/delete/:userId`, TaskController.deleteTask);
};

module.exports = TaskRoutes;
