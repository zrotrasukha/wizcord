import { Hono } from 'hono';
import { Server } from '@/classes/server.class';
import { CREATED, NOT_FOUND } from '@/errors/statusCode';
import { requireAuth } from '@/middlewares/auth.middleware';
import { NotFoundError } from '@/errors/user.errror.ts';
import '../types/hono.types';
import { createServerSchema, updateServerSchema } from '@/Types/server.types';
import { zValidator as zv } from '@hono/zod-validator';
import {} from 'hono/csrf'
const serverRouter = new Hono()
    .get('/all', requireAuth, async (c) => {
        const userId = c.get('userId') as string;
        const servers = await Server.getAllServers(userId);
        
        if (!servers || servers.length === 0) {
            throw new NotFoundError('No servers found');
        }
        
        return c.json(servers);
    })
    .post('/create', requireAuth, zv('json', createServerSchema), async (c) => {
        const { name, description, icon } = c.req.valid('json');
        const userId = c.get('userId') as string;

        const server = await Server.createServer(name, userId, description, icon);

        if (!server) {
            throw new Error('Failed to create server'); // Gets caught by error middleware
        }

        return c.json(server, CREATED);
    })
    .put('/update/:serverId', requireAuth, zv('json', updateServerSchema), async (c) => {
        const serverId = c.req.param('serverId');
        const userId = c.get('userId') as string;
        const { name, description, icon } = c.req.valid('json');

        const server = await Server.updateServer(serverId, name, description, icon);
        
        if (!server) {
            throw new NotFoundError('Server not found or update failed');
        }
        
        return c.json(server);
    })

export default serverRouter;