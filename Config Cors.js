// Import the Express module
const express = require("express");

// Define the CORS options
const corsOptions = {
  origin: 'http://localhost:5173', // Specifies the allowed origin (frontend URL)
  credentials: true, // Indicates whether or not the server should expose the response to the browser's front-end code when credentials are included in the request (e.g., cookies, HTTP authentication)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specifies the HTTP methods that are allowed for CORS requests
};

// Export the CORS options for use in other parts of the application
module.exports = corsOptions;
