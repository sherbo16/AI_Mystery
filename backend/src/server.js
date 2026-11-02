import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { env } from './config/env.js';
import { connectDatabase } from './config/db.js';
import investigationRoutes from './routes/investigationRoutes.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';

const app = express();
app.use(cors({ origin: env.frontendUrl }));
app.use(express.json({ limit: '1mb' }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 200, standardHeaders: true }));
app.get('/health', (req, res) => res.json({ success: true, service: 'ai-mystery-room-api' }));
app.use('/api/v1/investigations', investigationRoutes);
app.use(errorMiddleware);

connectDatabase().then(() => app.listen(env.port, () => console.log(`API listening on ${env.port}`))).catch((error) => {
  console.error('Unable to start API:', error.message);
  process.exitCode = 1;
});
