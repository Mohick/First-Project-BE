const express = require("express");
const routes = express.Router();

const CRUD = require("../../../../../Controll Views/Account/Send For Client/CRUD/Update");

routes.patch("/like", CRUD.updateLike);
routes.patch("/", CRUD.updateAccountClient);

module.exports = routes;
