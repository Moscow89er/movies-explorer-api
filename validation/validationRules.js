const { Joi } = require('celebrate');

const getUserValidation = {
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
};

const editUserValidation = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required(),
  }),
};

module.exports = {
  getUserValidation,
  editUserValidation,
};
