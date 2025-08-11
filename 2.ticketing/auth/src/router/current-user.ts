import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/api/users/current-user", (req: Request, res: Response) => {
    if (!req.session || !req.session.jwt) {
        return res.send({ currentUser: null });
    }

    const token = req.session.jwt;

    try {
        const payload = jwt.verify(token, process.env.JWT_KEY as string);

        return res.send(payload);
    } catch (error) {
        return res.send({ currentUser: null });
    }
});

export { router as currentUserRouter };
