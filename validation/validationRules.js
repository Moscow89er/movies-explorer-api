const { Joi } = require('celebrate');

const urlRegExp = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;

const editUserValidation = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
};

const loginValidation = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const createUserValidation = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().min(2).required(),
  }),
};

const createMovieValidation = {
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(urlRegExp),
    trailerLink: Joi.string().pattern(urlRegExp),
    thumbnail: Joi.string().pattern(urlRegExp),
    owner: Joi.string().hex().length(24).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
};

const movieDeleteValidation = {
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
};

module.exports = {
  editUserValidation,
  loginValidation,
  createUserValidation,
  createMovieValidation,
  movieDeleteValidation,
};
