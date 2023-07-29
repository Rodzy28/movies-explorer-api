const DB_URL_DEV = 'mongodb://127.0.0.1:27017/bitfilmsdb';
const JWT_SECRET_DEV = 'mama-ya-programmist';

const {
  NODE_ENV,
  PORT = 3000,
  DB_URL,
  JWT_SECRET,
} = process.env;

module.exports = {
  PORT,
  DB_URL_DEV,
  JWT_SECRET_DEV,
  NODE_ENV,
  DB_URL,
  JWT_SECRET,
};
