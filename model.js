const mongoose = require('mongoose');

const User = mongoose.Schema({
  Name: { type: String, required: true },
  LastName: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  email: { type: String, required: true },
});

module.exports = mongoose.model('User', User);