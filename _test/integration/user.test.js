const app = require("../../app")
const db = require("../../models")
const User = db.User;
const supertest = require("supertest");
describe("User requests test", () => {
    let thisDb = db
    beforeAll(async () => {
        await User.destroy({ truncate: true, cascade: false })
    })
    test("register user", async () => {
        let request = {
            uid: 'tester',
            name: 'tester',
            password: '1234'
        }
        const response = await supertest(app).post("/users").send(request);
        expect(response.statusCode).toBe(201);
    });
    test("register user bad request", async () => {
        let request = {
            uid: 'tester',
            name: '',
            password: ''
        }
        const response = await supertest(app).post("/users").send(request);
        expect(response.statusCode).toBe(400);
    });
    test("register user exists", async () => {
        let request = {
            uid: 'tester',
            name: 'tester2',
            password: '12345'
        }
        const response = await supertest(app).post("/users").send(request);
        expect(response.statusCode).toBe(409);
    });
    test("login user", async () => {
        let request = {
            uid: 'tester',
            password: '1234'
        }
        const response = await supertest(app).post("/users/login").send(request);
        expect(response.statusCode).toBe(200);
    });
    test("login user wrong username", async () => {
        let request = {
            uid: 'tester',
            password: '12345'
        }
        const response = await supertest(app).post("/users/login").send(request);
        expect(response.statusCode).toBe(404);
    });
    test("login user wrong password", async () => {
        let request = {
            uid: 'testerFake',
            password: '1234'
        }
        const response = await supertest(app).post("/users/login").send(request);
        expect(response.statusCode).toBe(404);
    });
    // After all tersts have finished, close the DB connection
    afterAll(async () => {
        await thisDb.sequelize.close()
    })
})