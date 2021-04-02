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
router.post('/register', async (req, res) => {
    console.log(req.body);
    
    const result = validateUser(req.body);
    if(result.error){
        return res.status(400).send(result.error.details[0].message)
    }
    // Validation passed
    const { name, email, password } = req.body;
    const user = await User.findOne( { email: email });
    if(user){
    return res.send('User already registered')
    }

    const newUser = new User({
        name,
        email,
        password
    });
    console.log(newUser, 'new User');
    try {
        const result = await newUser.save();
        res.status(200).send(result);
    } catch (ex) {  
        res.send(ex.message);
    }     
});

module.exports = router;