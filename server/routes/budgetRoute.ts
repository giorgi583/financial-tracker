const express = require('express');
const { getBudgets, createBudget, updateBudget, deleteBudget } = require('../services/budget-services');
const { authenticateToken } = require('../middleware/auth');

const budgetRouter = express.Router();


budgetRouter.get('/', authenticateToken, getBudgets);
budgetRouter.post('/', authenticateToken, createBudget);
budgetRouter.patch('/', authenticateToken, updateBudget);
budgetRouter.delete('/:id', authenticateToken, deleteBudget);
    

module.exports = budgetRouter;