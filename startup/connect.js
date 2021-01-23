const mongoose = require('mongoose');

module.exports = function(){
    mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conected to MongoDB..'))
    .catch(err => console.log('Could not connect to Mongo DB...', err));
}
