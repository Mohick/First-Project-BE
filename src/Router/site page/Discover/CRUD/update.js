const express = require("express");
const routes = express.Router();

// Importing the controller for handling update operations
const PageViews = require("../../../../Controll Views/Discover/CRUD/Update");

// Importing multer middleware for handling file uploads
const upload = require("../../../../DiskStorage/DiskStorage");

// Defining routes for different update operations
routes.patch("/multiple/", PageViews.multipleRestore); // Route for restoring multiple entries
routes.patch("/:id/", PageViews.restore); // Route for restoring a single entry
routes.put("/:id/", upload.fields([{ name: "imageMusical", maxCount: "1" }, { name: "audioMusical", maxCount: "1" }]), PageViews.update); // Route for updating a single entry with file uploads
routes.get("/:id/", PageViews.viewUpdate); // Route for viewing an update form for a single entry

module.exports = routes;
