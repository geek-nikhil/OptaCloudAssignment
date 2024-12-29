const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // Unique email for the user
  addresses: [String], // Array of address strings
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
