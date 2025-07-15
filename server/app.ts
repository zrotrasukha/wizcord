import 'dotenv/config';
import { Hono } from "hono";
import { clerkMiddleware, getAuth, } from "@hono/clerk-auth";
import { createClerkClient } from '@clerk/backend';
import { logger } from 'hono/logger';
import serverRouter from './src/routes/server.routes';
import { errorHandler } from '@/middlewares/error.middleware';
import { cors } from 'hono/cors';
import { UNAUTHORIZED } from '@/errors/statusCode';

const app = new Hono();
// middlewares 
errorHandler(app);
app.use(logger());
app.use('*', cors({
  origin: ['http://localhost:3000'], // Add your frontend URL
  credentials: true,
}));

//version 1 
app.use('*', clerkMiddleware());
app.basePath('/api/v1')
  .route('/server', serverRouter)

export default app; 