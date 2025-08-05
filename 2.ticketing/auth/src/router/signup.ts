import express, { Request, Response } from 'express'
import { signUpDto } from "./dto/signup.dto";
import { validationResult } from 'express-validator';
import { DatabaseConnectionError } from '../errors/database-connection.error';
import { RequestValidationError } from '../errors/request-validation.error';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request.error';
import { Password } from '../services/password';


const router = express.Router()


router.post('/api/users/signup', signUpDto, async (req: Request, res: Response) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        throw new RequestValidationError(validationErrors.array());
    }

    const { password, email } = req.body

    const exists = await User.findOne({ email })

    if (exists) {
        throw new BadRequestError('Email in use')
    }

    const newUser = User.build({ password: await Password.toHash(password), email })

    await newUser.save()

    res.status(201).send(newUser)

})

export { router as signupRouter }