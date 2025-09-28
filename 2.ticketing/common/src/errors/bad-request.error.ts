import { CustomError } from "./custom.error"

export class BadRequestError extends CustomError {
    statusCode: number = 400
    constructor(private readonly msg: string) {
        super()
        Object.setPrototypeOf(this, BadRequestError.prototype)
    }
    serializeError(): { message: string; field?: string }[] {
        return [{ message: this.msg }]
    }
}