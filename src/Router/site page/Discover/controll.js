const express = require('express');
const routes= express.Router();
const HomePageDiscover= require('../../../Controll Views/Discover/home page')
const PageViewData= require('./views mode/views data')
const pageViewCreate= require('./views mode/views form create')
const pageViewTrash = require('./views mode/view trash')
const pageViewJson = require('./views mode/views json')
routes.use('/trash/', pageViewTrash)
routes.use('/format-json/', pageViewJson)
routes.use('/views-data/', PageViewData)
routes.use('/form-created/', pageViewCreate)
routes.get('/', HomePageDiscover.chooseMode)

module.exports = routes