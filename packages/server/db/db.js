const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('MONGODB_URI is not defined');
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 30000,
    });

    console.log('Успешное подключение к MongoDB');
  } catch (error) {
    console.error('Ошибка подключения к MongoDB:', error);
    throw error;
  }
};

mongoose.connection.on('error', (error) => {
  console.error('Ошибка MongoDB connection:', error);
});

process.on('SIGINT', async () => {
  try {
    console.log('Закрытие соединения с базой данных по сигналу SIGINT');
    await mongoose.connection.close();
  } finally {
    process.exit(0);
  }
});

module.exports = mongoose;
module.exports.connectDB = connectDB;