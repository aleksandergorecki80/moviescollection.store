const express = require('express');
const router = express.Router();
const { User, validateUser } = require("../models/UserModel");
const passport = require('passport');


// Dashboard page  @ /api/users/dashboard
router.get('/dashboard', (req, res) => {
    res.send('dashboard')
});




// Register page
router.get('/register', (req, res) => {
    res.send('Register a new user')
});

//Register Handle
router.post('/register', async (req, res) => {
   
    const result = validateUser(req.body);
    if(result.error){
        return res.status(400).send(result.error.details[0].message)
    }
    // Validation passed
    const { name, email, password } = req.body;
    const user = await User.findOne( { email: email });
    if(user){
    return res.json({"error": "Email already registered"})
    }

    const newUser = new User({
        name,
        email,
        password
    });
    try {
        const result = await newUser.save();
        const info = {
            message: 'You are registered. Please log in.'
        }
        req.flash('info', info);
        res.redirect('/api/users/login');  
        // res.send(req.flash('info'));    
    } catch (ex) {  
        res.send(ex.message);
    }     
});

// Login page
router.get('/login', (req, res) => {
     res.send(req.flash('info'));
});

// Login handle
router.post('/login', (req, res) => {
    password.au
});

module.exports = router;