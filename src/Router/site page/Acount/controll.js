const express = require('express');
const routes = express.Router();

// Importing controllers/handlers for various views
const HomePageAccount = require('../../../Controll Views/Account/home page');
const viewsData = require('./views mode/views data');
const viewsFormCreate = require('./views mode/views form create');
const viewsJson = require('./views mode/views json');
const viewsTrash = require('./views mode/view trash');
const CRUD= require('../Acount/Send For Client/session acount')
// Defining routes and associating them with corresponding handlers
routes.use('/format-json/', viewsJson); // Route for JSON data
routes.use('/trash/', viewsTrash);       // Route for trash views
routes.use('/views-data/', viewsData);   // Route for data views
routes.use('/form-created/', viewsFormCreate); // Route for form creation views
routes.use('/client',CRUD)
routes.get('/', HomePageAccount.chooseMode);   // Default route for home page

module.exports = routes;
