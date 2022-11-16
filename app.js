"use strict";

const express = require("express");
const cors = require("cors");
const path = require('path')
require('dotenv').config()
const { Routes } = require("./routes");

const app = express();
const port = process.env.PORT || 2000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

module.exports = app;

app.listen(port, () => {
  console.log(
    `Server running on ${port} in ${process.env.NODE_ENV} Environment`
  );
  console.log(path.join(__dirname+'/index.html'))
});

/* you can pass your auth middleware from here if needed */
Routes.TaskRoutes(app);

app.get("/", (_, res) => {
  console.log(_.params);
  // res.send({
  //   type: "success",
  //   message: "success",
  // });
  res.sendFile(path.join(__dirname+'/index.html'))
});