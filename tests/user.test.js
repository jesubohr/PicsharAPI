const mongoose = require('mongoose');
const request = require('supertest');
const createServer = require('../src/server');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

describe('User Information', () => {
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

    it.todo('all user information except password and birthday');


    it.todo('number of posts of user is correct');

    it.todo('number of liked posts of user is correct');

    it.todo('number of followers of user is correct');

    it.todo('number of following of user is correct');


    it.todo('list of followers of user');

    it.todo('list of following of user');


    it('request to follow user', async () => {
        const user = { username: 'jameswo', password: 'loquendo' };
        const res = await request(server)
            .post('/users/login')
            .send(user);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');

        const user2 = { username: 'sergis', password: 'soygay' };
        const res2 = await request(server)
            .post('/users/login')
            .send(user2);
        expect(res2.statusCode).toBe(200);
        expect(res2.body).toHaveProperty('token');

        const token = res2.body.token;
        const decoded = jwt.verify(token, JWT_SECRET);

        const res3 = await request(server)
            .post('/follows/request')
            .set('Authorization', `Bearer ${res.body.token}`)
            .send({ user_id: decoded.sub });
        expect(res3.statusCode).toBe(200);
        expect(res3.body).toHaveProperty('message');
        expect(res3.body.message).toBe('request sent');
    });

    it.todo('accept request to follow user', async () => {
        const user = { username: 'jameswo', password: 'loquendo' };
        const res = await request(server)
            .post('/users/login')
            .send(user);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');

        const user2 = { username: 'sergis', password: 'soygay' };
        const res2 = await request(server)
            .post('/users/login')
            .send(user2);
        expect(res2.statusCode).toBe(200);
        expect(res2.body).toHaveProperty('token');

        const token = res2.body.token;
        const decoded = jwt.verify(token, JWT_SECRET);

        const res3 = await request(server)
            .post('/follows/request')
            .set('Authorization', `Bearer ${res.body.token}`)
            .send({ user_id: decoded.sub });
        expect(res3.statusCode).toBe(200);
        expect(res3.body).toHaveProperty('message');
        expect(res3.body.message).toBe('request sent');

        const res4 = await request(server)
            .post('/follows/response')
            .set('Authorization', `Bearer ${res2.body.token}`)
            .send({ request_id: res3.body.request_id, action: 'accept' });
        expect(res4.statusCode).toBe(200);
        expect(res4.body).toHaveProperty('message');
        expect(res4.body.message).toBe('request accepted');
    });

    it.todo('deny request to follow user');


    it.todo('like a post');

    it.todo('liked posts of user');


    it.todo('save a post');

    it.todo('saved posts of user');


    it.todo('comment on a post');

    it.todo('comments on a post');
});
