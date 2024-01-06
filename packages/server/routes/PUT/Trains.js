const express = require('express');
const TrainTicket = require('../../db/models/TrainTicket');

const Trains = express.Router();

// Маршрут для обработки PUT-запроса для изменения значения поля Train у билетов на поезд
Trains.put('/trains/:id', async (req, res) => {
  const { id } = req.params;
  const { newTrain } = req.body;

  try {
    // Найти все записи с тем же значением Train
    const trainsToUpdate = await TrainTicket.find({ Train: req.body.oldTrain });

    // Обновить значение Train для найденных записей
    await TrainTicket.updateMany(
      { _id: { $in: trainsToUpdate.map(train => train._id) } },
      { $set: { Train: newTrain } }
    );

    // Отправка успешного ответа после успешного обновления
    res.json({ message: 'Train updated successfully' });
  } catch (error) {
    // Обработка ошибок при обновлении значения Train
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Экспорт созданного маршрута для использования в других частях приложения
module.exports = Trains;
