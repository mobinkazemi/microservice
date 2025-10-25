import mongoose, { mongo } from "mongoose";

interface ITicket {
    title: string;
    price: number;
    userId: string;
}

interface ITicketDoc extends mongoose.Document {
    title: string;
    price: number;
    userId: string;
}

interface ITicketSchema extends mongoose.Model<ITicketDoc> {
    build(attrs: ITicket): ITicketDoc;
}

const ticketSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
    },
    {
        toJSON: {
            transform(doc, ret: any) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    }
);

ticketSchema.statics.build = (data: ITicket) => {
    return new Ticket(data);
};

const Ticket = mongoose.model<ITicketDoc, ITicketSchema>(
    "Ticket",
    ticketSchema
);

export { Ticket };
