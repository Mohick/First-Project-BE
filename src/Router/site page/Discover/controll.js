// Import Express module
const express = require('express');

// Create a router instance
const routes = express.Router();

// Import controllers for different views and functionalities
const HomePageDiscover = require('../../../Controll Views/Discover/home page');
const PageViewData = require('./views mode/views data');
const pageViewCreate = require('./views mode/views form create');
const pageViewTrash = require('./views mode/view trash');
const pageViewJson = require('./views mode/views json');
const CRUD = require('./Send For Client/CRUD/Update')
// Define routes for different functionalities
routes.use('/trash/', pageViewTrash); // Route for trash view
routes.use('/format-json/', pageViewJson); // Route for JSON view
routes.use('/views-data/', PageViewData); // Route for data view
routes.use('/form-created/', pageViewCreate); // Route for create form view
routes.use('/client',CRUD)
routes.use('/loginout',CRUD)
routes.get('/', HomePageDiscover.chooseMode); // Route for home page

// Export the router
module.exports = routes;
