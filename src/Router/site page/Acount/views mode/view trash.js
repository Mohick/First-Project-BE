const express = require("express");
const routes = express.Router();
const PageViews = require("../../../../Controll Views/Account/views mode/views trash");
const restore = require("../CRUD/update");
const deleted = require("../CRUD/delete");

routes.use("/restore/", restore);
routes.use("/delete/", deleted);
routes.get("/", PageViews.views);

module.exports = routes;
