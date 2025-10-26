import { NotAuthorizedError, requireAuth, RouteNotFoundError, validateMiddleware } from "@mokatickets/common";
import express, { Request, Response } from "express";
import { updateTicketDto } from "./dto/update.dto";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.put("/api/tickets/:id", requireAuth, updateTicketDto, validateMiddleware, async (req: Request, res: Response) => {
    const { title, price } = req.body
    const { id } = req.params

    let ticket = await Ticket.findById(id)

    if (!ticket) {
        throw new RouteNotFoundError()
    }

    if (ticket.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError()
    }

    await ticket.set({ title, price }).save()

    res.send(ticket)

});

export { router as updateTicketRouter };