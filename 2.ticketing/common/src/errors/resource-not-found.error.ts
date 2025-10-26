import { CustomError } from "./custom.error";

export class ResourceNotFoundError extends CustomError {
    statusCode = 404

    constructor() {
        super()

        Object.setPrototypeOf(this, ResourceNotFoundError.prototype)
    }

    serializeError(): { message: string; field?: string; }[] {
        return [{
            message: 'Resource Not Found'
        }]
    }
}