const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
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

// Serve static assets

// app.use(express.static('frontend/build'));
// app.get('^(?!/api\/)[\/\w\.\,-]*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
// })

// const port = process.env.PORT;
const port = 5000;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});


