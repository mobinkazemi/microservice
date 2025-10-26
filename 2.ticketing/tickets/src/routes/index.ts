import { requireAuth, validateMiddleware } from "@mokatickets/common";
import express, { Request, Response } from "express";
import { newTicketDto } from "./dto/new.dto";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.get("/api/tickets", async (req: Request, res: Response) => {
    const tickets = await Ticket.find({})

    res.send(tickets)
});

export { router as indexTicketRouter };