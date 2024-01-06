const mongoose = require('../db');

  const trainTicketSchema = new mongoose.Schema({
    Train: { type: String, required: true },
    CountryDeparture: { type: String, required: true },
    CountryArrival: { type: String, required: true },
    CityDeparture: { type: String, required: true },
    CityArrival: { type: String, required: true },
    Price: { type: Number, required: true },
    TrainNumber: { type: String, required: true},
    DepartureDateTime: { type: Date, required: true },
    ArriveDateTime: { type: Date, required: true }
  });

  const TrainTicket = mongoose.model('TrainTicket', trainTicketSchema);


  module.exports = TrainTicket;