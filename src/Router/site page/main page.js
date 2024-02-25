const express = require('express');
const routes= express.Router();
const MainPage= require('../../Controll Views/main page')
routes.get('/', MainPage.home)
module.exports = routes