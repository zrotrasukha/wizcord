import {Hono} from 'hono';      
import { User } from '../classes/user';

const serverRouter = new Hono();

serverRouter.get('/all', async (c) => {
    const servers = await User.getAllUsers(); 
        console.log("Servers: ", servers);
    return c.json(servers);
})

serverRouter.get('/:id', async (c) => {
    const id = c.req.param('id');
    const user = await User.getUser(id);
    if (!user) {
        return c.json({ error: 'User not found' }, 404);
    }
    return c.json(user);
})

export default serverRouter;