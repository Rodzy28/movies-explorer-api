require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const limiter = require('./utils/rateLimit');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const {
  NODE_ENV,
  DB_URL,
  DB_URL_DEV,
  PORT,
} = require('./utils/configuration');

const app = express();

app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [
    'https://rodzy28.nomoredomainsicu.ru',
    'http://localhost:3001',
  ],
  credentials: true,
}));

mongoose.connect(NODE_ENV === 'production' ? DB_URL : DB_URL_DEV, {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
