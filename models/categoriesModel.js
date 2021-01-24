const mongoose = require('mongoose');
const Joi = require('joi');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 25,
        trim: true
    }
});

const Category = mongoose.model('category', categorySchema);

function validateCategory(category){
    const schema = {
        name: Joi.string().min(2).max(25).required()
    };
    return Joi.validate(category, schema);
};


module.exports.Category = Category;
module.exports.validateCategory = validateCategory;