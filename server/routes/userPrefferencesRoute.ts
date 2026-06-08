const express = require('express');
const { authenticateToken: authMiddleware } = require('../middleware/auth');
const { getUserPrefferences, updateUserPrefferences } = require('../services/userPrefferences-services');
const userPrefferencesRouter = express.Router();

userPrefferencesRouter.get('/', authMiddleware, getUserPrefferences);
userPrefferencesRouter.put('/update', authMiddleware, updateUserPrefferences);

module.exports = userPrefferencesRouter;