const express = require('express')
const routes = express.Router()
const HomePage= require('../../Controller/HomePage/homepage')

routes.get('/',HomePage.homePage)


module.exports = routes