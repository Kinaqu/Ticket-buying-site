const express = require('express');
const TrainTicket = require('../../db/models/TrainTicket');

const trains = express.Router();

// Маршрут для обработки GET-запроса и получения уникальных значений поля Train из коллекции TrainTicket
trains.get('/trains', async (req, res) => {
  try {
    // Использование метода distinct для получения уникальных значений поля Train
    const uniqueTrains = await TrainTicket.distinct('Train');

    // Отправка уникальных значений в формате JSON
    res.json(uniqueTrains);
  } catch (error) {
    // Обработка ошибок при получении уникальных значений
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Экспорт созданного маршрута для использования в других частях приложения
module.exports = trains;
