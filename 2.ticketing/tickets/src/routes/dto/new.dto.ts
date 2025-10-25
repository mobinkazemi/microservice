import { body } from "express-validator";

export const newTicketDto = [
    body('title').isString().notEmpty().withMessage('Please insert a valid title'),
    body('price').isFloat({ gt: 0 }).withMessage('Please insert a valid price')
]