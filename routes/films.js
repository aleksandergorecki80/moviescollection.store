const express = require('express');
const router = express.Router();
const { validateFilm, Film } = require('../models/filmsModel');


router.get('/', async (req, res) => {
        const films = await Film
            .find()
            .sort('title');
        res.send(films);
});

router.get('/:id', async (req, res) => {
        const film = await Film.findById(req.params.id);
        if(!film) return res.status(404).send('The film with given Id not found!');
        res.send(film);
});

router.post('/', async (req, res) => {
    const result = validateFilm(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);
    const film = new Film({
        title: req.body.title,
        format: req.body.format,
        poster: req.body.poster,
        description: req.body.description,
        year: req.body.year,
        generes: req.body.generes,
        isInCollection: req.body.isInCollection,
        condition: req.body.condition
    });
    try {
        const result = await film.save();
        res.send(result);
    } catch (ex) {
        res.send(ex.message);
    }
});

router.put('/:id', async (req, res) => {
    const result = validateFilm(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);
        const film = await Film.findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                format: req.body.format,
                poster: req.body.poster,
                description: req.body.description,
                year: req.body.year,
                generes: req.body.generes,
                isInCollection: req.body.isInCollection,
                condition: req.body.condition
            }
        }, { new: true, useFindAndModify: false });
        if(!film) return res.status(404).send('The film with given Id not found!');
        res.send(film);
});

router.delete('/:id', async (req, res) => {
        const result = await Film.findByIdAndRemove(req.params.id, { useFindAndModify: false });
        if(!result) return res.status(404).send('The film with given Id not found!');
        res.send(result);
});

module.exports = router;