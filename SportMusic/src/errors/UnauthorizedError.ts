import { BaseError } from "./CustomError";

export class UnauthorizedError extends BaseError {
    constructor(message: string) {
        super(message, 403)
    }
}