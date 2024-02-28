const express = require('express');
const routes= express.Router();
const PageViews= require('../../../../Controll Views/Account/views mode/views json')
const optionsCors = require('../../../../../Config Cors')
const cors = require('cors')

routes.get('/', cors(optionsCors),PageViews.json)

module.exports = routes