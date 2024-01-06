const express = require('express');
const FlightTicket = require('../../db/models/FlightTicket');

const Planes = express.Router();

// Маршрут для обработки PUT-запроса для изменения значения поля Plane у билетов
Planes.put('/flights/:id', async (req, res) => {
  const { id } = req.params;
  const { newPlane, oldPlane } = req.body;

  try {
    // Найти все записи с тем же значением Plane
    const flightsToUpdate = await FlightTicket.find({ Plane: oldPlane });

    // Обновить значение Plane для найденных записей
    await FlightTicket.updateMany(
      { _id: { $in: flightsToUpdate.map(flight => flight._id) } },
      { $set: { Plane: newPlane } }
    );

    // Отправка успешного ответа после успешного обновления
    res.json({ message: 'Plane updated successfully' });
  } catch (error) {
    // Обработка ошибок при обновлении значения Plane
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Экспорт созданного маршрута для использования в других частях приложения
module.exports = Planes;
