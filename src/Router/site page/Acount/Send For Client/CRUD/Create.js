const express = require("express");
const routes = express.Router();


const CRUD = require("../../../../../Controll Views/Account/Send For Client/CRUD/Create");

routes.post("/", CRUD.create);

module.exports = routes;
