const mongoose = require('mongoose');
const Movie = require('../models/movie');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

const OK_CODE = 200;
const CREATED_CODE = 201;

// Возвратить все сохранённые текущим пользователем фильмы
const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id });
    res.status(OK_CODE).send(movies);
  } catch (err) {
    next(err);
  }
};

// Создаем фильм
const createMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink: trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  try {
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink: trailer,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: req.user._id,
    });
    res.status(CREATED_CODE).send(movie); // фильм успешно создан
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};

// Удаляет сохранённый фильм по id
const deleteMovie = async (req, res, next) => {
  const { movieId } = req.params;
  const owner = req.user._id;

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      throw new NotFoundError('Запрашиваемый фильм не найден');
    } else if (movie.owner.toString() !== owner) {
      // если пользователь не является владельцем текущей карточки
      next(new ForbiddenError('Недостаточно прав для удаления'));
    } else {
      await Movie.deleteOne({ _id: movieId });
      res.status(OK_CODE).send(movie);
    }
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
