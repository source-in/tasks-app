"use strict";

/**
 * @params {models}
 *
 * @returns {object} eg: {tasks: [{id: integer, title:string, additionalInfo:string, completed:boolean}]}
 *
 * Fetches all Tasks
 */

module.exports.getTasks = async (models) => {
  const tasks = await models.Tasks.findAll({
    attributes: ["id", "title", "additionalInfo", "completed"],
  });
  return Promise.resolve({ tasks: tasks });
};
