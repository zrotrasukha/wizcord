import { BaseError } from "@/errors/BaseError";

export class NotFoundError extends BaseError {
    constructor(
        message = "Resource not found",
        details?: unknown
    ){
        super(message, 404, details);
    }
}

