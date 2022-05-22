const mongoose = require('mongoose');
const request = require('supertest');
const createServer = require('../src/server');
const User = require('../src/models/User.model');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

describe('Register', () => {
    let server;
    beforeAll(() => {
        server = createServer();
        mongoose.connect(MONGO_URI, {}, (err) => {
            if (err) console.error(err);
            else console.log('Connected to MongoDB');
        });
    });

    afterAll(async () => {
        await User.deleteMany();
        await mongoose.connection.close();
    });

    it('valid register', async () => {
        const user = {
            username: "elonmusk",
            password: "iamveryrich",
            email: "elon@musk.com",
            birthdate: "06/28/1971",
            bio: "I am Elon Musk"
        };
        const res = await request(server)
            .post('/users/')
            .send(user);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
    });

    it('invalid register', async () => {
        const user = {
            username: "elonmusk",
            password: "iamveryrich",
            email: "elon@musk.com",
        };
        const res = await request(server)
            .post('/users/')
            .send(user);
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toBe('Please fill all the fields');
    });
});
