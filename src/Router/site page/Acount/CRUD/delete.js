const express = require("express");
const routes = express.Router();
const PageViews = require("../../../../Controll Views/Account/CRUD/Delete");

routes.delete("/destroy/", PageViews.destroy);
routes.delete("/multipledestroy/", PageViews.multipleDestroy);
routes.delete("/:id", PageViews.softDelete);

module.exports = routes;
