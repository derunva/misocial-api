var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Pricing = require('./api/models/pricingModel'), //created model loading here
  bodyParser = require('body-parser');
var cors = require('cors');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/PricingDb',{ useNewUrlParser: true }); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
app.use('/assets', express.static(__dirname + '/assets'));
var routes = require('./api/routes/pricingRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('RESTful API server started on: ' + port);