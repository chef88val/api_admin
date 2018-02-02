'use strict';

var express = require('express');
var catController = require('../controllers/categories')
var subcatController = require('../controllers/subcategories')

var api = express.Router()

api.get('/categories', catController.getcategories)

api.put('/categories', catController.updatecategories)

api.post('/categories', catController.savecategories)

api.get('/subcategories', subcatController.getsubcategories)

api.put('/subcategories', subcatController.updatesubcategories)

api.post('/subcategories', subcatController.savesubcategories)

/*cors(corsOptions), */

module.exports = api