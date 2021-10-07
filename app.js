const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const app = express();
const connectDB = require('./db');

require('./startup/prod')(app);
app.use(express.json());

//CONECT TO DB
connectDB();

// IMPORT ROUTS
const films = require('./routes/films');
const users = require('./routes/users');
const auth = require('./routes/auth');

// DEFINE ROUTS
app.use('/api/movies', films);
app.use('/api/users', users);
app.use('/api/auth', auth);

// STATIC IMAGES
const imagesDir = require('path').join(__dirname,'/uploads');
app.use(express.static(imagesDir));


// PRODUCTION STATIC ASSETS
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'));
  app.get('^(?!api\/)[\/\w\.\,-]*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}
console.log(process.env.NODE_ENV);

const port = 5000;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});


