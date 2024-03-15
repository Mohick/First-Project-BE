// Importing required modules
const express = require('express');
const routes= express.Router();
const MainPage= require('../../Controll Views/main page'); // Importing main page controller

// GET route for main page
routes.get('/', MainPage.home);

// Exporting routes
module.exports = routes;
