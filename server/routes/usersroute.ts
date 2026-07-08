const express = require('express');
const { register, login, getProfile, logout, forgotPassword, resetPassword, updatePassword, updateName } = require('../services/user-services');
const { authenticateToken: authMiddleware } = require('../middleware/auth');
const usersRouter = express.Router();

usersRouter.post('/forgot-password', forgotPassword);
usersRouter.post('/register', register);
usersRouter.post('/login', login);
usersRouter.get('/me', authMiddleware, getProfile);
usersRouter.post('/logout', authMiddleware, logout);
usersRouter.post('/reset-password', resetPassword);
usersRouter.patch('/update-password', authMiddleware, updatePassword);
usersRouter.patch('/update-name', authMiddleware, updateName);



module.exports = usersRouter;