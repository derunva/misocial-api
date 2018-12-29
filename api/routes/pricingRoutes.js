'use strict';
module.exports = function(app) {
  var pricing = require('../controllers/pricingController');

  // pricing Routes
  app.route('/pricing')
    .get(pricing.list_all_pricings)
    .post(pricing.create_a_pricing);


  app.route('/pricing/:pricingId')
    .get(pricing.read_a_pricing)
    .put(pricing.update_a_pricing)
    .delete(pricing.delete_a_pricing);
};
