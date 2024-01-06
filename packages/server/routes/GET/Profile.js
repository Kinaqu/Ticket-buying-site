const express = require('express');
const router = express.Router();
const TransactionHistoryTrain = require('../../db/models/TransactionHistoryTrain');
const TransactionHistoryFlight = require('../../db/models/TransactionHistoryFlight');
const TrainTicket = require('../../db/models/TrainTicket');
const FlightTicket = require('../../db/models/FlightTicket');

// Маршрут для обработки GET-запроса и получения информации о билетах пользователя
router.get('/tickets/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Находим все транзакции для поездов
    const trainTransactions = await TransactionHistoryTrain.find({ UserID: userId })
      .sort({ TransactionDateTime: -1 })
      .exec();

    // Извлекаем TrainTicketID из каждой транзакции и находим соответствующий билет
    const trainTickets = await Promise.all(
      trainTransactions.map(async (transaction) => {
        const ticketId = transaction.TrainTicketID;
        const ticket = await TrainTicket.findById(ticketId).exec();
        return {
          _id: transaction._id,
          TransactionStatus: transaction.TransactionStatus,
          Train: ticket.Train,
          CountryDeparture: ticket.CountryDeparture,
          CountryArrival: ticket.CountryArrival,
          // Добавьте другие поля билета поезда, которые вам нужны
        };
      })
    );

    // Находим все транзакции для полетов
    const flightTransactions = await TransactionHistoryFlight.find({ UserID: userId })
      .sort({ TransactionDateTime: -1 })
      .exec();

    // Извлекаем AirplaneTicketID из каждой транзакции и находим соответствующий билет
    const flightTickets = await Promise.all(
      flightTransactions.map(async (transaction) => {
        const ticketId = transaction.AirplaneTicketID;
        const ticket = await FlightTicket.findById(ticketId).exec();
        return {
          _id: transaction._id,
          TransactionStatus: transaction.TransactionStatus,
          Plane: ticket.Plane,
          CountryDeparture: ticket.CountryDeparture,
          CountryArrival: ticket.CountryArrival,
          // Добавьте другие поля билета полета, которые вам нужны
        };
      })
    );

    // Отправка информации о билетах пользователя в формате JSON
    res.json({ trainTickets, flightTickets });
  } catch (error) {
    // Обработка ошибок при получении информации о билетах пользователя
    console.error('Error fetching user tickets:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Экспорт созданного маршрута для использования в других частях приложения
module.exports = router;
