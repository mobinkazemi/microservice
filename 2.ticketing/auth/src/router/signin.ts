import express, { Request, Response } from 'express'
import { signInDto } from './dto/signin.dto'
import { User } from '../models/user'
import { Password } from '../services/password'
import jwt from 'jsonwebtoken'
import { BadRequestError, validateMiddleware } from '@mokatickets/common'

const router = express.Router()


router.post('/api/users/signin', signInDto, validateMiddleware, async (req: Request, res: Response) => {
    const { email, password } = req.body

    const thisUser = await User.findOne({ email })

    if (!thisUser) {
        throw new BadRequestError("Bad login credentials")
    }

    const passwordMatched = await Password.compare(thisUser.password, password)

    if (!passwordMatched) {
        throw new BadRequestError('Bad login credentials')
    }


    const token = jwt.sign(
        { id: thisUser.id, email: thisUser.email },
        process.env.JWT_KEY as string,
        {}
    );

    // save token as cookie (cookie-session package needs req.session)
    req.session = {
        jwt: token,
    };

    res.status(200).send(thisUser);
})

export { router as signinRouter }