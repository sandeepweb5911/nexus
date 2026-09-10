import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import apiRouter from './backend/src/routes/index';
import { errorHandler } from './backend/src/middleware/errorHandler';
import cors from 'cors';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middlewares
  app.use(
    cors({
      origin: '*',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'x-session-id'],
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'ai-nexus-integrated-server',
      timestamp: new Date().toISOString(),
      architecture: 'Decoupled Node.js Express Backend + Next/Vite UI',
    });
  });

  // API Routes First
  const router = typeof apiRouter === 'function' ? apiRouter : (apiRouter as any).default;
  app.use('/api', router);

  // Error Handler for API
  const errHandler = typeof errorHandler === 'function' ? errorHandler : (errorHandler as any).default;
  if (typeof errHandler === 'function') {
    app.use(errHandler);
  }

  // Client SPA Serving (Vite in dev, static in production)
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[AI Nexus Engine] Live on http://0.0.0.0:${PORT}`);
  });
}

startServer();
