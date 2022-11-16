"use strict";

const models = require("../../models");
const {
  ResourceNotFoundError,
  BadRequestError,
  NotAuthorizedError,
  InternalError,
  NotAuthenticatedError,
} = require("../errors");

class BaseController {
  constructor(req, res) {
    this.expressRequest = req;
    this.reqBody = req.body;
    this.params = req.params;
    this.query = req.query;
    this.headers = req.headers;
    this.response = res;
    this.models = models;
  }

  respond(payload, status = 200) {
    this.response.status(status).send(payload);
  }

  respondWithSuccess(payload, headers = null) {
    if (headers) {
      this.respond({ type: "success", message: payload }, 200, headers);
    }
    this.respond({ type: "success", message: payload }, 200);
  }

  respondWithError(err) {
    if (err instanceof ResourceNotFoundError) {
      this.respond({ type: "error", message: err.message }, 404);
    } else if (err instanceof BadRequestError) {
      this.respond({ type: "error", message: err.message }, 400);
    } else if (err instanceof NotAuthorizedError) {
      this.respond({ type: "error", message: err.message }, 403);
    } else if (err instanceof InternalError) {
      this.respond({ type: "error", message: err.message }, 500);
    } else if (err instanceof NotAuthenticatedError) {
      this.respond({ type: "error", message: err.message }, 401);
    } else {
      this.respond({ type: "error", message: err.message }, 500);
    }
  }
}

module.exports = {
  BaseController: BaseController,
};
