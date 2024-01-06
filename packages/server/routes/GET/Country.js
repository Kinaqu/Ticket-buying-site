const express = require('express');
const router = express.Router();
const City = require('../../db/models/City'); // Путь к модели City

// Маршрут для обработки GET-запроса и получения списка городов (похоже, есть опечатка в комментарии)
router.get('/countries', async (req, res) => {
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
module.exports = router;
