const express = require("express");
const routes = express.Router();

// Importing the handler for viewing account data
const PageViews = require("../../../../Controll Views/Account/views mode/views data");

// Importing the router for update and delete operations
const viewsUpdate = require("../CRUD/update");
const viewsDelete = require("../CRUD/delete");

// Mounting the routes for CRUD operations under their respective paths
routes.use("/delete", viewsDelete);
routes.use("/edit", viewsUpdate); // I suggest changing this to "update" for consistency
routes.use("/update", viewsUpdate);

// Route for viewing account data
routes.get("/", PageViews.views);

module.exports = routes;
