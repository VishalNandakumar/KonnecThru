const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  email: {type: String, required:true},
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  phoneNumber: { type: String, required: true },
  userType: { type: String, default: 'user' } // Default is 'user'
});

module.exports = mongoose.model('User', userSchema);
