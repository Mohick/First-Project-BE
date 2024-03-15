// Import Express module
const express = require('express');

// Create a router instance
const routes = express.Router();

// Import the JSON views controller
const PageViews = require('../../../../Controll Views/Discover/views mode/views json');

// Define route for JSON views
routes.get('/', PageViews.json);

// Export the router
module.exports = routes;
