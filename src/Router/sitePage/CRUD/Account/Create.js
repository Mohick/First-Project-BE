const express = require('express')
const routes = express.Router()
const HomeCreatePage= require('../../../../Controller/Account/Views Created')
const createAccountPage= require('../../../../Controller/Account/Crud/Create')


routes.post('/create',createAccountPage.createAccount)
routes.get('/',HomeCreatePage.created)


module.exports = routes