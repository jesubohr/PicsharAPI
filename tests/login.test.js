const mongoose = require('mongoose');
const request = require('supertest');
const createServer = require('../src/server');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

describe('Login', () => {
    let server;
    beforeAll(() => {
        server = createServer();
        mongoose.connect(MONGO_URI, {}, (err) => {
            if (err) console.error(err);
            else console.log('Connected to MongoDB');
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('valid login', async () => {
        const user = {
            username: 'jameswo',
            password: 'loquendo',
        };
        const res = await request(server)
            .post('/users/login')
            .send(user);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
    });

    it('invalid login, wrong username', async () => {
        const user = {
            username: 'user123',
            password: 'loquendo',
        };
        const res = await request(server)
            .post('/users/login')
            .send(user);
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toBe('User not found');
    });

    it('invalid login, wrong password', async () => {
        const user = {
            username: 'jameswo',
            password: '123456',
        };
        const res = await request(server)
            .post('/users/login')
            .send(user);
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toBe('Incorrect password');
    });
});

