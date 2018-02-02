'use strict';

var express = require('express');
var catController = require('../controllers/subcategories')

var api = express.Router()

api.get('/subcategories', catController.getsubcategories)

api.put('/subcategories', catController.updatesubcategories)

api.post('/subcategories', catController.savesubcategories)

/*cors(corsOptions), */

module.exports = api