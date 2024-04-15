const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
const saltRounds = 10

const User = mongoose.Schema({
  Name: { type: String, required: true },
  LastName: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

User.pre('save', function( next ) {
  var user = this

  if (user.isModified('password')) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if (err) return next(err)
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err)
          user.password = hash
          next()
      });
    });
  } else {
    next()
  }
})

User.methods.comparePassword = function(plainPassword, cb) {
  var user = this
  return bcrypt.compare(plainPassword, user.password, function(err, isMatch) {
    if (err) return cb(err), 
      cb(null, isMatch)
  })
}

module.exports = mongoose.model('User', User);