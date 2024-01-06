const express = require('express');
const TrainTicket = require('../../db/models/TrainTicket');

const router = express.Router();

// Маршрут для добавления нового билета на поезд
router.post('/TrainTicket', async (req, res) => {
  try {
    // Создание нового объекта TrainTicket с данными из тела запроса
    const newTrainTicket = new TrainTicket(req.body);

    // Сохранение нового билета на поезд в базе данных
    await newTrainTicket.save();

    // Отправка успешного ответа в случае успешного добавления
    res.json({ success: true, message: 'Train ticket added successfully' });
  } catch (error) {
    // Обработка ошибок при добавлении билета на поезд
    console.error('Error adding train ticket', error);
    res.status(500).json({ success: false, message: 'Error adding train ticket' });
  }
});

// Экспорт созданного маршрута для использования в других частях приложения
module.exports = router;