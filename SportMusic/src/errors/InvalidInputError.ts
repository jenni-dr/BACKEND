import { BaseError } from "./CustomError";

export class InvalidInputError extends BaseError {
    constructor(message: string) {
        super(message, 417)
    }
}