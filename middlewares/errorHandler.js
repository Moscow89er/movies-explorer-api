const INTERNAL_SERVER_ERROR_CODE = 500;
const errorHandler = (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = INTERNAL_SERVER_ERROR_CODE, message } = err;
  console.error(err);
  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === INTERNAL_SERVER_ERROR_CODE
        ? 'На сервере произошла ошибка' : message,
    });
};

module.exports = errorHandler;
