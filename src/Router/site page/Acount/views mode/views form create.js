const express = require('express');
const routes= express.Router();
const PageViews= require('../../../../Controll Views/Account/views mode/views form create')
const Created = require("../CRUD/create");

routes.use("/create/", Created);
routes.get('/', PageViews.views)

module.exports = routes