const { Joi } = require('celebrate');

const editUserValidation = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required(),
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
    password: Joi.string().min(8).required(),
  }),
};

const movieDeleteValidation = {
  params: Joi.object().keys({
    MovieId: Joi.string().hex().length(24).required(),
  }),
};

module.exports = {
  editUserValidation,
  loginValidation,
  createUserValidation,
  movieDeleteValidation,
};
