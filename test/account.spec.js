const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = require("../app");
const request = require("supertest");

let user;
let account;

describe('Testing POST /api/v1/accounts', () => {
    beforeAll(async () => {
        user = await prisma.users.findMany();
    });

    test("Akun baru -> success", async () => {
        try {
            let users_id = user[0].id;
            console.log(user[0].id);
            let bank_name = 'Bank Tabungan Milenium';
            let bank_account_number = "432244278";
            let balance = 1000000;
            let {statusCode, body} = await request(app)
                .post('/api/v1/accounts')
                .send({users_id, bank_name, bank_account_number, balance});

                expect(statusCode).toBe(201);
                expect(body).toHaveProperty("status");
                expect(body).toHaveProperty("message");
                expect(body).toHaveProperty("data");

                expect(body.data).toHaveProperty("id");
                expect(body.data).toHaveProperty("users_id");
                expect(body.data).toHaveProperty("bank_name");
                expect(body.data).toHaveProperty("bank_account_number");
                expect(body.data).toHaveProperty("balance");

                expect(body.data.users_id).toBe(users_id);
                expect(body.data.bank_name).toBe(bank_name);
                expect(body.data.bank_account_number).toBe(bank_account_number);
                expect(body.data.balance).toBe(balance);
        } catch (error) {
            throw error
        }
    });
});

describe("Testing GET /api/v1/accounts", () => {
    test("index accounts -> success", async () => {
        try {
            let { statusCode, body } = await request(app).get("/api/v1/accounts");

            expect(statusCode).toBe(200);
            expect(body).toHaveProperty("status");
            expect(body).toHaveProperty("message");
            expect(body).toHaveProperty("data");

            expect(body.data[0]).toHaveProperty("id");
            expect(body.data[0]).toHaveProperty("users_id");
            expect(body.data[0]).toHaveProperty("bank_name");
            expect(body.data[0]).toHaveProperty("bank_account_number");
            expect(body.data[0]).toHaveProperty("balance");
        } catch (err) {
            throw err;
        }
    });
});

describe("Testing GET /api/v1/accounts/:id", () => {
    beforeAll(async () => {
        account = await prisma.bankAccount.findMany();
    });
    test("Detail account by id -> success", async () => {
        try {
            let { statusCode, body } = await request(app).get(`/api/v1/accounts/${account[0].id}`);
            expect(statusCode).toBe(200);
            expect(body).toHaveProperty("status");
            expect(body).toHaveProperty("message");
            expect(body).toHaveProperty("data");

            expect(body.data).toHaveProperty("id");
            expect(body.data).toHaveProperty("users_id");
            expect(body.data).toHaveProperty("bank_name");
            expect(body.data).toHaveProperty("bank_account_number");
            expect(body.data).toHaveProperty("balance");
            expect(body.data).toHaveProperty("users");

        } catch (err) {
            throw err;
        }
    });

    test("Invalid id -> error", async () => {
        try {
            let { statusCode, body } = await request(app).get(
                `/api/v1/accounts/${account[0].id + 100}`
            );
            expect(statusCode).toBe(404);
            expect(body).toHaveProperty("status");
            expect(body).toHaveProperty("message");
            expect(body).toHaveProperty("data");
        } catch (err) {
            throw err;
        }
    });
});