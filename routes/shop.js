'use strict';

var express = require('express');
var catController = require('../controllers/categories')
var subcatController = require('../controllers/subcategories')
var productsController = require('../controllers/products')
var statementsController = require('../controllers/prod_statements')

var api = express.Router()

api.get('/categories', catController.getcategories)
api.get('/categories/:id', catController.getcategoriesID)

api.put('/categories', catController.updatecategories)
api.put('/categories/:id', catController.updatecategories)

api.post('/categories', catController.savecategories)

api.get('/subcategories/', subcatController.getsubcategories)
api.get('/subcategories/:id', subcatController.getsubcategories)
api.get('/subcat/:id', subcatController.getsubcat)

api.put('/subcategories/:id', subcatController.updatesubcategories)

api.post('/subcategories', subcatController.savesubcategories)

api.get('/products', productsController.getproducts)
api.get('/product/:id', productsController.getproductID)

api.put('/product/:id', productsController.updateproducts)

api.post('/product', productsController.saveproducts)

api.get('/statements', statementsController.getstatements)

api.put('/statements', statementsController.updatestatements)

api.post('/statements', statementsController.savestatements)

/*cors(corsOptions), */

module.exports = api