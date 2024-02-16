const express = require('express');
const routes= express.Router();
const HomePageAccount= require('../../../Controll Views/Account/home page')
const viewsData = require('./views mode/views data')
const viewsFormCreate = require('./views mode/views form create')
const viewsJson = require('./views mode/views json')
const viewsTrash = require('./views mode/view trash')

routes.use('/trash/', viewsTrash)
routes.use('/format-json/', viewsJson)
routes.use('/views-data/', viewsData)
routes.use('/form-created/', viewsFormCreate)
routes.get('/', HomePageAccount.chooseMode)

module.exports = routes