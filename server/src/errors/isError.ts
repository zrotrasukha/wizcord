import { BaseError } from "./BaseError";

export const isBaseError = (error: unknown): error is BaseError => {
    return error instanceof BaseError;
}