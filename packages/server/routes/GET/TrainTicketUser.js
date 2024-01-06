const express = require('express');
const mongoose = require('mongoose');
const TransactionHistoryTrain = require('../../db/models/TransactionHistoryTrain');
const TrainTicket = require('../../db/models/TrainTicket');

const router = express.Router();

// Маршрут для обработки GET-запроса и получения билетов на поезда с учетом поискового запроса
router.get('/TrainTicketUser', async (req, res) => {
    try {
      let query = {}; // Исходный запрос для поиска всех билетов

      const { searchQuery } = req.query;

      // Если searchQuery не пуст, добавляем условия поиска
      if (searchQuery) {
        query.$or = [
          { CountryArrival: new RegExp(searchQuery, 'i') },
          { CityArrival: new RegExp(searchQuery, 'i') },
          // Добавьте другие поля, которые вы хотите учесть при поиске
        ];
      }

      // Выполняем запрос с учетом поискового запроса, ограничиваем результаты до 5 записей и сортируем по убыванию
      const trains = await TrainTicket.find(query).limit(5).sort({ _id: -1 });

      // Отправка результатов в формате JSON
      res.json(trains);
    } catch (error) {
      // Обработка ошибок при получении билетов на поезда
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Экспорт созданного маршрута для использования в других частях приложения
module.exports = router;
