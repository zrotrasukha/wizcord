import { isBaseError } from "@/errors/isError";
import { UNPROCESSABLE_CONTENT } from "@/errors/statusCode";
import type { Hono } from "hono"
import { ZodError , z} from "zod/v4";

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
        if(error instanceof ZodError){
            const treeified = z.treeifyError(error);
            return c.json({
                error: "ZOD_VALIDATION_ERROR",
                messages: treeified.errors.join(', '),
                details: treeified.errors

            }, UNPROCESSABLE_CONTENT);
        }
        
        return c.json({
            error: "INTERNAL_SERVER_ERROR",
            message: "something broke",
        }, 500);
    })

}