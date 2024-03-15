const express = require('express');
const routes = express.Router();

// Importing the handler for rendering the form to create an account
const PageViews = require('../../../../Controll Views/Account/views mode/views form create');

// Importing the router for creating an account
const Created = require("../CRUD/create");

// Mounting the router for creating an account under the "/create" path
routes.use("/create", Created);

// Route for rendering the form to create an account
routes.get('/', PageViews.views);

module.exports = routes;
