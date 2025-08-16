import { MongoMemoryServer } from 'mongodb-memory-server'
import { app } from '../app'
import mongoose from 'mongoose';
import supertest from 'supertest';

declare global {
    var signin: () => Promise<string[]>;
}

let mongo: any;
beforeAll(async () => {
    process.env.JWT_KEY = 'jwtTestKey'
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {})
})

beforeEach(async () => {
    const collections = await mongoose.connection.db?.collections();

    for (let collection of collections || []) {
        await collection.deleteMany({});
    }
})

afterAll(async () => {
    if (mongo) {
        await mongo.stop();
    }

    await mongoose.connection.close();
})

global.signin = async () => {
    const email = "test@test.com";
    const password = "P@ssw0rd";

    const response = await supertest(app)
        .post("/api/users/signup")
        .send({ email, password })
        .expect(201);

    const cookie = response.get("Set-Cookie");

    if (!cookie) {
        throw new Error("No Set-Cookie header found");
    }


    return cookie;
}