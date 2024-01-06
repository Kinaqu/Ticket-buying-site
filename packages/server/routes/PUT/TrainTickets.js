const express = require('express');
const TrainTicket = require('../../db/models/TrainTicket');

const router = express.Router();

// Маршрут для обработки PUT-запроса для обновления данных билета на поезд
router.put('/TrainTicket/:id', async (req, res) => {
  try {
    // Использование метода findByIdAndUpdate для поиска и обновления билета по ID
    const updatedTrainTicket = await TrainTicket.findByIdAndUpdate(
      req.params.id, // ID билета, который нужно обновить
      req.body, // Новые данные билета из тела запроса
      { new: true } // Опция new: true возвращает обновленный объект после обновления
    );
    // Отправка успешного ответа с обновленным билетом
    res.json({ success: true, updatedTrainTicket });
  } catch (error) {
    // Обработка ошибок при обновлении билета
    console.error('Error updating train ticket:', error);
    res.status(500).json({ success: false, message: 'Error updating train ticket' });
  }
});

// Экспорт созданного маршрута для использования в других частях приложения
module.exports = router;
