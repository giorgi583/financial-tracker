const {z} = require('zod');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
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
    sameSite: 'none',
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
console.log(process.env.EMAIL);
console.log(process.env.EMAIL_PASSWORD);
async function forgotPassword(req: any, res: any) {
  console.log('hi');
  const { email } = req.body;
try {
  const user = await User.findOne({
    where: { email }
  });

  // Don't reveal whether user exists
  if (!user) {
    return res.status(200).json({
      success: true,
      message: 'If an account exists, an email has been sent.'
    });
  }

  // Generate token
  const resetToken = crypto.randomBytes(32).toString('hex');

  // Hash token before storing
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 min

  await user.save();

  const resetUrl =
    `http://localhost:5173/reset-password?token=${resetToken}`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  await transporter.sendMail({
    to: user.email,
    subject: 'Password Reset',
    html: `
      <p>Click the link below:</p>
      <a href="${resetUrl}">
        Reset Password
      </a>
    `
  });
console.log('Email sent');
  res.status(200).json({
    success: true,
    message: 'If an account exists, an email has been sent.'
  }); }
catch (error) {
  console.error('Error sending email:', error);
  return res.status(500).json({
    success: false,
    message: 'Failed to send email'
  });
}
}

 async function resetPassword(req: any, res: any) {
  const { token, password } = req.body;

  const hashedToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
try {
  const user = await User.findOne({
    where: {
      resetPasswordToken: hashedToken
    }
  });

  if (
    !user ||
    user.resetPasswordExpires < Date.now()
  ) {
    return res.status(400).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }

  user.password = await bcrypt.hash(password, 10);

  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;

  await user.save();

  res.status(200).json({
    success: true,
    message: 'Password updated successfully'
  }); }
catch (error) {
  console.error('Error resetting password:', error);
  return res.status(500).json({
    success: false,
    message: 'Failed to reset password'
  });
} }

async function updatePassword(req: any, res: any) {
  const userId = req.user.id;
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    return res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    return res.status(500).json({ success: false, message: 'Failed to update password' });
  }
}
async function updateName(req: any, res: any) {
  const userId = req.user.id;
  const { name } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    user.username = name;
    await user.save();
    return res.status(200).json({ success: true, message: 'Name updated successfully' });
  } catch (error) {
    console.error('Error updating name:', error);
    return res.status(500).json({ success: false, message: 'Failed to update name' });
  }
}
module.exports = {
    register,
    login,
    logout,
    getProfile,
    forgotPassword,
    resetPassword,
    updatePassword,
    updateName
}