const mongoose = require('mongoose');
const Joi = require('joi');

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
        enum: ['DVD', 'BluRey']
    },
    poster: String,
    description: String,
    year: Date,
    generes: [String],
    date: { type: Date, default: Date.now },
    isInCollection: Boolean,
    condition: {
        type: String,
        required: function () { return this.isInCollection; }
    }
});

const Film = mongoose.model('film', filmSchema); // jest to klasa dlatego z dużej litery

function validateFilm(film) {
    const schema = {
        title: Joi.string().min(2).max(255).required(),
        format: Joi.string().valid('DVD', 'BluRey').required(),
        poster: Joi.string(),
        description: Joi.string(),
        year: Joi.number(),
        generes: Joi.string(),
        isInCollection: Joi.boolean(),
        condition: Joi.string()
    };
    return Joi.validate(film, schema);
}

module.exports.Film = Film;
module.exports.validateFilm = validateFilm;
