var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Pricing = require('./api/models/pricingModel'), //created model loading here
  User = require('./api/models/userModel'), //created model loading here
  bodyParser = require('body-parser');
var cors = require('cors');
const uuid = require('uuid/v4')
const session = require('express-session')
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/PricingDb',{ useNewUrlParser: true }); 
mongoose.set('useCreateIndex', true)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
app.use('/assets', express.static(__dirname + '/assets'));
var auth = require('./api/controllers/authController')
auth(app)
var routes = require('./api/routes/pricingRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/userRoutes'); //importing route
routes(app); //register the route

app.listen(port);


console.log('RESTful API server started on: ' + port);