const express = require('express');
const {spendingByCategory, incomeByCategory, Trend, trendByCategory, topSpendingDays} = require('../services/analytics-services');
const { authenticateToken } = require('../middleware/auth');
const analyticsRouter = express.Router();

analyticsRouter.get('/spending-by-category', authenticateToken, spendingByCategory);
analyticsRouter.get('/income-by-category', authenticateToken, incomeByCategory);
analyticsRouter.get('/trend', authenticateToken, Trend);
analyticsRouter.get('/trend-by-category', authenticateToken, trendByCategory);
analyticsRouter.get('/top-spending-days', authenticateToken, topSpendingDays);



module.exports = analyticsRouter;