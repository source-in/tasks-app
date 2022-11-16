"use strict";
const { taskAction } = require("../../actions/taskActions");
const { BaseController } = require("../baseController");

class TaskController extends BaseController {
  constructor(req, res) {
    super(req, res);
  }

  async createTask() {
    try {
      const payload = await taskAction.createTask(this.models, this.reqBody);
      this.respondWithSuccess(payload);
    } catch (err) {
      console.log(err);
      this.respondWithError(err);
    }
  }

  async updateTask() {
    try {
      const payload = await taskAction.updateTask(this.models, this.reqBody, this.params.userId);
      this.respondWithSuccess("success");
    } catch (err) {
      this.respondWithError(err);
    }
  }

  async deleteTask() {
    try {
      const payload = await taskAction.deleteTask(
        this.models,
        this.params.userId
      );
      this.respondWithSuccess("success");
    } catch (err) {
      this.respondWithError(err);
    }
  }

  async getTasks() {
    try {
      const payload = await taskAction.getTasks(this.models);
      this.respondWithSuccess(payload);
    } catch (err) {
      this.respondWithError(err);
    }
  }
}

module.exports.TaskController = {
  createTask: async (req, res) => {
    return new TaskController(req, res).createTask();
  },
  updateTask: async (req, res) => {
    return new TaskController(req, res).updateTask();
  },
  deleteTask: async (req, res) => {
    return new TaskController(req, res).deleteTask();
  },
  getTasks: async (req, res) => {
    return new TaskController(req, res).getTasks();
  },
};
