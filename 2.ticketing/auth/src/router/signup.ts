import express, { Request, Response } from "express";
import { signUpDto } from "./dto/signup.dto";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request.error";
import jwt from "jsonwebtoken";
import { validateMiddleware } from "../middleware/validate-request";

const router = express.Router();

router.post(
    "/api/users/signup",
    signUpDto,
    validateMiddleware,
    async (req: Request, res: Response) => {
        const { password, email } = req.body;

        const exists = await User.findOne({ email });

        if (exists) {
            throw new BadRequestError("Email in use");
        }

        const newUser = User.build({ password, email });

        await newUser.save();

        const token = jwt.sign(
            { id: newUser.id, email: newUser.email },
            process.env.JWT_KEY as string,
            {}
        );

        // save token as cookie (cookie-session package needs req.session)
        req.session = {
            jwt: token,
        };

        res.status(201).send(newUser);
    }
);

export { router as signupRouter };
