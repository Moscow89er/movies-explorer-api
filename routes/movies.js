const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  movieDeleteValidation,
  createMovieValidation,
} = require('../validation/validationRules');

router.get('/', getMovies);

router.post('/', celebrate(createMovieValidation), createMovie);

router.delete('/:movieId', celebrate(movieDeleteValidation), deleteMovie);

module.exports = router;
