const express = require('express');
const mongoose = require('mongoose');
const TransactionHistoryFlight = require('../../db/models/TransactionHistoryFlight'); // Изменил импорт на коллекцию для авиабилетов
const AirplaneTicket = require('../../db/models/FlightTicket'); // Изменил импорт на модель для авиабилетов

const router = express.Router();

// Маршрут для обработки GET-запроса и получения билетов на рейс пользователя с возможностью фильтрации
router.get('/AirplaneTicketUser', async (req, res) => {
  try {
    let query = {}; // Исходный запрос для поиска всех билетов

    const { searchQuery } = req.query;

    // Если searchQuery не пуст, добавляем условия поиска
    if (searchQuery) {
      query.$or = [
        { CountryArrival: new RegExp(searchQuery, 'i') },
        { CityArrival: new RegExp(searchQuery, 'i') },
      ];
    }

    // Выполняем запрос с учетом поискового запроса, ограничиваем количество результатов и сортируем по убыванию _id
    const airplaneTickets = await AirplaneTicket.find(query).limit(5).sort({ _id: -1 });

    // Отправка найденных билетов в формате JSON
    res.json(airplaneTickets);
  } catch (error) {
    // Обработка ошибок при получении билетов на рейс пользователя
    console.error('Error fetching airplane tickets:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Экспорт созданного маршрута для использования в других частях приложения
module.exports = router;
