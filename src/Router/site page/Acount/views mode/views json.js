const express = require('express');
const routes= express.Router();
const PageViews= require('../../../../Controll Views/Account/views mode/views json')
const cors = require('cors')
const optionsCors = require('../../../../../Config Cors')
routes.get('/session/:id',cors(optionsCors), PageViews.sessionDataAccount)
routes.get('/',cors(optionsCors), PageViews.json)

module.exports = routes