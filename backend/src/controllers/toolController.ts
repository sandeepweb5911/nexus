import { Request, Response, NextFunction } from 'express';
import { toolService } from '../services/toolService';

export const toolController = {
  async getTools(req: Request, res: Response, next: NextFunction) {
    try {
      const { category, pricing, rating, useCase, platform, sort, page, limit } = req.query;
      const result = await toolService.getTools({
        category: category as string,
        pricing: pricing as string,
        rating: rating ? parseFloat(rating as string) : undefined,
        useCase: useCase as string,
        platform: platform as string,
        sort: sort as any,
        page: page ? parseInt(page as string, 10) : 1,
        limit: limit ? parseInt(limit as string, 10) : 50,
      });

      res.json({
        success: true,
        data: result.tools,
        meta: {
          total: result.total,
          page: result.page,
          totalPages: result.totalPages,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  async getToolBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      const tool = await toolService.getToolBySlug(slug);
      res.json({
        success: true,
        data: tool,
      });
    } catch (err) {
      next(err);
    }
  },

  async searchTools(req: Request, res: Response, next: NextFunction) {
    try {
      const q = (req.query.q as string) || '';
      const results = await toolService.searchTools(q);
      res.json({
        success: true,
        data: results,
      });
    } catch (err) {
      next(err);
    }
  },

  async getTrending(req: Request, res: Response, next: NextFunction) {
    try {
      const tools = await toolService.getTrendingTools();
      res.json({
        success: true,
        data: tools,
      });
    } catch (err) {
      next(err);
    }
  },

  async getNewTools(req: Request, res: Response, next: NextFunction) {
    try {
      const tools = await toolService.getNewTools();
      res.json({
        success: true,
        data: tools,
      });
    } catch (err) {
      next(err);
    }
  },

  async createTool(req: Request, res: Response, next: NextFunction) {
    try {
      const tool = await toolService.createTool(req.body);
      res.status(201).json({
        success: true,
        message: 'Tool created successfully',
        data: tool,
      });
    } catch (err) {
      next(err);
    }
  },

  async updateTool(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const tool = await toolService.updateTool(id, req.body);
      res.json({
        success: true,
        message: 'Tool updated successfully',
        data: tool,
      });
    } catch (err) {
      next(err);
    }
  },

  async deleteTool(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await toolService.deleteTool(id);
      res.json({
        success: true,
        message: 'Tool removed successfully',
      });
    } catch (err) {
      next(err);
    }
  },

  async trackClick(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await toolService.trackClick(id);
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  },
};
