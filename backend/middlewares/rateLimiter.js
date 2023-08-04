/* eslint-disable import/no-extraneous-dependencies */
const rateLimiter = require('express-rate-limit');

const limiter = rateLimiter({
  max: 160,
  windowMS: 55000,
  message: 'Превышено количество запросов. Повторите позже.',
});

module.exports = limiter;
