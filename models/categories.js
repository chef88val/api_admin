
'use strict';

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var catSchema =  Schema({
    name: String,
    status: Boolean,
    hasSub: {type: Schema.ObjectId, ref: 'Subcategory'}
},{collection:'Categories'})


module.exports = mongoose.model('Category', catSchema)