import { body } from "express-validator";

export const signInDto = [
    body('email').isEmail().withMessage('Please enter a valid email address.'),
    body('password').isStrongPassword({ minLength: 4 }).withMessage('Please choose a strong password')
]