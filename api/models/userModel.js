'use strict';
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  nickName :{
    type: String,
    required: 'Set your nickname',
    minlength : 3,
    maxlength : 16,
    unique : true, 
    dropDups: true
  },
  avatar:{
    type :String,
    required: true
  },
  role: {
    type: String, 
    enum: ['admin', 'manager', 'customer'],
    default: 'customer'
  },
  email :{
    type: String,
    required : 'email is required',
    unique : true, 
    dropDups: true
  },
  password : {
    type : String,
    required : true
  },
  createdDate: {
    type: Date,
    default: Date.now
  }

});
function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}
UserSchema.path('email').validate(function (v) {
  return validateEmail(v);
});
UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
module.exports = mongoose.model('User', UserSchema);