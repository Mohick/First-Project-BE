// Importing required modules
const express = require("express");
const routes = express.Router();
const PageViews = require("../../../Controll Views/Login/Sign In"); // Importing Sign In controller
const authention = require("../../../Controll Views/Login/authention"); // Importing authentication controller

// POST route for authentication
routes.post("/authention", authention.AuthenTionAdmin);

// GET route for Sign In page
routes.get("/", PageViews.views);

// Exporting routes
module.exports = routes;
