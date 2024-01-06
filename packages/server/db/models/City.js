const mongoose = require('../db');

const citySchema = new mongoose.Schema({
  Country: { type: String, required: true },
  CityName: { type: String, required: true }
});

const City = mongoose.model('City', citySchema);


module.exports = City ;