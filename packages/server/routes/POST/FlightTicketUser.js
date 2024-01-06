const express = require('express');
const mongoose = require('../../db/db');
const TransactionHistoryFlight = require('../../db/models/TransactionHistoryFlight'); // Импорт модели для истории транзакций
const AirplaneTicket = require('../../db/models/FlightTicket'); // Импорт модели для авиабилетов

const router = express.Router();

// Маршрут для покупки авиабилета пользователем
router.post('/AirplaneTicketUser/:airplaneTicketId/purchase', async (req, res) => {
  try {
    const { airplaneTicketId } = req.params;
    const { userId } = req.body; // Получение UserId из тела запроса

    // Проверка существования авиабилета
    const airplaneTicket = await AirplaneTicket.findById(airplaneTicketId);
    if (!airplaneTicket) {
      return res.status(404).json({ error: 'Airplane ticket not found' });
    }

    // Создание новой транзакции
    const newTransaction = new TransactionHistoryFlight({
      UserID: mongoose.Types.ObjectId(userId),
      AirplaneTicketID: mongoose.Types.ObjectId(airplaneTicketId),
      TransactionStatus: 'ожидание', // Установка статуса транзакции по умолчанию в "ожидание"
    });

    await newTransaction.save();

    // Внесите изменения для обновления статуса билета, если необходимо

    res.json({ success: true });
  } catch (error) {
    // Обработка ошибок при покупке авиабилета
    console.error('Error purchasing airplane ticket:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Экспорт созданного маршрута для использования в других частях приложения
module.exports = router;
