
'use strict';

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var subcatSchema =  Schema({
    name: String,
    status: Boolean,
    cat: {type: Schema.ObjectId, ref: 'Category'}
},{collection:'Subcategories'})


module.exports = mongoose.model('Subcategory', subcatSchema)