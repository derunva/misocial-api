'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PricingSchema = new Schema({
  title: {
    type: String,
    required: 'Kindly enter the name of the price plan'
  },
  img :{
     type: String,
     required: 'image is required'
  },
  price : {
    type: Number,
    required: 'Type price number'
  },
  descr: {
    type: String
  },
  Created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Pricings', PricingSchema);