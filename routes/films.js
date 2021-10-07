const auth = require('../middleware/auth.js');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { validateFilm, Film } = require('../models/filmsModel');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .jpg and .jpeg format allowed!'));
    }
  },
  limits: { fileSize: 1048576 },
});

router.get('/', auth, async (req, res) => {
  const films = await Film.find({ createdBy: req.user._id }).sort('title');
  res.send(films);
});

router.get('/:id', auth, async (req, res) => {
  const film = await Film.findById(req.params.id);
  if (!film) return res.status(404).send('The film with given Id not found!');
  res.send(film);
});

const uploadSingleImage = upload.single('posterFile');
router.post('/upload', auth, (req, res) => {
  
  uploadSingleImage(req, res, (err) => {
    if (err) {
      return res.status(400).send({ message: err.message });
    }
    if (req.file === null) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    res.status(200).json({
      filename: req.file.filename,
    });
  });
});

router.post('/', auth, async (req, res) => {
  const result = validateFilm(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);
  const film = new Film({
    title: req.body.title,
    format: req.body.format,
    posterName: req.body.posterName ? req.body.posterName : 'no-image.svg',
    year: req.body.year,
    condition: req.body.condition,
    createdBy: req.user._id,
  });
  try {
    const result = await film.save();
    res.send(result);
  } catch (ex) {
    res.send(ex.message);
  }
});

router.put('/:id', auth, async (req, res) => {
  const result = validateFilm(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);
  const film = await Film.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        format: req.body.format,
        posterName: req.body.posterName,
        year: req.body.year,
        condition: req.body.condition,
      },
    },
    { new: true, useFindAndModify: false }
  );
  if (!film) return res.status(404).send('The film with given Id not found!');
  res.send(film);
});

router.delete('/:id', auth, async (req, res) => {
  const result = await Film.findByIdAndRemove(req.params.id, {
    useFindAndModify: false,
  });
  if (!result) return res.status(404).send('The film with given Id not found!');
  res.send(result);
});

module.exports = router;
