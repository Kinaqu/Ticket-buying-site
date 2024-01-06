const mongoose = require('mongoose');
const { dbName } = require('./config');

const url = `mongodb://localhost:27017/${dbName}`;

// Подключение к MongoDB с использованием Mongoose
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Ошибка подключения к MongoDB:'));
db.once('open', () => {
  console.log('Успешное подключение к MongoDB');
});

process.on('SIGINT', () => {
  console.log('Закрытие соединения с базой данных по сигналу SIGINT');
  db.close(); // Закрыть соединение с использованием mongoose
  process.exit();
});

module.exports = mongoose;

