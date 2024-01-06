const express = require('express');
const FlightTicket = require('../../db/models/FlightTicket');

const router = express.Router();

// Маршрут для обработки GET-запроса и получения билетов на рейс с возможностью фильтрации по параметру search
router.get('/FlightTicket', async (req, res) => {
  try {
    let query = {};  // По умолчанию запрос без фильтрации

    // Если передан параметр поиска, добавляем его в запрос
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');  // Создаем регулярное выражение для поиска без учета регистра
      query = {
        $or: [
          { Plane: searchRegex },
          // Добавьте другие поля, которые вы хотите учесть при поиске
        ]
      };
    }

    // Использование метода find для поиска билетов с учетом фильтра и сортировки по убыванию _id
    const flightTickets = await FlightTicket.find(query).sort({ _id: -1 }).limit(5);

    // Отправка найденных билетов в формате JSON
    res.json(flightTickets);
  } catch (error) {
    // Обработка ошибок при получении билетов на рейс
    console.error('Error fetching flight tickets:', error);
    res.status(500).json({ success: false, message: 'Error fetching flight tickets' });
  }
});

// Экспорт созданного маршрута для использования в других частях приложения
module.exports = router;
