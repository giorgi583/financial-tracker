const {z} = require('zod');
const User = require('../modules/users-schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({path: '../.env', quiet: true});


const registerSchema = z.object({
    username: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(6).max(100),
});
const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(100),
});

async function register(req: any, res: any) {
    const validation = registerSchema.safeParse(req.body);
    if (!validation.success) {
        const error = JSON.parse(JSON.parse(validation.error.message));
        return res.status(400).json({ success: false, message: error });
    }
    const {username, email, password} = req.body;
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already in use' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashedPassword });
        return res.status(201).json({ success: true, message: 'User registered successfully', data: { id: newUser.id, username: newUser.username, email: newUser.email } });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ success: false, message: 'Failed to register user' });
    }
}

async function login(req: any, res: any) {
    const validation = loginSchema.safeParse(req.body);
    if (!validation.success) {
        const error = JSON.parse(validation.error.message);
        return res.status(400).json({ success: false, message: error });
    }
    const {email, password, rememberMe} = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: rememberMe ? '7d' : '1h' });
        res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    ...(rememberMe ? { maxAge: 7 * 24 * 60 * 60 * 1000 } : {})
  });
        return res.status(200).json({ success: true, message: 'Login successful' });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ success: false, message: 'Failed to login user' });
    }
}
async function logout(req: any, res: any) {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
    return res.status(200).json({ success: true, message: 'Logged out' });
}
async function getProfile(req: any, res: any) {
    return res.status(200).json({ success: true, data: req.user });
}

module.exports = {
    register,
    login,
    logout,
    getProfile
};