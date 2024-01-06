const express = require('express');
const mongoose = require('../../db/db');
const TransactionHistoryTrain = require('../../db/models/TransactionHistoryTrain');
const TrainTicket = require('../../db/models/TrainTicket');

const router = express.Router();

// Маршрут для покупки билета на поезд пользователем
router.post('/TrainTicketUser/:trainTicketId/purchase', async (req, res) => {
  try {
    const { trainTicketId } = req.params;
    const { userId } = req.body; // Получение UserId из тела запроса

    // Проверка существования билета на поезд
    const trainTicket = await TrainTicket.findById(trainTicketId);
    if (!trainTicket) {
      return res.status(404).json({ error: 'Train ticket not found' });
    }

    // Создание новой транзакции
    const newTransaction = new TransactionHistoryTrain({
      UserID: mongoose.Types.ObjectId(userId),
      TrainTicketID: mongoose.Types.ObjectId(trainTicketId),
      TransactionStatus: 'ожидание', // Установка статуса транзакции по умолчанию в "ожидание"
    });

    await newTransaction.save();

    // Внесите изменения для обновления статуса билета, если необходимо

    res.json({ success: true });
  } catch (error) {
    // Обработка ошибок при покупке билета на поезд
    console.error('Error purchasing train ticket:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Экспорт созданного маршрута для использования в других частях приложения
module.exports = router;