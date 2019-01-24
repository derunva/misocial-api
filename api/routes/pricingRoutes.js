'use strict';
var fs = require('fs');
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './assets/img')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+'.'+file.originalname.split('.').slice(-1).pop())
  }
})
var upload = multer({ storage: storage })
module.exports = function(app) {
  var pricing = require('../controllers/pricingController');

  // pricing Routes
  app.route('/pricing')
    .get(pricing.list_all_pricings)
    .post(upload.single('img'), pricing.create_a_pricing);


  app.route('/pricing/:pricingId')
    .get(pricing.read_a_pricing)
    .put(pricing.update_a_pricing)
    .delete(pricing.delete_a_pricing);
};
