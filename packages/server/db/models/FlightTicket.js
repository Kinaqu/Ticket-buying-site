const mongoose = require('../db');

const flightTicketSchema = new mongoose.Schema({
  Plane: { type: String, required: true },
  CountryDeparture: { type: String, required: true },
  CountryArrival: { type: String, required: true },
  CityDeparture: { type: String, required: true },
  CityArrival: { type: String, required: true },
  Price: { type: Number, required: true, default: 100000 },
  FlightNumber: { type: String, required: true, default: '00000' },
  DepartureDateTime: { type: Date, required: true },
  LandDateTime: { type: Date, required: true }
});

const FlightTicket = mongoose.model('FlightTicket', flightTicketSchema);



module.exports = FlightTicket;