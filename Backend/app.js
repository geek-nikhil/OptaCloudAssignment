const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./userRoute'); // Import user routes
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json()); // To parse JSON request bodies
app.use(express.json());
app.use(cors());

// Connect to MongoDB (replace with your actual MongoDB URL)
mongoose.connect('mongodb://localhost:27017/addressDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Use userRoutes for all routes starting with /user
app.use('/user', userRoutes); // Prefix routes with /user

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
