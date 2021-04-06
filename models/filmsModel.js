const mongoose = require('mongoose');
const Joi = require('joi');
const { User } = require('./UserModel');

const filmSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
        trim: true
    },
    format: {
        type: String,
    },
    posterName: {
        type: String,
    },
    year: Number,
    condition: {
        type: String,
        required: function () { return this.isInCollection; }
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Film = mongoose.model('film', filmSchema); // jest to klasa dlatego z dużej litery

function validateFilm(film) {
    const schema = Joi.object({
        title: Joi.string().min(2).max(255).required(),
        format: Joi.string().required(),
        posterName: Joi.string().allow(''),
        // description: Joi.string(),
        year: Joi.number(),
        // generes: Joi.string(),
        // isInCollection: Joi.boolean(),
        condition: Joi.string().allow('')
    });
    return schema.validate(film);
}

module.exports.Film = Film;
module.exports.validateFilm = validateFilm;
