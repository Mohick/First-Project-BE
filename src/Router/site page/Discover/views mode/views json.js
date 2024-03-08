const express = require('express');
const routes= express.Router();
const PageViews= require('../../../../Controll Views/Discover/views mode/views json')
const UpdateLike= require('../../../../Controll Views/Discover/CRUD/Update')
const corsOptions = require('../../../../../Config Cors')
const cors = require('cors')


routes.patch("/uploadLiked/",cors(corsOptions),UpdateLike.updateLike)
routes.get('/', cors(corsOptions),PageViews.json)
module.exports = routes