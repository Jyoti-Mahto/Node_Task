import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import conn from '../db.js';
import dotenv from 'dotenv';


dotenv.config();

const router = express.Router();
const { JWT_SECRET, EMAIL_USER, EMAIL_PASS } = process.env;

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

function sendVerificationEmail (email, token) {
  const url = `http://localhost:5000/verify/${token}`;
  transporter.sendMail({
    to: email,
    subject: 'Verify your email',
    html: `Click <a href="${url}">here</a> to verify your email.`,
  });
};

router.post('/register', async (req, res) => {
  const { first_name, last_name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

    const [result] = await conn.query(
      'INSERT INTO Users (first_name, last_name, email, password, role, is_verified) VALUES (?, ?, ?, ?, ?, ?)',
      [first_name, last_name, email, hashedPassword, role, false]);
      
      if (result.affectedRows === 0) {
        return res.status(400).json({ message: 'Invalid token' });
      }
      
    sendVerificationEmail(email, token);
    res.status(200).json({ message: 'Registration successful. Please check your email for verification.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const [rows] = await conn.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0]
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if(user.role !== role){
      return res.status(401).json({ message: `You are not allowed to login from here` });
    }
    if (!user.is_verified) {
      return res.status(401).json({ message: 'Please verify your email' });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/verify/:token', async (req, res) => {
  try {
    const { email } = jwt.verify(req.params.token, JWT_SECRET);
    const [result] = await conn.query('UPDATE users SET is_verified = ? WHERE email = ?', [true, email]);
      if (result.affectedRows === 0) {
        return res.status(400).json({ message: 'Invalid token' });
      }

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
