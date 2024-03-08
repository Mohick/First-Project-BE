const express = require("express");
const routes = express.Router();
const PageViews = require("../../../../Controll Views/Discover/CRUD/Update");
const upload = require("../../../../DiskStorage/DiskStorage");
const optionsCors = require('../../../../../Config Cors')
const cors = require('cors')
routes.patch("/multiple/", PageViews.multipleRestore);
routes.patch("/:id/", PageViews.restore);
routes.put("/:id/",upload.fields([{ name: "imageMusical" , maxCount: "1"},{ name: "audioMusical" , maxCount: "1"}]),  PageViews.update);
routes.get("/:id/", PageViews.viewUpdate);

module.exports = routes;
