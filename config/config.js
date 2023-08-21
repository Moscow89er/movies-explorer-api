require('dotenv').config();

const { NODE_ENV = 'development', JWT_SECRET = 'my-secret-key' } = process.env;

const MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb';

module.exports = {
  NODE_ENV,
  JWT_SECRET,
  MONGO_URL,
};
