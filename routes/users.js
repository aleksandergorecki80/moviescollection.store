const express = require('express');
const router = express.Router();
const { User, validateUser } = require("../models/UserModel");

// Login page
router.get('/login', (req, res) => {
    res.send('Login')
});

// Register page
router.get('/register', (req, res) => {
    res.send('Register a new user')
});

//Register Handle
router.post('/register', (req, res) => {
    console.log(req.body)
    const result = validateUser(req.body);
    if(result.error){
        return res.status(400).send(result.error.details[0].message)
    }
    res.send('hello')    
})

module.exports = router;