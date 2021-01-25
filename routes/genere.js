const express = require('express');
const router = express.Router();
const { validateGenere, Genere} = require('../models/genresModel');

router.get('/', async(req, res) => {

});

router.get('/:id', async(req, res) => {

});

router.post('/', async(req, res) => {
    const result = validateGenere(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);
    const genere = new Genere({
        
    })
});

router.put('/:id', async(req, res) => {

});

router.delete('/:id', async(req, res) => {

});

module.exports = router;