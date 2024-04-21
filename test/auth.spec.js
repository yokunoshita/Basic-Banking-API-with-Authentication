const app = require('../app');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const { MAGIC_WORD } = process.env;

const prisma = new PrismaClient();

describe('Testing /api/v1/auth', () => {
    let user;
    let token;

    beforeAll(async () => {
        const password = await bcrypt.hash('testpassword', 10);
        user = await prisma.users.create({
            data: {
                name: 'Test User',
                email: 'test@example.com',
                password: password,
                profiles: {
                    create: {
                        identity_type: 'Passport',
                        identity_number: '1234567890',
                        address: 'Test Address'
                    }
                }
            }
        });
        token = jwt.sign(user, MAGIC_WORD);
    });

    afterAll(async () => {
        await prisma.profile.deleteMany();
        await prisma.users.deleteMany();
        await prisma.$disconnect();
    });

    test('New user -> success', async () => {
        const userData = {
            name: 'Test User 2',
            email: 'test2@example.com',
            password: 'testpassword',
            identity_type: 'ID Card',
            identity_number: '1234567891',
            address: 'Test Address 2'
        };

        const { statusCode, body } = await request(app)
            .post('/api/v1/auth/register')
            .send(userData);

        expect(statusCode).toBe(201);
        expect(body).toHaveProperty('status', 'success');
        expect(body).toHaveProperty('message');
    });

    test('Login -> sucess', async () => {
        const loginData = {
            email: 'test2@example.com',
            password: 'testpassword'
        };

        const { statusCode, body } = await request(app)
            .post('/api/v1/auth/login')
            .send(loginData);

        expect(statusCode).toBe(200);
        expect(body).toHaveProperty('status');
        expect(body).toHaveProperty('data');
        expect(body.data).toHaveProperty('token');
    });

    test('Login -> error', async () => {
        const loginData = {
            email: 'test@example.com',
            password: 'invalidpassword'
        };

        const { statusCode, body } = await request(app)
            .post('/api/v1/auth/login')
            .send(loginData);

        expect(statusCode).toBe(400);
        expect(body).toHaveProperty('status');
        expect(body).toHaveProperty('message', 'invalid email or password');
    });

    test('token valid -> succes', async () => {
        const { statusCode, body } = await request(app)
            .get('/api/v1/auth/authenticate')
            .set('Authorization', `Bearer ${token}`);

        expect(statusCode).toBe(200);
        expect(body).toHaveProperty('status');
        expect(body).toHaveProperty('message', 'Ok');
        expect(body).toHaveProperty('data');
        expect(body.data).toEqual(user);
    });

    test('Invalid token (null) -> error', async () => {
        const { statusCode, body } = await request(app)
            .get('/api/v1/auth/authenticate');

        expect(statusCode).toBe(401);
        expect(body).toHaveProperty('status', false);
        expect(body).toHaveProperty('message', 'token not provided!');
    });

    test('invalid token -> error', async () => {
        const { statusCode, body } = await request(app)
            .get('/api/v1/auth/authenticate')
            .set('Authorization', 'Bearer invalidtoken');

        expect(statusCode).toBe(400);
        expect(body).toHaveProperty('status');
        expect(body).toHaveProperty('message', 'jwt malformed');
    });
});
