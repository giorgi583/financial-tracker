const express = require('express');
const { addTransaction, getTransactions } = require('../services/transaction-services');
const transactionsRouter = express.Router();
console.log('Transaction routes loaded')
transactionsRouter.post('/add', addTransaction);
transactionsRouter.get('/', getTransactions);
module.exports = transactionsRouter;

