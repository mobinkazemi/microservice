import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns a 404 if the provided id does not exist", async () => {
    await request(app)
        .put(`/api/tickets/${new mongoose.Types.ObjectId().toString()}`)
        .set("Cookie", global.signin())
        .send({
            title: "valid title",
            price: 10,
        })
        .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
    await request(app)
        .put(`/api/tickets/${new mongoose.Types.ObjectId().toString()}`)
        // .set("Cookie", global.signin())
        .send({
            title: "valid title",
            price: 10,
        })
        .expect(401);
});

it("returns a 401 if the user does not own the ticket", async () => {
    const ticket = await request(app)
        .post(`/api/tickets`)
        .set("Cookie", global.signin())
        .send({
            title: "title-1",
            price: 10,
        })
        .expect(201);

    await request(app)
        .put(`/api/tickets/${ticket.body.id}`)
        .set("Cookie", global.signin())
        .send({
            title: "title-2",
            price: 20,
        })
        .expect(401);
});

it("returns a 400 if the user provides an invalid title or price", async () => {
    const cookie = global.signin();

    const ticket = await request(app)
        .post(`/api/tickets`)
        .set("Cookie", cookie)
        .send({
            title: "title-1",
            price: 10,
        })
        .expect(201);

    // ################### price ###################

    await request(app)
        .put(`/api/tickets/${ticket.body.id}`)
        .set("Cookie", cookie)
        .send({
            title: 'valid title',
            price: -20,
        })
        .expect(400);
    await request(app)
        .put(`/api/tickets/${ticket.body.id}`)
        .set("Cookie", cookie)
        .send({
            title: 'valid title',
            price: 0,
        })
        .expect(400);
    await request(app)
        .put(`/api/tickets/${ticket.body.id}`)
        .set("Cookie", cookie)
        .send({
            title: 'valid title',
            price: "a string",
        })
        .expect(400);
    await request(app)
        .put(`/api/tickets/${ticket.body.id}`)
        .set("Cookie", cookie)
        .send({
            title: 'valid title',
            price: null,
        })
        .expect(400);

    // ################### title ###################
    await request(app)
        .put(`/api/tickets/${ticket.body.id}`)
        .set("Cookie", cookie)
        .send({
            title: '',
            price: 10
        })
        .expect(400);
    await request(app)
        .put(`/api/tickets/${ticket.body.id}`)
        .set("Cookie", cookie)
        .send({
            title: null,
            price: 10
        })
        .expect(400);
    await request(app)
        .put(`/api/tickets/${ticket.body.id}`)
        .set("Cookie", cookie)
        .send({
            title: 120,
            price: 10
        })
        .expect(400);

});

it("updates ticket", async () => {
    const cookie = global.signin();

    const ticket = await request(app)
        .post(`/api/tickets`)
        .set("Cookie", cookie)
        .send({
            title: "title-1",
            price: 10,
        })
        .expect(201);


    await request(app)
        .put(`/api/tickets/${ticket.body.id}`)
        .set("Cookie", cookie)
        .send({
            title: 'title-2',
            price: 20
        })
        .expect(200);

    const updatedTicket = await request(app).get(
        `/api/tickets/${ticket.body.id}`
    ).send().expect(200)


    expect(updatedTicket.body.title).toEqual('title-2')
    expect(updatedTicket.body.price).toEqual(20)
});
// it("returns 404 if ticket not found", async () => {
//     const response = await request(app)
//         .get(`/api/tickets/${(new mongoose.Types.ObjectId()).toString()}`)
//         .send()
//         .expect(404);
// });

// it("returns ticket if ticket found", async () => {
//     const price = 10;
//     const title = "valid title";

//     const response = await request(app)
//         .post("/api/tickets")
//         .set("Cookie", global.signin())
//         .send({ title, price })
//         .expect(201);

//     const ticketResponse = await request(app).get(
//         `/api/tickets/${response.body.id}`
//     ).send().expect(200)

//     expect(ticketResponse.body.title).toEqual(title)
//     expect(ticketResponse.body.price).toEqual(price)

// });
