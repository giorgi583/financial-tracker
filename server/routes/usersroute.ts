const express = require('express');
const { register, login, getProfile, logout } = require('../services/user-services');
const { authenticateToken: authMiddleware } = require('../middleware/auth');
const usersRouter = express.Router();

usersRouter.post('/register', register);
usersRouter.post('/login', login);
usersRouter.get('/me', authMiddleware, getProfile);
usersRouter.post('/logout', authMiddleware, logout);

module.exports = usersRouter;