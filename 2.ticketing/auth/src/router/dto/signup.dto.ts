import { body } from "express-validator";

export const signUpDto = [
    body('email').isEmail().withMessage('Please enter a valid email address.'),
    body('password').isStrongPassword({ minLength: 4 }).withMessage('Please choose a strong password')
]