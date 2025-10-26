import { body, param } from "express-validator";

export const updateTicketDto = [
    param('id').isMongoId().withMessage('Please send a valid id'),
    body('title').isString().notEmpty().withMessage('Please insert a valid title'),
    body('price').isFloat({ gt: 0 }).withMessage('Please insert a valid price')
]