import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/authService';
import { AuthenticatedRequest } from '../middleware/auth';

export const authController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, name } = req.body;
      const result = await authService.register(email, password, name);
      res.status(201).json({
        success: true,
        message: 'Account created successfully',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.json({
        success: true,
        message: 'Signed in successfully',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },

  async logout(req: Request, res: Response) {
    res.json({
      success: true,
      message: 'Signed out successfully',
    });
  },

  async me(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthenticated' });
      }
      const user = await authService.getMe(req.user.id);
      res.json({
        success: true,
        data: user,
      });
    } catch (err) {
      next(err);
    }
  },
};
