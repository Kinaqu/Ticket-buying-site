const express = require('express');
const mongoose = require('../../db/db');
const TransactionHistoryTrain = require('../../db/models/TransactionHistoryTrain');
const TrainTicket = require('../../db/models/TrainTicket');

const router = express.Router();

// Маршрут для покупки билета на поезд пользователем
router.post('/TrainTicketUser/:trainTicketId/purchase', async (req, res) => {
  try {
    const { trainTicketId } = req.params;
    const { userId } = req.body;

    // Проверка корректности ObjectId
    if (!mongoose.Types.ObjectId.isValid(trainTicketId)) {
      return res.status(400).json({ error: 'Invalid trainTicketId' });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid userId' });
    }

    // Проверка существования билета на поезд
    const trainTicket = await TrainTicket.findById(trainTicketId);
    if (!trainTicket) {
      return res.status(404).json({ error: 'Train ticket not found' });
    }

    // Создание новой транзакции
    const newTransaction = new TransactionHistoryTrain({
      UserID: new mongoose.Types.ObjectId(userId),
      TrainTicketID: new mongoose.Types.ObjectId(trainTicketId),
      TransactionStatus: 'ожидание',
    });

    await newTransaction.save();

    res.json({ success: true });
  } catch (error) {
    console.error('Error purchasing train ticket:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;