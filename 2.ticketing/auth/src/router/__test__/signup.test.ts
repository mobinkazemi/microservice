import supertest from "supertest"
import { app } from "../../app"

it('should signup with return http code 201', async () => {
    return supertest(app).post('/api/users/signup').send({
        "email": "test@test.com",
        "password": "P@ssw0rd"
    }).expect(201)
})

it('returns a 400 with an invalid email', async () => {
    return supertest(app).post('/api/users/signup').send({
        "email": "test.com",
        "password": "P@ssw0rd"
    }).expect(400)
})

it('returns a 400 with an invalid simple password', async () => {
    return supertest(app).post('/api/users/signup').send({
        "email": "test@test.com",
        "password": "password"
    }).expect(400)
})

it('returns a 400 while missing password', async () => {
    return supertest(app).post('/api/users/signup').send({
        "email": "test@test.com",
    }).expect(400)
})

it('returns a 400 while missing email', async () => {
    return supertest(app).post('/api/users/signup').send({
        "password": "password"
    }).expect(400)
})

it('prevents from duplicate emails', async () => {
    await supertest(app).post('/api/users/signup').send({
        "email": "test@test.com",
        "password": "P@ssw0rd"
    }).expect(201)

    return supertest(app).post('/api/users/signup').send({
        "email": "test@test.com",
        "password": "P@ssw0rd"
    }).expect(400)
})

it('sets a cookie after a successful sign up', async () => {
    const response = await supertest(app).post('/api/users/signup').send({
        "email": "test@test.com",
        "password": "P@ssw0rd"
    }).expect(201)

    expect(response.get('Set-Cookie')).toBeDefined()
})