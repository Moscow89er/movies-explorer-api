const mongoose = require('mongoose');

const urlRegExp = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    match: [urlRegExp, 'Некорректный формат ссылки'],
  },
  trailerLink: {
    type: String,
    required: true,
    match: [urlRegExp, 'Некорректный формат ссылки'],
  },
  thumbnail: {
    type: String,
    required: true,
    match: [urlRegExp, 'Некорректный формат ссылки'],
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

const Movie = mongoose.model('movie', movieSchema);

module.exports = Movie;
