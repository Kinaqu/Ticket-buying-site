const express = require('express');
const FlightTicket = require('../../db/models/FlightTicket'); // Путь к модели FlightTicket

const router = express.Router();

// Маршрут для обработки PUT-запроса для обновления данных билета на рейс
router.put('/FlightTicket/:id', async (req, res) => {
  try {
    // Использование метода findByIdAndUpdate для поиска и обновления билета по ID
    const updatedFlightTicket = await FlightTicket.findByIdAndUpdate(
      req.params.id, // ID билета, который нужно обновить
      req.body, // Новые данные билета из тела запроса
      { new: true } // Опция new: true возвращает обновленный объект после обновления
    );
    // Отправка успешного ответа с обновленным билетом
    res.json({ success: true, updatedFlightTicket });
  } catch (error) {
    // Обработка ошибок при обновлении билета
    console.error('Error updating flight ticket:', error);
    res.status(500).json({ success: false, message: 'Error updating flight ticket' });
  }
});

// Экспорт созданного маршрута для использования в других частях приложения
module.exports = router;
