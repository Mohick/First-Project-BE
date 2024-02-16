const express = require("express");
const routes = express.Router();
const PageViews = require("../../../../Controll Views/Account/CRUD/Create");


routes.post("/", PageViews.create);

module.exports = routes;
