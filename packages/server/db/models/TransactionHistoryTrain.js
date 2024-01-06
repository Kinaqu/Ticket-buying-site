const mongoose = require('../db');

const transactionHistoryTrainSchema = new mongoose.Schema({
  UserID: { type: mongoose.Schema.Types.ObjectId, required: true },
  TrainTicketID: { type: mongoose.Schema.Types.ObjectId, required: true },
  TransactionDateTime: { type: Date, required: true, default: Date.now() },
  TransactionStatus: { type: String, enum: ['ошибка', 'ожидание', 'подтверждено'], required: true , default: "ожидание"}
});

const TransactionHistoryTrain = mongoose.model('TransactionHistoryTrain', transactionHistoryTrainSchema);


module.exports =  TransactionHistoryTrain;