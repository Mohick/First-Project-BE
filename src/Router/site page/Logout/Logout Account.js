// Importing required modules
const express = require('express');
const routes= express.Router();

// Route to handle logout for user
routes.get('/user', function(req, res, next) {
    // Check if user session exists
    if(!!req.session.account) {
        // Delete user session
        delete req.session.account
        // Redirect back to previous page
        return res.redirect("back");
    } else {
        // If no user session exists, redirect back to previous page
        return res.redirect("back");
    }
});

// Route to handle logout for admin
routes.get('/admin', function(req, res, next) {
    // Check if admin session exists
    if(!!req.session.admin) {
        // Delete admin session
        delete req.session.admin
        // Redirect back to previous page
        return res.redirect("back");
    } else {
        // If no admin session exists, redirect back to previous page
        return res.redirect("back");
    }
});

module.exports = routes;
