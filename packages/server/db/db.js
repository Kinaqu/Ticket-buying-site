const mongoose = require('mongoose');

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error('MONGODB_URI is not defined');
}

mongoose.connect(mongoUri);

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Ошибка подключения к MongoDB:', error);
});

db.once('open', () => {
  console.log('Успешное подключение к MongoDB');
});

process.on('SIGINT', async () => {
  console.log('Закрытие соединения с базой данных по сигналу SIGINT');
  await mongoose.connection.close();
  process.exit(0);
});

module.exports = mongoose;