const express = require("express");
const routes = express.Router();
const PageViews = require("../../../../Controll Views/Account/views mode/views data");
const viewsUpdate = require("../CRUD/update");
const viewsDelete = require("../CRUD/delete");

routes.use("/delete/", viewsDelete);
routes.use("/edit/", viewsUpdate);
routes.use("/update/", viewsUpdate);
routes.get("/", PageViews.views);

module.exports = routes;
