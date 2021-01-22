import { BaseError } from "./CustomError";

export class NotFoundError extends BaseError {
    constructor(message: string) {
        super(message, 404)
    }
}