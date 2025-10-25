import { MongoMemoryServer } from 'mongodb-memory-server'
import { app } from '../app'
import mongoose from 'mongoose';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';
declare global {
    var signin: () => string[];
}

let mongo: any;
beforeAll(async () => {
    process.env.JWT_KEY = 'jwtTestKey'
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {})
}, 1200000)

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

global.signin = () => {
    // We should not request the auth service in the test because we should keep 
    // our services isolated from each other
    // So we will create a fake JWT payload and create the session

    // Steps to create a fake cookie:
    // 1. Build a JWT payload {id, email}
    const payload = {
        id: new mongoose.Types.ObjectId().toHexString(),
        email: 'test@test.com'
    }
    // 2. Create the JWT
    const token = jwt.sign(payload, process.env.JWT_KEY!)
    // 3. Build session object {jwt: MY_JWT}
    const session = { jwt: token };
    // 4. Turn that session into JSON
    const sessionJSON = JSON.stringify(session);
    // 5. Encode that JSON as base64
    const base64 = Buffer.from(sessionJSON).toString('base64');
    // 6. return a string thats the cookie with the encoded data
    return [`session=${base64}`];

}