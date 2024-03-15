const express = require("express");
const routes = express.Router();

// Importing the controller for handling deletion operations
const PageViews = require("../../../../Controll Views/Discover/CRUD/Delete");

// Defining routes for different delete operations
routes.delete("/destroy/", PageViews.destroy); // Route for permanently deleting entries
routes.delete("/multipledestroy/", PageViews.multipleDestroy); // Route for deleting multiple entries
routes.delete("/:id", PageViews.softDelete); // Route for soft deleting (marking as deleted) a single entry

module.exports = routes;
