const express = require('express');
const FlightTicket = require('../../db/models/FlightTicket');

const planes = express.Router();

// Маршрут для обработки GET-запроса и получения уникальных значений поля Plane
planes.get('/flights', async (req, res) => {
  try {
    // Использование метода distinct для получения уникальных значений поля Plane
    const uniquePlanes = await FlightTicket.distinct('Plane');

    // Отправка уникальных значений в формате JSON
    res.json(uniquePlanes);
  } catch (error) {
    // Обработка ошибок при получении уникальных значений
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Экспорт созданного маршрута для использования в других частях приложения
module.exports = planes;
