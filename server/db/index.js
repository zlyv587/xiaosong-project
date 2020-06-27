const { dbConfig } = require('../../app.config');
const mongoose = require('mongoose');

const { url, name } = dbConfig;

const mongodbUrl = `${url}${name}`;
mongoose.connect(mongodbUrl);


/**
 * 连接成功
 */
mongoose.connection.on('connected', function () {
  console.log('Mongoose connection open to ' + mongodbUrl);
});

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error: ' + mongodbUrl);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose connection disconnected');
});


module.exports = mongoose;
