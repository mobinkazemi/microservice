export class DatabaseConnectionError extends Error {
    reason: string = 'Database connection error';

    constructor() {
        super();

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
}
