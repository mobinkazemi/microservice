import { ValidationError } from "express-validator";

export class RequestValidationError extends Error {
    statusCode = 400
    constructor(private errors: ValidationError[]) {
        super();

        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeError() {
        const formattedErrors = this.errors.map((error) => {
            if (error.type === 'field') {
                return { message: error.msg, field: error.path };
            }
        });

        return formattedErrors
    }
}