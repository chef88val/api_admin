
'use strict';

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var catSchema =  Schema({
    name: String,
    status: Boolean
},{collection:'Categories'})


module.exports = mongoose.model('Category', catSchema)