const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');
const { NODE_ENV, JWT_SECRET } = require('../config/config');

const OK_CODE = 200;
const CREATED_CODE = 201;
const CONFLICT_ERR = 11000;

// Функция для поиска пользователя и обработки ошибок
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
const getUser = async (req, res, next) => {
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
    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }

    res.status(OK_CODE).send(user);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError('Переданы некорректные данные'));
    } else if (err.code === CONFLICT_ERR) {
      next(new ConflictError('Пользователь с этим email уже сущетсвует'));
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

// Создать нового пользователя
const createUser = async (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // удаляем хэш пароля перед отправкой ответа
    const userResponse = user.toObject();
    delete userResponse.password;
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      { expiresIn: '7d' },
    );

    userResponse.token = token;
    userResponse.userId = user._id;

    res.status(CREATED_CODE).send(userResponse);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError('Переданы некорректные данные'));
    } else if (err.code === 11000) {
      next(new ConflictError('Пользователь с этим email уже сущетсвует'));
    } else {
      next(err);
    }
  }
};

// Контроллер аутентификации
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      { expiresIn: '7d' },
    );
    res.send({ token, userId: user._id });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUser,
  editUser,
  createUser,
  login,
};
