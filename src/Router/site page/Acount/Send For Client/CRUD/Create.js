const express = require("express");
const routes = express.Router();

const cors = require("cors")
const optionsCors = require('../../../../../../Config Cors')
const CRUD = require("../../../../../Controll Views/Account/Send For Client/CRUD/Create");
routes.post("/",cors(optionsCors), CRUD.create);

module.exports = routes;
