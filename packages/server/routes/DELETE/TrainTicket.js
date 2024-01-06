const express = require('express');
const TrainTicket = require('../../db/models/TrainTicket');

const router = express.Router();

// Маршрут для обработки DELETE-запроса для удаления билета на поезд
router.delete('/TrainTicket/:id', async (req, res) => {
  const ticketId = req.params.id;

  try {
    // Использование метода findByIdAndDelete для поиска и удаления билета по ID
    await TrainTicket.findByIdAndDelete(ticketId);

    // Отправка успешного ответа после успешного удаления
    res.json({ success: true, message: 'Train ticket deleted successfully' });
  } catch (error) {
    // Обработка ошибок при удалении билета на поезд
    console.error('Error deleting train ticket:', error);
    res.status(500).json({ success: false, message: 'Error deleting train ticket' });
  }
});

// Экспорт созданного маршрута для использования в других частях приложения
module.exports = router;
