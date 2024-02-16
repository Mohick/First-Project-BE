const express = require("express");
const routes = express.Router();
const PageViews = require("../../../../Controll Views/Account/views mode/views trash");

routes.get("/", PageViews.views);

module.exports = routes;
