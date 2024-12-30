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
router.post("/add-address", async (req, res) => {
    const { email, newAddress } = req.body; // Extract email and address from the request body
    // Check if both fields are provided
    if (!email || !newAddress) {
        return res.status(400).json({ message: "Email and address are required." });
    }
    console.log(newAddress)
    try {
        // Find the user by email
        const user = await User.findOne({ email });
        
      if (user) {
        // Add the new address to the user's addresses array
        user.addresses.push(newAddress);
        await user.save(); // Save the updated user
  
        return res.status(200).json({
          message: "Address added successfully.",
          user,
        });
      } else {
        return res.status(404).json({ message: "User not found." });
      }
    } catch (error) {
      console.error("Error adding address:", error.message);
      return res.status(500).json({ message: "Server error. Please try again later." });
    }
  });
    
    // Backend (Node.js with Express)
router.post('/delete-address', async (req, res) => {
  const { email, address } = req.body; // Assuming you're sending the email and the address to delete
  
  try {
    // Find and remove the address from the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const updatedAddresses = user.addresses.filter(addr => addr !== address);
    
    // Update user addresses in the database
    user.addresses = updatedAddresses;
    await user.save();
    
    res.status(200).json({ message: 'Address deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


  router.get('/get-addresses', async (req, res) => {
    const { email } = req.query; // Extract email from query parameters
     console.log(email)
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
  
    try {
      // Find the user by email
      const user = await User.findOne({ email });
  
      if (user) {
        res.status(200).json({ addresses: user.addresses });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching addresses:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.get("/test" , async(req,res)=>{
    console.log("test succesfull")
    return res.status(200).json("hello")
})
module.exports = router;
