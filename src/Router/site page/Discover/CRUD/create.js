const express = require("express");
const routes = express.Router();
const PageViews = require("../../../../Controll Views/Discover/CRUD/Create");
const upload = require("../../../../DiskStorage/DiskStorage");

routes.post("/", upload.fields([{ name: "imageMusical" , maxCount: "1"},{ name: "audioMusical" , maxCount: "1"}]), PageViews.create);

module.exports = routes;
