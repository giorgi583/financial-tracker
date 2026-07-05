const express = require('express');
const { createGoal, getGoals, updateGoals, deleteGoals, getAlerts } = require('../services/goal-services');
const { authenticateToken } = require('../middleware/auth');

const goalRouter = express.Router();

goalRouter.post('/', authenticateToken, createGoal);
goalRouter.get('/', authenticateToken, getGoals);
goalRouter.get('/alerts', authenticateToken, getAlerts);
goalRouter.patch('/:id', authenticateToken, updateGoals);
goalRouter.delete('/:id', authenticateToken, deleteGoals);

module.exports = goalRouter;