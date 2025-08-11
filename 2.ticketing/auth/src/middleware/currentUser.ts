import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface ICurrentUser {
    id: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: ICurrentUser
        }
    }
}

export const currentUserMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.session?.jwt) {
        return next();
    }

    const token = req.session.jwt;

    try {
        const payload = jwt.verify(token, process.env.JWT_KEY as string) as ICurrentUser;

        req.currentUser = payload
    } catch (error) { }

    next();
};
