const express = require('express');
const Cities = express.Router();
const City = require('../../db/models/City');

// Маршрут для обработки GET-запроса и получения списка городов
Cities.get('/cities', async (req, res) => {
  try {
    // Использование метода find для поиска всех городов в базе данных
    const cities = await City.find();

    // Отправка найденных городов в формате JSON
    res.json(cities);
  } catch (error) {
    // Обработка ошибок при получении списка городов
    console.error('Error fetching cities:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Экспорт созданного маршрута для использования в других частях приложения
module.exports = Cities;
