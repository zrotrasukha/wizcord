import type { Context } from "hono";

const asyncHandler = <C extends Context = Context>
    (handler: (c: C) => Promise<Response>) => {
    return async (c: C) => {
        try {
            return await handler(c);
        } catch (error) {
            throw error;
        }
    }
}

export default asyncHandler;