import express from 'express';
import mongoose from 'mongoose';

// Create a router
const router = express.Router();

// Define the User schema and model (assuming it's the same as before)
const userSchema = new mongoose.Schema({
  id: Number,
  username: String,
  password: String,
  email: String,
});

const User = mongoose.model('User', userSchema);

// Route to get a user by ID
router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user by ID', error });
  }
});

// Route to get a user by username
router.get('/user/username/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user by username', error });
  }
});

export default router;
