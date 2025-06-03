const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  isSubscribed: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userSchema);
