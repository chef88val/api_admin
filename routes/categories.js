'use strict';

var express = require('express');
var catController = require('../controllers/categories')
var subcatController = require('../controllers/subcategories')
var productsController = require('../controllers/products')
var statementsController = require('../controllers/statements')

var api = express.Router()

api.get('/categories', catController.getcategories)

api.put('/categories', catController.updatecategories)

api.post('/categories', catController.savecategories)

api.get('/subcategories', subcatController.getsubcategories)

api.put('/subcategories', subcatController.updatesubcategories)

api.post('/subcategories', subcatController.savesubcategories)

/* api.get('/statements', statementsController.getstatements)

api.put('/statements', statementsController.updatestatements)

api.post('/statements', statementsController.savestatements)  */
api.get('/products', productsController.getproducts)

api.put('/products', productsController.updateproducts)

api.post('/products', productsController.saveproducts)


/*cors(corsOptions), */

module.exports = api