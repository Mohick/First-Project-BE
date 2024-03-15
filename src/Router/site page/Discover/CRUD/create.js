const express = require("express");
const routes = express.Router();

// Importing the controller for creating new entries
const PageViews = require("../../../../Controll Views/Discover/CRUD/Create");

// Importing the multer middleware for handling file uploads
const upload = require("../../../../DiskStorage/DiskStorage");

// Defining a route for handling POST requests to create new entries
routes.post("/", upload.fields([{ name: "imageMusical" , maxCount: "1"},{ name: "audioMusical" , maxCount: "1"}]), PageViews.create);

module.exports = routes;
