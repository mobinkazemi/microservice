import { currentUserMiddleware, requireAuth } from "@mokatickets/common";
import express, { Request, Response } from "express";

const router = express.Router();

router.get("/api/users/current-user", currentUserMiddleware, requireAuth, (req: Request, res: Response) => {
    return res.send({ currentUser: req.currentUser || null })
});

export { router as currentUserRouter };
