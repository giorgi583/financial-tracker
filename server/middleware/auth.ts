const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../modules/users-schema');
dotenv.config({path: '../.env', quiet: true});

async function authenticateToken(req: any, res: any, next: any) {
   try { 
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ success: false, message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(401).json({ success: false, message: 'User not found' });

    req.user = {
        id: user.id,
        username: user.username,
        email: user.email,
    };
    next(); }
catch (err) {   
     console.error('Authentication error:', err);
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
}
}

module.exports = {authenticateToken};