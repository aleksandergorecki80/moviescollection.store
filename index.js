const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conected to MongoDB..'))
    .catch(err => console.log('Could not connect to Mongo DB...', err));


const categorySchema = new mongoose.Schema({
    name: String
});

const filmSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true,
        minlength: 2,
        maxlength: 255,
        trim: true
    },
    format: {
        type: String,
        enum: [ 'DVD', 'BluRey' ]
    },
    poster: String,
    description: String,
    year: Date,
    generes: [String],
    date: { type: Date, default: Date.now },
    isInCollection: Boolean,
    condition: {
        type: String,
        required: function() { return this.isInCollection; }
    }
});

const Film = mongoose.model('film', filmSchema); // jest to klasa dlatego z dużej litery

async function createFilm() {
    const film = new Film({
        title: 'Tron 11123',
        format: '-',
        poster: 'https://m.media-amazon.com/images/M/MV5BMzFkM2YwOTQtYzk2Mi00N2VlLWE3NTItN2YwNDg1YmY0ZDNmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
        description: 'Beleco wymyslone',
        year: '1990',
        generes: ['SF', 'Akcja'],
        isInCollection: true,
        condition: 'New'
    });
    try {
        const result = await film.save();
        console.log(result);
    } catch (ex) {
        console.log(ex.message);
    }
}
createFilm();

async function updateFilm(id) {
    const film = await Film.findByIdAndUpdate(id, {
        $set: {
            title: 'New title 22'
        }
    }, { new: true, useFindAndModify: false });

    console.log(film);
}
// updateFilm('6008dbaa425bcd2bf17cf700');

async function getFilms() {
    const films = await Film
        // .find({generes: 'Akcja'})
        .find()
        .limit(10)
        .sort({ title: 1 })
        .select({ title: 1 });
    console.log(films);
}
// getFilms();

async function removeFilm(id) {
    const result = await Film.deleteOne({ _id: id });
    console.log(result);
}

// removeFilm('6008dbcdf6a32c7482467524');



