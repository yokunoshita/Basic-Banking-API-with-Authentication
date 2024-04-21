const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = require("../app");
const request = require("supertest");

describe("Testing POST /api/v1/transactions", () => {
    let accounts;

    beforeAll(async () => {
        accounts = await prisma.bankAccount.findMany();
    });

    test("New transaction (sufficient balance) -> success", async () => {
        try {
            const source_account_id = accounts[0].id;
            const destination_account_id = accounts[1].id;
            const amount = 1000;
            const { statusCode, body } = await request(app)
                .post("/api/v1/transactions")
                .send({ source_account_id, destination_account_id, amount });
            
            expect(statusCode).toBe(201);
            expect(body).toHaveProperty("status");
            expect(body).toHaveProperty("message");
            expect(body).toHaveProperty("data");

        } catch (error) {
            throw error
        }
    });
      
    test("New transaction insufficient balance -> error", async () => {
        try {
            const source_account_id = accounts[0].id;
            const destination_account_id = accounts[1].id;
            const amount = accounts[0].balance + 100; 
        
            const { statusCode, body } = await request(app)
                .post("/api/v1/transactions")
                .send({ source_account_id, destination_account_id, amount });
      
            expect(statusCode).toBe(400);
            expect(body).toHaveProperty("status", false);
            expect(body).toHaveProperty("message");
        } catch (error) {
            throw error
        }
    });
});  