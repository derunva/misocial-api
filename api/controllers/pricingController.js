'use strict';


var mongoose = require('mongoose'),
  Pricing = mongoose.model('Pricings');

exports.list_all_pricings = function(req, res) {
  Pricing.find({}, function(err, pricing) {
    if (err)
      res.send(err);
    res.json(pricing);
  });
};




exports.create_a_pricing = function(req, res) {
  var new_pricing = new Pricing(req.body);
  new_pricing.save(function(err, pricing) {
    if (err)
      res.send(err);
    res.json(pricing);
  });
};


exports.read_a_pricing = function(req, res) {
  Pricing.findById(req.params.pricingId, function(err, pricing) {
    if (err)
      res.send(err);
    res.json(pricing);
  });
};


exports.update_a_pricing = function(req, res) {
  Pricing.findOneAndUpdate({_id: req.params.pricingId}, req.body, {new: true}, function(err, pricing) {
    if (err)
      res.send(err);
    res.json(pricing);
  });
};


exports.delete_a_pricing = function(req, res) {


  Pricing.remove({
    _id: req.params.pricingId
  }, function(err, pricing) {
    if (err)
      res.send(err);
    res.json({ message: 'pricing successfully deleted' });
  });
};