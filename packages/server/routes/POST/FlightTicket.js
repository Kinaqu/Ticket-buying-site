const express = require('express');
const FlightTicket = require('../../db/models/FlightTicket')

const router = express.Router();

// Маршрут для добавления нового билета на рейс
router.post('/FlightTicket', async (req, res) => {
  try {
    // Создание нового объекта FlightTicket с данными из тела запроса
    const newFlightTicket = new FlightTicket(req.body);

    // Сохранение нового билета на рейс в базе данных
    await newFlightTicket.save();

    // Отправка успешного ответа в случае успешного добавления
    res.json({ success: true, message: 'Flight ticket added successfully' });
  } catch (error) {
    // Обработка ошибок при добавлении билета на рейс
    console.error('Error adding flight ticket', error);
    res.status(500).json({ success: false, message: 'Error adding flight ticket' });
  }
});

// Экспорт созданного маршрута для использования в других частях приложения
module.exports = router;