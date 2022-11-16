"use strict";

const { ResourceNotFoundError } = require("../../errors");

module.exports.deleteTask = async (models, taskId) => {
  const task = await checkIfTaskExists(taskId, models);
  if (task) {
    await models.Tasks.destroy({
      where: {
        id: taskId,
      },
    });
  } else {
    throw new ResourceNotFoundError(`Task with ID ${taskId}`);
  }
};

const checkIfTaskExists = async (taskId, models) => {
  const task = await models.Tasks.findOne({
    where: {
      id: taskId,
    },
  });
  return task ? task : false;
};

