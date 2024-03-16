const express = require("express");
const routes = express.Router();
const cors = require("cors")
const optionsCors = require('../../../../../Config Cors')
// Importing the handler for serving JSON data
const Session = require("../../../../Controll Views/Account/Send For Client/session account");
const CreateAtClient= require("./CRUD/Create")
const UpdateAtClient= require("./CRUD/Update")

// Route for serving JSON data
routes.use("/crud/create",CreateAtClient );
routes.use("/crud/update",UpdateAtClient );

// Route for handling login requests
routes.post("/login",cors(optionsCors), Session.loginAccount);

// Route for checking email existence before updating
routes.get('/checkbeforeupdate',cors(optionsCors),Session.checkEmailBeforeUpdateAtClient)

// Route for automatic login
routes.get("/automatic/login",cors(optionsCors), Session.autoLogin);

// Route for checking if email is unused
routes.get("/:email",cors(optionsCors), Session.returnUnusedEmail);

module.exports = routes;
