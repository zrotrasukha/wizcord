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
app.use('*', clerkMiddleware());
app.basePath('/api/v1')
  .route('/server', serverRouter)

//version 1 
app.get('/', (c) => {
  const auth = getAuth(c);
  if(!auth?.userId) {
    return c.json({ message: 'Unauthorized' }, UNAUTHORIZED);
  }
  const userId = auth.userId;
  console.log({userId});

  return c.json({ message: 'Welcome to Wizcord API', userId});
})
export default app; 