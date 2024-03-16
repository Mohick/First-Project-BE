const express = require("express");
const routes = express.Router();

const cors = require("cors")
const optionsCors = require('../../../../../../Config Cors')
const CRUD = require("../../../../../Controll Views/Discover/Send For Client/CRUD/update");

routes.patch('/update/item',cors(optionsCors),CRUD.updateLike)
module.exports = routes;
