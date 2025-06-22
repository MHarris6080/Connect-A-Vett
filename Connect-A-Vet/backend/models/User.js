const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['pet_owner', 'veterinarian', 'receptionist', 'admin'],
    default: 'pet_owner'
  },
  phone: String,
  address: String,
  resetToken: String,
  tokenExpiry: Date
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
