
'use strict';

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var statementSchema =  Schema({
    name: String,
    status: Boolean
},{collection:'Statements'})


module.exports = mongoose.model('Statement', statementSchema)