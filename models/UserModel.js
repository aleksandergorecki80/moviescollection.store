const mongoose = require('mongoose');
const Joi = require('joi');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
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
        name: Joi.string().min(2).max(255).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        repeat_password: Joi.ref('password'),
    });
    // return Joi.validate(user, schema);
    return schema.validate(user);
}

module.exports.User = User;
module.exports.validateUser = validateUser;