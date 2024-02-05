const express = require('express')
const routes = express.Router()
const HomeCreatePage= require('../../Controller/CreatePage/CreatePage')
const CRUDCreated = require('./CRUD/Account/Create')

routes.get('/account',CRUDCreated)
routes.get('/',HomeCreatePage.create)


module.exports = routes