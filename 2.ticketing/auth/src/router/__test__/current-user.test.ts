import supertest from "supertest";
import { app } from "../../app";

it("should respond with user info of current user", async () => {
    const cookie = await global.signin();

    const response = await supertest(app)
        .get("/api/users/current-user")
        .set("Cookie", cookie)
        .expect(200);

    expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("should respond with unauthorized if not logged in", async () => {
    return supertest(app)
        .get("/api/users/current-user")
        .expect(401);

});
