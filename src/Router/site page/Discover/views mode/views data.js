const express = require("express");
const routes = express.Router();

// Importing the controller for handling views related to the data mode
const PageViews = require("../../../../Controll Views/Discover/views mode/views data");

// Importing controllers for handling update and delete operations
const viewsUpdate = require("../CRUD/update");
const viewsDelete = require("../CRUD/delete");

// Defining routes
routes.use("/delete/", viewsDelete); // Route for handling delete operations
routes.use("/edit/", viewsUpdate);   // Route for handling edit operations
routes.use("/update/", viewsUpdate); // Route for handling update operations
routes.get("/", PageViews.views);    // Route for rendering the data view

module.exports = routes;
