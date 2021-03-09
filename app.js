const mongoose = require('mongoose');
const helmet = require('helmet');

const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;

const films = require('./routes/films');
const categories = require('./routes/categories');
const generes = require('./routes/genere');

// require('./startup/connect');
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conected to MongoDB..'))
  .catch(err => console.log('Could not connect to Mongo DB...', err));

app.use(express.json());
app.use(helmet());
app.use('/api/movies', films);
app.use('/api/categories', categories);
app.use('/api/generes', generes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});


