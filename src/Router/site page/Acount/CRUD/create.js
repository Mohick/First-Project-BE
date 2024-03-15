const express = require("express");
const routes = express.Router();
const CRUD = require("../../../../Controll Views/Account/CRUD/Create");

// Route for handling POST requests to create data
routes.post("/", CRUD.create);

module.exports = routes;
