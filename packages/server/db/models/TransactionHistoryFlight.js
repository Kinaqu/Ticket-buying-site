const mongoose = require('../db');

const transactionHistoryFlightSchema = new mongoose.Schema({
  UserID: { type: mongoose.Schema.Types.ObjectId, required: true },
  AirplaneTicketID: { type: mongoose.Schema.Types.ObjectId, required: true },
  TransactionDateTime: { type: Date, required: true, default: Date.now() },
  TransactionStatus: { type: String, enum: ['ошибка', 'ожидание', 'подтверждено'], required: true, default: "ожидание" }
});

const TransactionHistoryFlight = mongoose.model('TransactionHistoryFlight', transactionHistoryFlightSchema);


module.exports = TransactionHistoryFlight;

