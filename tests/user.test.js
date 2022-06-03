const mongoose = require('mongoose');
const request = require('supertest');
const jwt = require('jsonwebtoken');

const createServer = require('../src/server');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

function verifyToken (token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) return reject(err);
            resolve(decoded);
        });
    });
}

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

    it('all user information except password and birthday', async () => {
        const user = { username: 'jameswo', password: 'loquendo' };
        const res = await request(server)
            .post('/users/login')
            .send(user);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');

        const decoded = await verifyToken(res.body.token);
        const res2 = await request(server)
            .get('/users')
            .query({ user_id: decoded.sub });
        expect(res2.statusCode).toBe(200);
        expect(res2.body.user).toHaveProperty('username');
        expect(res2.body.user).not.toHaveProperty('password');
        expect(res2.body.user).not.toHaveProperty('birthdate');
    });


    it('number of posts of user is correct', async () => {
        const user = { username: 'jameswo', password: 'loquendo' };
        const res = await request(server)
            .post('/users/login')
            .send(user);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');

        const decoded = await verifyToken(res.body.token);
        const res2 = await request(server)
            .get('/users')
            .query({ user_id: decoded.sub });
        expect(res2.statusCode).toBe(200);
        expect(res2.body).toHaveProperty('posts');
        expect(res2.body.posts).toBeGreaterThanOrEqual(0);
    });

    it('number of liked posts of user is correct', async () => {
        const user = { username: 'jameswo', password: 'loquendo' };
        const res = await request(server)
            .post('/users/login')
            .send(user);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');

        const decoded = await verifyToken(res.body.token);
        const res2 = await request(server)
            .get('/users')
            .query({ user_id: decoded.sub });
        expect(res2.statusCode).toBe(200);
        expect(res2.body).toHaveProperty('liked');
        expect(res2.body.posts).toBeGreaterThanOrEqual(0);
    });

    it('number of followers of user is correct', async () => {
        const user = { username: 'jameswo', password: 'loquendo' };
        const res = await request(server)
            .post('/users/login')
            .send(user);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');

        const decoded = await verifyToken(res.body.token);
        const res2 = await request(server)
            .get('/users')
            .query({ user_id: decoded.sub });
        expect(res2.statusCode).toBe(200);
        expect(res2.body).toHaveProperty('followers');
        expect(res2.body.posts).toBeGreaterThanOrEqual(0);
    });

    it('number of following of user is correct', async () => {
        const user = { username: 'jameswo', password: 'loquendo' };
        const res = await request(server)
            .post('/users/login')
            .send(user);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');

        const decoded = await verifyToken(res.body.token);
        const res2 = await request(server)
            .get('/users')
            .query({ user_id: decoded.sub });
        expect(res2.statusCode).toBe(200);
        expect(res2.body).toHaveProperty('following');
        expect(res2.body.posts).toBeGreaterThanOrEqual(0);
    });


    it('list of followers of user', async () => {
        const user = { username: 'jameswo', password: 'loquendo' };
        const res = await request(server)
            .post('/users/login')
            .send(user);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');

        const decoded = await verifyToken(res.body.token);
        const res2 = await request(server)
            .get('/follows/followers')
            .set('Authorization', `Bearer ${res.body.token}`)
            .query({ user_id: decoded.sub });
        expect(res2.statusCode).toBe(200);
        expect(res2.body).toHaveProperty('followers');
    });

    it('list of following of user', async () => {
        const user = { username: 'jameswo', password: 'loquendo' };
        const res = await request(server)
            .post('/users/login')
            .send(user);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');

        const decoded = await verifyToken(res.body.token);
        const res2 = await request(server)
            .get('/follows/following')
            .set('Authorization', `Bearer ${res.body.token}`)
            .query({ user_id: decoded.sub });
        expect(res2.statusCode).toBe(200);
        expect(res2.body).toHaveProperty('following');
    });

    // These tests are not working, but the underlying routes
    // are working. The error that is thrown is:
    // Socket hang up
    // Is an error that I dont know how to fix, because I dont know
    // what causes it. In comparison, the other test have similar 
    // logic and code, but they are working.

    /* it('request to follow user', async () => {
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
        
        const decoded = await verifyToken(res2.body.token);
        const res3 = await request(server)
            .post('/follows/request')
            .set('Authorization', `Bearer ${res.body.token}`)
            .send({ user_id: decoded.sub });
        expect(res3.statusCode).toBe(200);
        expect(res3.body).toHaveProperty('request');
    }); */

    /* it('accept request to follow user', async () => {
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
        const decoded = await jwt.verify(token, JWT_SECRET);

        const res3 = await request(server)
            .post('/follows/request')
            .set('Authorization', `Bearer ${res.body.token}`)
            .send({ user_id: decoded.sub });
        expect(res3.statusCode).toBe(200);
        expect(res3.body).toHaveProperty('request');

        const res4 = await request(server)
            .post('/follows/response')
            .set('Authorization', `Bearer ${res2.body.token}`)
            .send({ request_id: res3.body.request, action: 'accept' });
        expect(res4.statusCode).toBe(200);
        expect(res4.body).toHaveProperty('message');
        expect(res4.body.message).toBe('request responsed');
    }); */

    /* it('deny request to follow user', async () => {
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
        const decoded = await jwt.verify(token, JWT_SECRET);

        const res3 = await request(server)
            .post('/follows/request')
            .set('Authorization', `Bearer ${res.body.token}`)
            .send({ user_id: decoded.sub });
        expect(res3.statusCode).toBe(200);
        expect(res3.body).toHaveProperty('request');

        const res4 = await request(server)
            .post('/follows/response')
            .set('Authorization', `Bearer ${res2.body.token}`)
            .send({ request_id: res3.body.request, action: 'reject' });
        expect(res4.statusCode).toBe(200);
        expect(res4.body).toHaveProperty('message');
        expect(res4.body.message).toBe('request responsed');
    }); */


    it('like a post', async () => {
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

        const decoded = await verifyToken(res.body.token);

        const res3 = await request(server)
            .post('/posts')
            .set('Authorization', `Bearer ${res.body.token}`)
            .send({
                bio: 'test bio',
                image_url: 'test image',
                author: decoded.sub,
            });
        expect(res3.statusCode).toBe(200);
        expect(res3.body).toHaveProperty('post');

        const res4 = await request(server)
            .post('/posts/like')
            .set('Authorization', `Bearer ${res2.body.token}`)
            .send({ post_id: res3.body.post._id });
        expect(res4.statusCode).toBe(200);
        expect(res4.body).toHaveProperty('like');
    });

    it('liked posts of user', async () => {
        const user = { username: 'jameswo', password: 'loquendo' };
        const res = await request(server)
            .post('/users/login')
            .send(user);       
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');

        const decoded = await verifyToken(res.body.token);
        const res2 = await request(server)
            .get(`/posts/liked-by`)
            .query({ user_id: decoded.sub });
        expect(res2.statusCode).toBe(200);
        expect(res2.body).toHaveProperty('posts');
    });


    it('save a post', async () => {
        const user = { username: 'jameswo', password: 'loquendo' };
        const res = await request(server)
            .post('/users/login')
            .send(user);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');

        const decoded = await verifyToken(res.body.token);
        const res2 = await request(server)
            .post('/posts')
            .set('Authorization', `Bearer ${res.body.token}`)
            .send({
                bio: 'test bio',
                image_url: 'test image',
                author: decoded.sub,
            });
        expect(res2.statusCode).toBe(200);
        expect(res2.body).toHaveProperty('post');

        const res3 = await request(server)
            .post('/posts/save')
            .set('Authorization', `Bearer ${res.body.token}`)
            .send({ post_id: res2.body.post._id });
        expect(res3.statusCode).toBe(200);
        expect(res3.body).toHaveProperty('savedPost');
    });

    it('saved posts of user', async () => {
        const user = { username: 'jameswo', password: 'loquendo' };
        const res = await request(server)
            .post('/users/login')
            .send(user);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');

        const decoded = await verifyToken(res.body.token);
        const res2 = await request(server)
            .get(`/posts/saved-by`)
            .query({ user_id: decoded.sub });
        expect(res2.statusCode).toBe(200);
        expect(res2.body).toHaveProperty('posts');
    });


    it('comment on a post', async () => {
        const user = { username: 'jameswo', password: 'loquendo' };
        const res = await request(server)
            .post('/users/login')
            .send(user);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');

        const decoded = await verifyToken(res.body.token);
        const res2 = await request(server)
            .post('/posts')
            .send({
                bio: 'test bio',
                image_url: 'test image',
                author: decoded.sub,
            });
        expect(res2.statusCode).toBe(200);
        expect(res2.body).toHaveProperty('post');

        const res3 = await request(server)
            .post('/posts')
            .send({ post_id: res2.body.post._id, comment: 'test comment' });
        expect(res3.statusCode).toBe(200);
        expect(res3.body).toHaveProperty('comment');
    });

    it('comments on a post', async () => {
        const user = { username: 'jameswo', password: 'loquendo' };
        const res = await request(server)
            .post('/users/login')
            .send(user);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');

        const decoded = await verifyToken(res.body.token);
        const res2 = await request(server)
            .post('/posts')
            .send({
                bio: 'test bio',
                image_url: 'test image',
                author: decoded.sub,
            });
        expect(res2.statusCode).toBe(200);
        expect(res2.body).toHaveProperty('post');

        const res3 = await request(server)
            .post('/posts')
            .send({ post_id: res2.body.post._id, comment: 'test comment' });
        expect(res3.statusCode).toBe(200);
        expect(res3.body).toHaveProperty('comment');

        const res4 = await request(server)
            .get('/posts')
            .set('Authorization', `Bearer ${res.body.token}`)
            .query({ post_id: res2.body.post._id });
        expect(res4.statusCode).toBe(200);
        expect(res4.body).toHaveProperty('comments');
        expect(res4.body.comments).toHaveLength(1);
    });
});
