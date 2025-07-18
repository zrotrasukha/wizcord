import { getAuth } from '@hono/clerk-auth';
import type { Context, Next } from 'hono';
import '../types/hono.types'; // Import our type extensions

export const requireAuth = async (c: Context, next: Next) => {
  const auth = getAuth(c);
  
  if (!auth?.userId) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  // Attach user ID to context for easy access - now properly typed!
  c.set('userId', auth.userId);
  
  await next();
};
