// routes/userRoutes.js
const express = require('express');
const User = require('./addressSchema'); // Import the User model
const router = express.Router();

// Route to create a new user with an email
router.post('/create-user', async (req, res) => {
  const { email } = req.body; // Extract the email from the request body
  console.log("object")
  // Validate input
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    // Check if a user with the given email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Create a new User document
    const newUser = new User({
      email,
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});
router.get("/test" , async(req,res)=>{
    console.log("test succesfull")
    return res.status(200).json("hello")
})
module.exports = router;
