const express = require('express');
const FlightTicket = require('../../db/models/FlightTicket');

const router = express.Router();

// Маршрут для обработки DELETE-запроса для удаления билета на рейс
router.delete('/FlightTicket/:id', async (req, res) => {
  const ticketId = req.params.id;

  try {
    // Использование метода findByIdAndDelete для поиска и удаления билета по ID
    await FlightTicket.findByIdAndDelete(ticketId);

    // Отправка успешного ответа после успешного удаления
    res.json({ success: true, message: 'Flight ticket deleted successfully' });
  } catch (error) {
    // Обработка ошибок при удалении билета
    console.error('Error deleting flight ticket:', error);
    res.status(500).json({ success: false, message: 'Error deleting flight ticket' });
  }
});

// Экспорт созданного маршрута для использования в других частях приложения
module.exports = router;
