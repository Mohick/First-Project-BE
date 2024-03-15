const express = require('express');
const routes = express.Router();

// Importing the controller for handling the view of the form for creating data
const PageViews = require('../../../../Controll Views/Discover/views mode/views form create');

// Importing the controller for handling the creation of data
const Created = require("../CRUD/create");

// Defining routes
routes.use('/create', Created); // Route for handling data creation
routes.get('/', PageViews.views); // Route for rendering the form for data creation

module.exports = routes;
