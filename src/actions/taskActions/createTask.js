"use strict";

const { BadRequestError } = require("../../errors");
const { taskExists } = require("./common/taskExists");

/**
 * @params {reqBody} type: Object {title:string} **required** {additionalInfo:string,completed:false}
 * @params {models} sequelize models **required**
 * @returns taskId type: Object eg: {taskId:integer}
 *
 * Creates task. checks if task exists on title key
 */
module.exports.createTask = async (models, reqBody) => {
  await validateReqBody(reqBody, models);
  const task = await models.Tasks.create({
    title: reqBody.title,
    additionalInfo: reqBody.additionalInfo,
    completed: reqBody.completed
  });
  return Promise.resolve({ taskId: task.id });
};

const validateReqBody = async (reqBody, models) => {
  if (!Object.keys(reqBody).length > 0) {
    throw new BadRequestError("Req body missing");
  }
  if (!reqBody.title) {
    throw new BadRequestError("title property missing in reqBody");
  }
  if (reqBody.title) {
    let task = await taskExists({ title: `${reqBody.title}` }, models);
    if (task) {
      throw new BadRequestError(`Task with title ${reqBody.title} already exists`);
    }
  }
};
