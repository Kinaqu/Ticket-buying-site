const mongoose = require('mongoose');

const url = `mongodb+srv://dimer133745_db_user:qrVBpsVuBTdEiDNW@cluster0.kjr2ugw.mongodb.net/?appName=Cluster0`;

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