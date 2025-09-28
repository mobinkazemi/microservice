import { CustomError } from "./custom.error";

export class DatabaseConnectionError extends CustomError {
    reason: string = 'Database connection error';

    statusCode: number = 500;

    constructor() {
        super();

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeError() {
        return [{ message: this.reason }]
    }
}
