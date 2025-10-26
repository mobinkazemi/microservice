import request from "supertest";
import { app } from "../../app";

function createTicket() {
    return request(app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send({ title: "El Classico", price: 700 })
        .expect(201);
}

it("returns list of available tickets", async () => {
    await createTicket();
    await createTicket();
    await createTicket();

    const tickets = await request(app).get(`/api/tickets`).send().expect(200);

    expect(tickets.body.length).toEqual(3);
});
