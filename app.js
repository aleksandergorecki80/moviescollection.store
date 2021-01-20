const Joi = require('joi');
const express = require('express');
const app = express();
const port = 5000;

const categories = [
  {
    id: 1,
    title: "DVD"
  },
  {
    id: 2,
    title: "VHS"
  },
  {
    id: 3,
    title: "BluRey"
  }
];

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!!!')
});

app.get('/api/categories', (req, res) => {
    res.send(categories)
  });

app.get('/api/categories/:id', (req, res) => {
  const category = categories.find((cat) => {
    return cat.id === parseInt(req.params.id);
  });
  if(!category) return res.status(404).send('Category not found');
  res.send(category);
});

app.post('/api/categories', (req, res) => {
  const result = validateCategory(req.body);
  if(result.error) return res.status(400).send(result.error.details[0].message);
 
    const category = {
      id: categories.length + 1,
      title: req.body.title
    }
    categories.push(category);
    res.send(categories);
  
});

app.put('/api/categories/:id', (req, res) => {
  const category = categories.find((cat) => {
    return cat.id === parseInt(req.params.id);
  });
  if(!category) return res.status(404).send('Category not found');

  const result = validateCategory(req.body);

  if(result.error) return res.status(400).send(result.error.details[0].message);
    category.title = req.body.title;
    res.send(categories);
});

app.delete('/api/categories/:id', (req,res) => {
  const category = categories.find((cat) => {
    return cat.id === parseInt(req.params.id);
  });
  if(!category) return  res.status(404).send('Category not found')

    const newCategories = categories.filter((cat)=>{
      return cat.id !== category.id;
    });
    res.send(newCategories);
  
});


function validateCategory(category) {
  const schema = {
    title: Joi.string().min(2).required()
  };
  return Joi.validate(category, schema);
}


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});


