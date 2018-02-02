
'use strict';

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var prodSchema =  Schema({
    name: String,
    status: Boolean,
    description:[String],
    link: String,
    category: {type: Schema.ObjectId, ref: 'Category'},
    subcategory: {type: Schema.ObjectId, ref: 'Subcategory'},
    skin_qa: String,
    Stattrack: Boolean,
    stock: Number,
    status: String,
    active: Boolean,
    store: Boolean,
    ladder_gift: Boolean,
    date_appear: Date,
    date_disappear: Date,
    prize:{
        currency: String,
        real_prize: Number,
        amount: Number,
        deal: Number,
    },
    image: String
},{collection:'Products'})


module.exports = mongoose.model('Products', prodSchema)