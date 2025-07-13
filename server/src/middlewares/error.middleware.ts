import { isBaseError } from "@/errors/isError";
import type { Hono } from "hono"

export const errorHandler = (app: Hono) => {
    app.onError((error, c) => {
        console.log("Error occurred:", error);


        if (isBaseError(error)) {
            return c.json({
                error: error.name,
                message: error.message,
                details: error.details || null,
            }, error.statusCode);


        }
        return c.json({
            error: "INTERNAL_SERVER_ERROR",
            message: "something broke",
        }, 500);
    })

}