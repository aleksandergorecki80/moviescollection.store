const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const { User, validateUser } = require('../models/UserModel');
const mongoose = require('mongoose');

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.post('/', async (req, res) => {
  console.log(req.body)
  const result = validateUser(req.body);
  if (result.error) {
    return res.status(400).json({error: result.error.details[0].message});
  }
  // Validation passed
  const { name, email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    return res.status(400).json({ error: 'Email already registered' });
  }
  const newUser = new User({
    name,
    email,
    password,
  });
  try {
    const result = await newUser.save();
    const info = {
      message: 'You are registered. Please log in.',
    };
    res.send(info);
  } catch (ex) {
    res.send(ex.message);
  }
});

module.exports = router;
