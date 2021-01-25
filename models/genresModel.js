const mongoose = require('mongoose');
const Joi = require('joi');
const { validateCategory } = require('./categoriesModel');

const genereSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 25,
        trim: true
    }
});

const Genere = mongoose.model('genere', genereSchema);

function validateGenere(genere){
    const schema = {
        name: Joi.string().min(2).max(25).required()
    };
    return Joi.validate(genere, schema);
};

module.exports.Genere = Genere;
module.exports.validateGenere = validateGenere;