const express = require("express");
const routes = express.Router();


const CRUD = require("../../../../../Controll Views/Discover/Send For Client/CRUD/update");

routes.patch('/update/item',CRUD.updateItem)
module.exports = routes;
