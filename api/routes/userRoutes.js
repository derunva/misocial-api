'use strict'; 
var multer  = require('multer');
const passport = require('passport');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './assets/img')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+'.'+file.originalname.split('.').slice(-1).pop())
  }
})
var isAuth = (req, res, next) => {
  if(req.isAuthenticated()) {
    next()
  } else {
    res.sendStatus(401);
  }
}
var upload = multer({ storage: storage })
module.exports = function(app) {
  var user = require('../controllers/userController');

  // user Routes
  app.route('/users')
    .get(user.list_all_users)
    .post(upload.single('avatar'), user.create_a_user);


  app.route('/users/:userId')
    .get(user.read_a_user)
    .delete(isAuth, user.delete_a_user);
  app.put('/users/:userId', isAuth, upload.single('avatar'), user.update_a_user)

  app.get('/authrequired', isAuth, (req, res) => {
    res.send('ok')
  })

  app.post('/login', (req, res, next) => {
    console.log('Inside POST /login callback')
    passport.authenticate('local', (err, user, info) => {
      console.log('Inside passport.authenticate() callback');
      console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
      console.log(`req.user: ${JSON.stringify(req.user)}`)
      req.login(user, (err) => {
        console.log('Inside req.login() callback')
        console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
        console.log(`req.user: ${JSON.stringify(req.user)}`)
        return res.send('You were authenticated & logged in!\n');
      })
    })(req, res, next);
  })
};
