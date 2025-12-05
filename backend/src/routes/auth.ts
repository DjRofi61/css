import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../utils/prisma';
import { env } from '../config/env';

export const authRouter = Router();

const registerValidators = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isStrongPassword({ minLength: 8 }).withMessage('Password too weak'),
  body('firstName').notEmpty(),
  body('lastName').notEmpty()
];

authRouter.post('/register', registerValidators, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password, firstName, lastName } = req.body;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    const hashed = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { email, password: hashed, firstName, lastName }
    });
    const accessToken = jwt.sign({ sub: user.id, role: user.role }, env.jwtSecret, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ sub: user.id }, env.jwtRefreshSecret, { expiresIn: '7d' });
    res.json({ user: { id: user.id, email: user.email, role: user.role }, accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
});

const loginValidators = [
  body('email').isEmail(),
  body('password').notEmpty()
];

authRouter.post('/login', loginValidators, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const accessToken = jwt.sign({ sub: user.id, role: user.role }, env.jwtSecret, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ sub: user.id }, env.jwtRefreshSecret, { expiresIn: '7d' });
    res.json({ user: { id: user.id, email: user.email, role: user.role }, accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
});

authRouter.get('/me', async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Missing token' });
    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, env.jwtSecret) as { sub: number };
    const user = await prisma.user.findUnique({ where: { id: payload.sub }, select: { id: true, email: true, role: true } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (error) {
    next(error);
  }
});
