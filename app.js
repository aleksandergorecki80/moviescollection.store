const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const app = express();
const db = require('./db');

require('./startup/prod')(app);
app.use(express.json());

const films = require('./routes/films');
const users = require('./routes/users');
const auth = require('./routes/auth');

app.use('/api/movies', films);
app.use('/api/users', users);
app.use('/api/auth', auth);

// Serve static assets
// if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../frontend/build'));
  app.get('^(?!api\/)[\/\w\.\,-]*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
  });
// }


const port = 5000;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});


