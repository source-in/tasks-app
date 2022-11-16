//@ts-check

"use strict";

// @ts-ignore
const { BadRequestError, ResourceNotFoundError } = require('../../errors');
const { taskExists } = require("./common/taskExists");

/**
 * @params {object} reqBody eg: {title: string} **required** {additionalInfo: string, completed:boolean}
 * @params {models} sequelize models object
 * @returns Promise<Task> eg: {task:{title:string, additionalInfo:string, completed:boolean, id:integer}}
 */

module.exports.updateTask = async (models, reqBody, userId) => {
  await validateReqBody(reqBody);
  const task = await taskExists({ id: +userId }, models);
  //console.log(task)
  try {
    if (task) {
      let updatObj = await sanitizeBody(reqBody);
      const updatedTask = await models.Tasks.update(updatObj, {
        where: {
          id: task.id,
        },
      });
      return Promise.resolve(updatedTask);
    } else {
        throw new ResourceNotFoundError(`Task with ID ${userId}`);
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const validateReqBody = async (reqBody) => {
  if (!reqBody) throw new BadRequestError("ReqBody missing");
  if (!reqBody.title)
    throw new BadRequestError("title required to update task");
};

const sanitizeBody = async (reqBody) => {
  let toReturn = {};
  Object.keys(reqBody).map((key) => {
    toReturn[key] = reqBody[key];
  });
  console.log(toReturn);
  return toReturn;
};
