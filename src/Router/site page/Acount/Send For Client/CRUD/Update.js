const express = require("express");
const routes = express.Router();
const cors = require("cors")
const optionsCors = require('../../../../../../Config Cors')
const CRUD = require("../../../../../Controll Views/Account/Send For Client/CRUD/Update");
routes.patch("/like",cors(optionsCors), CRUD.updateLike);
routes.patch("/",cors(optionsCors), CRUD.updateAccountClient);

module.exports = routes;
