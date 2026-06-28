const express = require('express');
const { authenticateToken: authMiddleware } = require('../middleware/auth');
const { getUserPrefferences, updateUserPrefferences } = require('../services/userPrefferences-services');
const userPrefferencesRouter = express.Router();

userPrefferencesRouter.get('/', authMiddleware, getUserPrefferences);
userPrefferencesRouter.put('/update', authMiddleware, updateUserPrefferences);
userPrefferencesRouter.get('/test', (req: any, res: any) => {
    console.log('TEST ROUTE HIT');
    res.json({ test: true });
});
module.exports = userPrefferencesRouter;