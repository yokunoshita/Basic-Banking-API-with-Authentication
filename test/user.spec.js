const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = require("../app");
const request = require("supertest");

let user = {}

describe("Testing POST /api/v1/users", () => {

    beforeAll(async () => {
        await prisma.users.deleteMany({});
        await prisma.profile.deleteMany({});
    });

    test("email baru -> success", async () => {
        try {
            let name = "Hanabi";
            let email = "hanabiii@gmail.com";
            let password = "sekarangpukul2350";
            let identity_type = "KTP";
            let identity_number = "12345678";
            let address = "Nowhere";
            let { statusCode, body } = await request(app)
                .post("/api/v1/users")
                .send({name, email, password, identity_type, identity_number, address});

            user = body.data

            expect(statusCode).toBe(201);
            expect(body).toHaveProperty("status");
            expect(body).toHaveProperty("message");
            expect(body).toHaveProperty("data");

            expect(body.data).toHaveProperty("id");
            expect(body.data).toHaveProperty("name");
            expect(body.data).toHaveProperty("email");
            expect(body.data).toHaveProperty("profiles");

            expect(body.data.profiles).toHaveProperty("id");
            expect(body.data.profiles).toHaveProperty("identity_type");
            expect(body.data.profiles).toHaveProperty("identity_number");
            expect(body.data.profiles).toHaveProperty("address");
            expect(body.data.profiles).toHaveProperty("user_id");

            expect(body.data.name).toBe(name);
            expect(body.data.email).toBe(email);
            expect(body.data.profiles.identity_type).toBe(identity_type);
            expect(body.data.profiles.identity_number).toBe(identity_number);
            expect(body.data.profiles.address).toBe(address);
        } catch (err) {
            throw err;
        }
    });

    test("email sudah terdaftar -> error", async () => {
        try {
            let name = "Mika";
            let email = "hanabiii@gmail.com";
            let password = "blueArchive";
            let identity_type = "Paspor";
            let identity_number = "2234452";
            let address = "Trinity, Tea party";
            let { statusCode, body } = await request(app)
                .post("/api/v1/users")
                .send({name, email, password, identity_type, identity_number, address});
                
            expect(statusCode).toBe(400);
            expect(body).toHaveProperty("status");
            expect(body).toHaveProperty("message");
        } catch (err) {
            throw err;
        }
    });
});

describe("Testing GET /api/v1/users", () => {
    test(" index users yang sudah terdaftar -> success", async () => {
        try {
            let { statusCode, body } = await request(app).get("/api/v1/users");

            expect(statusCode).toBe(200);
            expect(body).toHaveProperty("status");
            expect(body).toHaveProperty("message");
            expect(body).toHaveProperty("data");

            expect(body.data[0]).toHaveProperty("id");
            expect(body.data[0]).toHaveProperty("name");
            expect(body.data[0]).toHaveProperty("email");
        } catch (err) {
            throw err;
        }
    });
});

describe("Testing GET /api/v1/users/:id", () => {
    test("test menampilkan detail users by id -> success", async () => {
        try {
            let { statusCode, body } = await request(app).get(`/api/v1/users/${user.id}`);
            console.log(user.id);
            expect(statusCode).toBe(200);
            expect(body).toHaveProperty("status");
            expect(body).toHaveProperty("message");
            expect(body).toHaveProperty("data");

            expect(body.data).toHaveProperty("id");
            expect(body.data).toHaveProperty("name");
            expect(body.data).toHaveProperty("email");
            expect(body.data).toHaveProperty("profiles");

            expect(body.data.profiles).toHaveProperty("id");
            expect(body.data.profiles).toHaveProperty("identity_type");
            expect(body.data.profiles).toHaveProperty("identity_number");
            expect(body.data.profiles).toHaveProperty("address");
            expect(body.data.profiles).toHaveProperty("user_id");
        } catch (err) {
            throw err;
        }
    });
});
