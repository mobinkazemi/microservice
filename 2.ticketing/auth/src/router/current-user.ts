import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { currentUserMiddleware } from "../middleware/currentUser";
import { requireAuth } from "../middleware/require-auth";

const router = express.Router();

router.get("/api/users/current-user", currentUserMiddleware, requireAuth, (req: Request, res: Response) => {
    return res.send({ currentUser: req.currentUser || null })
});

export { router as currentUserRouter };
