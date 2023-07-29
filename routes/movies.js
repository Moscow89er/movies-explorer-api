const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const { movieDeleteValidation } = require('../validation/validationRules');

router.get('/', getMovies);

router.post('/', createMovie);

router.delete('/:id', celebrate(movieDeleteValidation), deleteMovie);

module.exports = router;
