const express = require("express");
const routes = express.Router();
const PageViews = require("../../../../Controll Views/Account/CRUD/Create");
const cors = require("cors");
const optionsCors= require("../../../../../Config Cors")
routes.post("/", cors(optionsCors),PageViews.create);

module.exports = routes;
