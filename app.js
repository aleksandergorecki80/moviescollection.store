const mongoose = require('mongoose');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conected to MongoDB..'))
  .catch(err => console.log('Could not connect to Mongo DB...', err));

app.use(express.json());
require('./startup/prod')(app);
const films = require('./routes/films');
const users = require('./routes/users');
const auth = require('./routes/auth');

app.use('/api/movies', films);
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});


