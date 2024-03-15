const express = require("express");
const routes = express.Router();

// Importing the handler for serving JSON data
const PageViews = require("../../../../Controll Views/Account/views mode/views json");

// Route for serving JSON data
routes.get("/", PageViews.json);

module.exports = routes;
