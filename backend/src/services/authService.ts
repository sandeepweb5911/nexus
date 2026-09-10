import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories/userRepository';
import { config } from '../config/env';
import { JwtUserPayload } from '../types';

export const authService = {
  async register(email: string, password: string, name?: string) {
    const existing = await userRepository.findByEmail(email);
    if (existing) {
      throw new Error('Email is already registered');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await userRepository.create({
      email,
      passwordHash,
      name: name || email.split('@')[0],
      role: 'USER',
    });

    const token = this.generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    return {
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      token,
    };
  },

  async login(email: string, password: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new Error('Invalid email or password');
    }

    const token = this.generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    return {
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      token,
    };
  },

  generateToken(payload: JwtUserPayload): string {
    return jwt.sign(payload, config.jwtSecret, { expiresIn: '7d' });
  },

  verifyToken(token: string): JwtUserPayload {
    return jwt.verify(token, config.jwtSecret) as JwtUserPayload;
  },

  async getMe(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return { id: user.id, email: user.email, name: user.name, role: user.role };
  },
};
