const express = require("express");
const routes = express.Router();

// Importing the handler for serving JSON data
const Session = require("../../../../Controll Views/Account/Send For Client/session account");
const CreateAtClient= require("./CRUD/Create")
const UpdateAtClient= require("./CRUD/Update")

// Route for serving JSON data
routes.use("/crud/create",CreateAtClient );
routes.use("/crud/update",UpdateAtClient );

// Route for handling login requests
routes.post("/login", Session.loginAccount);

// Route for checking email existence before updating
routes.get('/checkbeforeupdate',Session.checkEmailBeforeUpdateAtClient)

// Route for automatic login
routes.get("/automatic/login", Session.sessionDataAccount);

// Route for checking if email is unused
routes.get("/:email", Session.returnUnusedEmail);

module.exports = routes;
