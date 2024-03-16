const express = require("express");
const routes = express.Router();
const Update = require("./CRUD/Update");

routes.use('/crud',Update)
module.exports = routes;
