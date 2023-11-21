// backend/routes/authRoutes.js
const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();

router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  res.json({ user: req.user });
});

// Signup Route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Hash the password before saving it to the database

    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
  