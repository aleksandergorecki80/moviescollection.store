const express = require('express');
const router = express.Router();
const { validateGenere, Genere} = require('../models/genresModel');

router.get('/', async(req, res) => {
    const generes = await Genere.find().sort('name');
    res.send(generes);
});

router.get('/:id', async(req, res) => {
    const genere = await Genere.findById(req.params.id);
    if(!genere) return res.status(404).send('Genere non found!');
    res.send(genere);
});

router.post('/', async(req, res) => {
    const result = validateGenere(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);
    const genere = new Genere({
        name: req.body.name
    });
    try {
        const result = await genere.save();
        res.send(result);
    } catch (err) {
        res.send(err.message);
    }
});

router.put('/:id', async(req, res) => {
    const result = validateGenere(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);
    const genere = await Genere.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name
        }
    }, { new: true, useFindAndModyfy:false });
    if(!genere) return res.status(404).send('Genere non found!');
    res.send(genere);
});

router.delete('/:id', async(req, res) => {
    const genere = await Genere.findByIdAndRemove(req.params.id,  { useFindAndModify: false });
    if(!genere) return res.status(404).send('Genere non found!');
    res.send(genere);
});

module.exports = router;