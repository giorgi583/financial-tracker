const express = require('express');
const { createGoal } = require('../services/goal-services');
const { authenticateToken } = require('../middleware/auth');

const goalRouter = express.Router();

goalRouter.post('/', authenticateToken, createGoal);
// goalRouter.get('/', authenticateToken, getGoals);
// goalRouter.patch('/', authenticateToken, updateGoal);
// goalRouter.delete('/:id', authenticateToken, deleteGoal);

module.exports = goalRouter;