const express = require('express');
const router = express.Router();
const { validateCategory, Category} = require('../models/categoriesModel');

router.get('/', async (req, res) => {
    const categories = await Category.find().sort('name');
    res.send(categories)
  });

router.get('/:id', async (req, res) => {
  const categories = await Category.findById(req.params.id);
  if(!categories) return res.status(404).send('Category not found!');
  res.send(category);
});

router.post('/', async (req, res) => {
  const result = validateCategory(req.body);
  if (result.error) return res.status(400).send(result.error.details[0].message);
    const category = new Category({
      name: req.body.name
    });
    try {
      const result = await category.save();
      res.send(result);
    } catch (err) {
      res.send(err.message);
    }
});

router.put('/:id', async (req, res) => {
  const result = validateCategory(req.body);
  if (result.error) return res.status(400).send(result.error.details[0].message);
  const category = await Category.findByIdAndUpdate(req.params.id, {
    $set: {
      name: req.body.name
    }
  }, { new: true, useFindAndModify: false });
  if(!categories) return res.status(404).send('Category not found!');
  res.send(category);
});

router.delete('/:id', async (req,res) => {
    const category = await Category.findByIdAndRemove(req.params.id, { useFindAndModify: false });
    if(!category) return res.status(404).send('Category not found!');
    res.send(category);
});

module.exports = router;