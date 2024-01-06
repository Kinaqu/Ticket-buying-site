const express = require('express');
const TrainTicket = require('../../db/models/TrainTicket');

const router = express.Router();

// Маршрут для обработки GET-запроса и получения билетов на поезда с возможностью фильтрации
router.get('/TrainTicket', async (req, res) => {
  try {
    let query = {};  // По умолчанию запрос без фильтрации

    // Если передан параметр поиска, добавляем его в запрос
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      query = {
        $or: [
          { Train: searchRegex },
          // Добавьте другие поля, которые вы хотите учесть при поиске
        ]
      };
    }

    // Выполняем запрос с учетом поискового запроса, сортируем по убыванию и ограничиваем результаты до 5 записей
    const trainTickets = await TrainTicket.find(query).sort({ _id: -1 }).limit(5);

    // Отправка результатов в формате JSON
    res.json(trainTickets);
  } catch (error) {
    // Обработка ошибок при получении билетов на поезда
    console.error('Error fetching train tickets:', error);
    res.status(500).json({ success: false, message: 'Error fetching train tickets' });
  }
});

// Экспорт созданного маршрута для использования в других частях приложения
module.exports = router;
