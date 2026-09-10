import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import {
  categoryService,
  reviewService,
  submissionService,
  dealService,
  favoriteService,
  compareService,
  adminService,
} from '../services/appServices';
import { toolService } from '../services/toolService';
import { userRepository } from '../repositories/userRepository';

export const interactionController = {
  // Categories
  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await categoryService.getCategories();
      res.json({ success: true, data: categories });
    } catch (err) {
      next(err);
    }
  },

  async getCategoryBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      const category = await categoryService.getCategoryBySlug(slug);
      res.json({ success: true, data: category });
    } catch (err) {
      next(err);
    }
  },

  // Reviews
  async getReviews(req: Request, res: Response, next: NextFunction) {
    try {
      const { toolId } = req.params;
      const reviews = await reviewService.getReviewsForTool(toolId);
      res.json({ success: true, data: reviews });
    } catch (err) {
      next(err);
    }
  },

  async createReview(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { toolId } = req.params;
      const userId = req.user?.id || 'anonymous_user';
      const userName = req.user?.name || req.body.userName || 'Verified Reviewer';
      const review = await reviewService.createReview({
        userId,
        toolId,
        userName,
        rating: req.body.rating,
        title: req.body.title,
        comment: req.body.comment,
      });
      res.status(201).json({ success: true, data: review });
    } catch (err) {
      next(err);
    }
  },

  async updateReview(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.user?.id || '';
      const updated = await reviewService.updateReview(id, userId, req.body);
      res.json({ success: true, data: updated });
    } catch (err) {
      next(err);
    }
  },

  async deleteReview(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.user?.id || '';
      const isAdmin = req.user?.role === 'ADMIN' || req.user?.role === 'SUPER_ADMIN';
      await reviewService.deleteReview(id, userId, isAdmin);
      res.json({ success: true, message: 'Review deleted successfully' });
    } catch (err) {
      next(err);
    }
  },

  // Deals
  async getDeals(req: Request, res: Response, next: NextFunction) {
    try {
      const deals = await dealService.getDeals();
      res.json({ success: true, data: deals });
    } catch (err) {
      next(err);
    }
  },

  async getDealById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deal = await dealService.getDealById(id);
      res.json({ success: true, data: deal });
    } catch (err) {
      next(err);
    }
  },

  // Favorites
  async getFavorites(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id || 'user_staff';
      const favorites = await favoriteService.getFavorites(userId);
      res.json({ success: true, data: favorites });
    } catch (err) {
      next(err);
    }
  },

  async addFavorite(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { toolId } = req.params;
      const userId = req.user?.id || 'user_staff';
      await favoriteService.addFavorite(userId, toolId);
      res.json({ success: true, message: 'Tool bookmarked to favorites' });
    } catch (err) {
      next(err);
    }
  },

  async removeFavorite(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { toolId } = req.params;
      const userId = req.user?.id || 'user_staff';
      await favoriteService.removeFavorite(userId, toolId);
      res.json({ success: true, message: 'Tool removed from favorites' });
    } catch (err) {
      next(err);
    }
  },

  // Compare
  async getCompare(req: Request, res: Response, next: NextFunction) {
    try {
      const sessionId = (req.headers['x-session-id'] as string) || 'default';
      const comparison = await compareService.getComparison(sessionId);
      res.json({ success: true, data: comparison });
    } catch (err) {
      next(err);
    }
  },

  async setCompare(req: Request, res: Response, next: NextFunction) {
    try {
      const sessionId = (req.headers['x-session-id'] as string) || 'default';
      const { toolIds } = req.body;
      const comparison = await compareService.setComparison(sessionId, toolIds || []);
      res.json({ success: true, data: comparison });
    } catch (err) {
      next(err);
    }
  },

  async removeCompareTool(req: Request, res: Response, next: NextFunction) {
    try {
      const sessionId = (req.headers['x-session-id'] as string) || 'default';
      const { toolId } = req.params;
      const comparison = await compareService.removeTool(sessionId, toolId);
      res.json({ success: true, data: comparison });
    } catch (err) {
      next(err);
    }
  },

  // Submissions
  async createSubmission(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const sub = await submissionService.submitTool({
        ...req.body,
        userId: req.user?.id,
      });
      res.status(201).json({
        success: true,
        message: 'Tool submitted for crawler inspection',
        data: sub,
      });
    } catch (err) {
      next(err);
    }
  },

  async getMySubmissions(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id || '';
      const subs = await submissionService.getMySubmissions(userId);
      res.json({ success: true, data: subs });
    } catch (err) {
      next(err);
    }
  },

  // Admin Endpoints
  async getAdminAnalytics(req: Request, res: Response, next: NextFunction) {
    try {
      const analytics = await adminService.getAnalytics();
      res.json({ success: true, data: analytics });
    } catch (err) {
      next(err);
    }
  },

  async getAdminSubmissions(req: Request, res: Response, next: NextFunction) {
    try {
      const subs = await submissionService.getAllSubmissions();
      res.json({ success: true, data: subs });
    } catch (err) {
      next(err);
    }
  },

  async approveSubmission(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const approved = await submissionService.approveSubmission(id, req.body.notes);
      res.json({ success: true, message: 'Submission approved and indexed into directory', data: approved });
    } catch (err) {
      next(err);
    }
  },

  async rejectSubmission(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const rejected = await submissionService.rejectSubmission(id, req.body.notes);
      res.json({ success: true, message: 'Submission rejected', data: rejected });
    } catch (err) {
      next(err);
    }
  },

  async getAdminUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userRepository.findAll();
      res.json({ success: true, data: users });
    } catch (err) {
      next(err);
    }
  },

  async getAdminReviews(req: Request, res: Response, next: NextFunction) {
    try {
      const { reviewRepository } = await import('../repositories/reviewRepository');
      const reviews = await reviewRepository.findAll();
      res.json({ success: true, data: reviews });
    } catch (err) {
      next(err);
    }
  },
};
