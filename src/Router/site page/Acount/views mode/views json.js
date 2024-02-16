const express = require('express');
const routes= express.Router();
const PageViews= require('../../../../Controll Views/Account/views mode/views json')


routes.get('/', PageViews.json)

module.exports = routes