import 'dotenv/config';
import { Hono } from "hono";
import { clerkMiddleware } from "@hono/clerk-auth";
import { logger } from 'hono/logger';
import serverRouter from './src/routes/server.routes';
import { db } from './src/Database/db';
import { server } from './src/Database/schemas/schema';
import { errorHandler } from '@/middlewares/error.middleware';

const app = new Hono();


// middlewares 
errorHandler(app);
app.use(logger());
app.use('*', clerkMiddleware());
app.basePath('/api/v1')
  .route('/server', serverRouter)

//version 1 
app.get("/", (c) => {
  return c.text("Hello, world!");
});
export default app; 