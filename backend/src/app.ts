import express, { Express } from 'express';
import cors from 'cors';
import apiRouter from './routes';
import { errorHandler } from './middleware/errorHandler';

export function createApp(): Express {
  const app = express();

  // Basic security and parsing middlewares
  app.use(
    cors({
      origin: '*', // Allows Next.js frontend or preview domain
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'x-session-id'],
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'ai-nexus-backend',
      timestamp: new Date().toISOString(),
      database: 'connected',
    });
  });

  // Mount API routes
  app.use('/api', apiRouter);

  // Centralized Error Handling
  app.use(errorHandler);

  return app;
}
