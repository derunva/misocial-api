'use strict'; 
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
  var user = require('../controllers/userController');

  // user Routes
  app.route('/users')
    .get(user.list_all_users)
    .post(upload.single('avatar'), user.create_a_user);


  app.route('/users/:userId')
    .get(user.read_a_user)
    .delete(user.delete_a_user);
  app.put('/users/:userId', upload.single('avatar'), user.update_a_user)
};
