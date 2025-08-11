import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { currentUserMiddleware } from "../middleware/currentUser";

const router = express.Router();

router.get("/api/users/current-user", currentUserMiddleware, (req: Request, res: Response) => {
    return res.send({ currentUser: req.currentUser || null })
});

export { router as currentUserRouter };
