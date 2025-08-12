import supertest from "supertest";
import { app } from "../../app";

it("should signin and return HTTP status code 200 if everything is good", async () => {
    await supertest(app).post("/api/users/signup").send({
        email: "test@test.com",
        password: "P@ssw0rd",
    });

    return supertest(app)
        .post("/api/users/signin")
        .send({
            email: "test@test.com",
            password: "P@ssw0rd",
        })
        .expect(200);
});

it("should signin and has cookie inside response header if everything is good", async () => {
    await supertest(app).post("/api/users/signup").send({
        email: "test@test.com",
        password: "P@ssw0rd",
    });

    const response = await supertest(app)
        .post("/api/users/signin")
        .send({
            email: "test@test.com",
            password: "P@ssw0rd",
        })
        .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined()
});

it("should error if email or password does not match", async () => {
    await supertest(app).post("/api/users/signup").send({
        email: "test@test.com",
        password: "P@ssw0rd",
    });

    await supertest(app)
        .post("/api/users/signin")
        .send({
            email: "wrong@email.com",
            password: "P@ssw0rd",
        })
        .expect(400);

    await supertest(app)
        .post("/api/users/signin")
        .send({
            email: "test@test.com",
            password: "Wr0ngP@ssw0rd",
        })
        .expect(400);
});



it("returns a 400 with an invalid email", async () => {
    return supertest(app)
        .post("/api/users/signin")
        .send({
            email: "test.com",
            password: "P@ssw0rd",
        })
        .expect(400);
});

it("returns a 400 with an invalid simple password", async () => {
    return supertest(app)
        .post("/api/users/signin")
        .send({
            email: "test@test.com",
            password: "password",
        })
        .expect(400);
});

it("returns a 400 while missing password", async () => {
    return supertest(app)
        .post("/api/users/signin")
        .send({
            email: "test@test.com",
        })
        .expect(400);
});

it("returns a 400 while missing email", async () => {
    return supertest(app)
        .post("/api/users/signin")
        .send({
            password: "password",
        })
        .expect(400);
});
