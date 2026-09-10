import { createApp } from './app';
import { config } from './config/env';

const app = createApp();
const PORT = config.port;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[AI Nexus Backend] Running on http://0.0.0.0:${PORT}`);
  console.log(`[AI Nexus Backend] Healthcheck available at http://0.0.0.0:${PORT}/api/health`);
});
