const mongoose = require('mongoose');
const Joi = require('joi');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 25
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}); 

const User = mongoose.model('User', UserSchema);

function validateUser(user) {
    const schema = Joi.object ({
        name: Joi.string().min(5).max(25).required(),
        email: Joi.string().email().required().min(5).max(50),
        // password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,20}$')),
        password: Joi.string(),
        repeat_password: Joi.ref('password'),
    });
    // return Joi.validate(user, schema);
    return schema.validate(user);
}

module.exports.User = User;
module.exports.validateUser = validateUser;