const express = require("express");
const routes = express.Router();
const PageViews = require("../../../../Controll Views/Account/CRUD/Update");

routes.patch("/multiple/", PageViews.multipleRestore);
routes.patch("/:id/", PageViews.restore);
routes.put("/:id/", PageViews.update);
routes.get("/:id/", PageViews.viewUpdate);

module.exports = routes;
