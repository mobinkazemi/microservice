import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

it('has a route handler listening to /api/tickets for post request', async () => {
    const response = await request(app).post('/api/tickets').send({});
    expect(response.status).not.toEqual(404);
})
it('can only accessed for logged in users', async () => {
    const response = await request(app).post('/api/tickets').send({});
    expect(response.status).toEqual(401);
})
it('returns a status not equal to 401 if user signed in', async () => {
    const response = await request(app).post('/api/tickets')
        .set('Cookie', global.signin())
        .send({});
    expect(response.status).not.toEqual(401);
})

it('must return error if ticket\'s title is invalid', async () => {
    await request(app).post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: '',
            price: 10,
        }).expect(400)

    await request(app).post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            // title: '',
            price: 10,
        }).expect(400)

})

it('must return error if ticket\'s price is invalid', async () => {
    await request(app).post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'valid title',
            price: -10,
        }).expect(400)

    await request(app).post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'valid title',
            // price: 10,
        }).expect(400)
})
it('create ticket with valid inputs', async () => {
    let tickets = await Ticket.find({})

    expect((tickets).length).toEqual(0)

    await request(app).post('/api/tickets').set('Cookie', global.signin()).send({
        title: 'valid title',
        price: 10
    })

    tickets = await Ticket.find({})
    expect(tickets.length).toEqual(1)
})
