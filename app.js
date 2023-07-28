const express = require('express');
const mongoose = require('mongoose');
const { celebrate, errors } = require('celebrate');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { loginValidation, createUserValidation } = require('./validation/validationRules');

const { PORT = 3000 } = require('./config/config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/moviesexplorerdb', {
  useNewUrlParser: true,
});

// роуты не требующие авторизации
app.post('/signin', celebrate(loginValidation), login);

app.post('/signup', celebrate(createUserValidation), createUser);

// авторизация
app.use(auth);

// используем централизованный роутер
app.use('/', require('./routes'));

// обработчик ошибок celebrate
app.use(errors());

// центральный обработчки ошибок
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`App listening on port ${PORT}`);
});
