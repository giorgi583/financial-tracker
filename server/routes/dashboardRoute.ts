const express = require('express');
const { authenticateToken: authMiddleware } = require('../middleware/auth');
const { getDashboardData } = require('../services/dashboard-services');
const dashboardRouter = express.Router();

dashboardRouter.get('/overview', authMiddleware, getDashboardData);

module.exports = dashboardRouter;