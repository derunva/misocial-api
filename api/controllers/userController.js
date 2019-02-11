var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  fs = require('fs');
var path = require('path');
var appDir = path.dirname(require.main.filename);
exports.list_all_users = function(req, res) {
  User.find({}, function(err, users) {
    if (err)
      res.send(err);
    res.json(users);
  });
};




exports.create_a_user = function(req, res) {
  var new_user = new User(req.body);
  var fullUrl = req.protocol + '://' + req.get('host') +'/';
  if(req.file){
    new_user['avatar'] = fullUrl+req.file.path;
  }
  
  new_user.save(function(err, user) {
    if (err){
      res.status(400).send(err);
    }
    else{
      user.password = undefined
    }
    

    res.json(user);
  });
};


exports.read_a_user = function(req, res) {
  User.findById(req.params.userId, function(err, user) {
    if (err){
      res.send(err);
    }
    else{
      user.password = undefined
    }
    res.json(user);
  });
};

function updateUser (id, userNewData, res){
  User.findOneAndUpdate({_id: id}, userNewData, {new: true}, function(err, user) {
    if (err){
      res.status(400).send(err);
    }
    else{
      user.password = undefined
    }
    res.json(user);
  });
}

exports.update_a_user = function(req, res) {
  console.log(req.file, req.body, req.params)
  var userNewData = req.body;
  if(req.file){
    User.findById(req.params.userId, function(err, user) {
      let imgNameArray = user.avatar.split('/')
      let imgPath = appDir+'/assets/img/'+imgNameArray[imgNameArray.length-1]

      fs.unlink(imgPath, (err) => {
        // if (err) throw err;
        console.log('successfully deleted /tmp/hello');
      });
      var fullUrl = req.protocol + '://' + req.get('host') +'/';
      imageUrl = fullUrl+req.file.path;
      userNewData['avatar'] = imageUrl;
      updateUser(req.params.userId,userNewData, res)
    })
    
  }else{
    updateUser(req.params.userId,userNewData, res)
  }
  
};


exports.delete_a_user = function(req, res) {
  User.findById(req.params.userId, function(err, user) {
    let imgNameArray = user.avatar.split('/')
    let imgPath = appDir+'/assets/img/'+imgNameArray[imgNameArray.length-1]

    fs.unlink(imgPath, (err) => {
      // if (err) throw err;
      console.log('successfully deleted');
    });
  })

  User.remove({
    _id: req.params.userId
  }, function(err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'user successfully deleted' });
  });
};