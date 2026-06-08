const express = require('express');
const { addTransaction, getTransactions, deleteTransaction, editTransaction } = require('../services/transaction-services');
const transactionsRouter = express.Router();
const { authenticateToken: authMiddleware } = require('../middleware/auth');
console.log('Transaction routes loaded')

transactionsRouter.post('/add', authMiddleware, addTransaction);
transactionsRouter.get('/', authMiddleware, getTransactions);
transactionsRouter.delete('/delete/:id', authMiddleware, deleteTransaction);
transactionsRouter.put('/edit/:id', authMiddleware, editTransaction);




module.exports = transactionsRouter;

