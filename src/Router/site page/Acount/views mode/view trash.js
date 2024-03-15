const express = require("express");
const routes = express.Router();

// Importing the handler for viewing items in the trash
const PageViews = require("../../../../Controll Views/Account/views mode/views trash");

// Importing the router for restoring items
const restore = require("../CRUD/update");

// Importing the router for permanently deleting items
const deleted = require("../CRUD/delete");

// Mounting the routes for restoring and deleting items under their respective paths
routes.use("/restore", restore);
routes.use("/delete", deleted);

// Route for viewing items in the trash
routes.get("/", PageViews.views);

module.exports = routes;
