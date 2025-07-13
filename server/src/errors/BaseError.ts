import type { ContentfulStatusCode, StatusCode } from "hono/utils/http-status";

export class BaseError extends Error {
    constructor(
        message: string,
        public statusCode: ContentfulStatusCode,
        public details? :unknown
    ){
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode || 500;
        this.message = message; 
        this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }
}