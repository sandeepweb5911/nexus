import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: error.issues.map((e) => `${e.path.join('.')}: ${e.message}`).join(', '),
        });
      }
      next(error);
    }
  };
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[API Error]:', err.message || err);
  const status = err.status || (err.message?.includes('not found') ? 404 : 400);
  res.status(status).json({
    success: false,
    message: err.message || 'An internal server error occurred',
  });
};
