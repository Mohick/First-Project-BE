const express = require("express");
const routes = express.Router();

// Importing the controller for handling views related to the trash mode
const PageViews = require("../../../../Controll Views/Discover/views mode/views trash");

// Importing controllers for handling restore and delete operations
const restore = require("../CRUD/update");
const deleted = require("../CRUD/delete");

// Defining routes
routes.use("/restore/", restore); // Route for restoring items from the trash
routes.use("/delete/", deleted); // Route for deleting items permanently
routes.get("/", PageViews.views); // Route for rendering the trash view

module.exports = routes;
