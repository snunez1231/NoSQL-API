const mongoose = require('mongoose');
const express = require('express');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String
});

// Create model
const User = mongoose.model('User', userSchema);

// Example route to create a new user
app.post('/users', async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
