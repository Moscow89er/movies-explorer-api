const mongoose = require('mongoose');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');

const OK_CODE = 200;

// Функция для поиска пользователя и обработки ошибок
// eslint-disable-next-line consistent-return
const findUserById = async (id, next) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new NotFoundError('Запрашиваемый пользоветель не найден');
    }
    return user;
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};

// Функция-обертка, возвращающая функцию поиска пользователя
const getUserFinder = () => findUserById;

// Получить информацию о текущем пользователе
const getCurrentUser = async (req, res, next) => {
  try {
    const findUser = getUserFinder();
    const user = await findUser(req.user._id, next);
    res.status(OK_CODE).send(user);
  } catch (err) {
    next(err);
  }
};

// Общая функция для обновления данных пользователя
const updateUser = async (req, res, next, updateData) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      {
        new: true,
        runValidators: true,
        upsert: false,
      },
    );
    res.status(OK_CODE).send(user);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};

// Декоратор для обновления профиля пользователя
const editUser = (req, res, next) => {
  const { name, email } = req.body;
  return updateUser(req, res, next, { name, email });
};

module.exports = {
  getCurrentUser,
  editUser,
};
