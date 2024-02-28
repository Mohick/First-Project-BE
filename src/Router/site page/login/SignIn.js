const express = require("express");
const routes = express.Router();
const PageViews = require("../../../Controll Views/Login/Sign In");
const authention = require("../../../Controll Views/Login/authention");

routes.post("/authention", authention.AuthenTionAdmin);
routes.get("/", PageViews.views);

module.exports = routes;
