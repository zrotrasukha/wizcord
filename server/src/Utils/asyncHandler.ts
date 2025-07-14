import type { Context } from "hono";

const asyncHandler = <C extends Context>(handler: (c: C) => Promise<Response>) => {
    return async (c: C) => {
        try {
            return await handler(c);
        } catch (error) {
            throw error;
        }
    }
}