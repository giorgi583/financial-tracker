const express = require('express');
const { register, login, getProfile, logout, forgotPassword, resetPassword} = require('../services/user-services');
const { authenticateToken: authMiddleware } = require('../middleware/auth');
const usersRouter = express.Router();

usersRouter.post('/forgot-password', forgotPassword);
usersRouter.post('/register', register);
usersRouter.post('/login', login);
usersRouter.get('/me', authMiddleware, getProfile);
usersRouter.post('/logout', authMiddleware, logout);
usersRouter.post('/reset-password', resetPassword);
console.log(forgotPassword);



module.exports = usersRouter;