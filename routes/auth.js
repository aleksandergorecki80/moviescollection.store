const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const { User, validateUser } = require('../models/UserModel');
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const Joi = require('joi');
const config = require('config');
const jwtPrivateKey = config.get('jwt_private_key');


// const dotenv = require('dotenv');
// dotenv.config();
// const jwtPrivateKey = process.env.JWT_PRIVATE_KEY;

router.post('/', async (req, res) => {
  const result = validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }
  // Validation passed
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).json({ error: 'Invalid email or password.' });
  }
  // Checking if password matches
  const validPassword = await bcryptjs.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ error: 'Invalid email or password.' });
  }
  const token = jwt.sign({ _id: user._id }, jwtPrivateKey);
  res.header('x-auth-token', token).send('Logged');
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().email().required().min(5).max(50),
    password: Joi.string(),
  });
  return schema.validate(req);
}

module.exports = router;
