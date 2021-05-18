const app = require("../../app")
const db = require("../../models")
const supertest = require("supertest");
describe("Post requests", () => {
    let thisDb = db
    //--------Post-------
    test("post story", async () => {
        let request = {
            title: 'test story',
            story: 'test',

        }
        const response = await supertest(app).post("/posts").send(request).set('Cookie', ['Authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJ0ZXN0ZXIiLCJpYXQiOjE2MjEzMTcxMjMsImV4cCI6MTYyMTMzNTEyM30.HXKVbJF8-QLlvY7IxxKY_CEh9KaGAXwmxnnHNKoOpYI']);
        expect(response.statusCode).toBe(201);
    });
    test("post story fail to authenticate", async () => {
        let request = {
            title: 'test story',
            story: 'test',

        }
        const response = await supertest(app).post("/posts").send(request).set('Cookie', ['Authorization=False']);
        expect(response.statusCode).toBe(403);
    });
    test("post story fail", async () => {
        let request = {
            title: 'test story',
            story: 'test',

        }
        const response = await supertest(app).post("/posts").send(request);
        expect(response.statusCode).toBe(401);
    });
    //------get--------
    test("read all stories", async () => {

        const response = await supertest(app).get("/posts").set('Accept', 'application/json');
        console.log(response);
        expect(response.statusCode).toBe(200);
        expect(response.body[0].title).toBe('test story');
    });
    test("read all stories content", async () => {
        let response = await supertest(app).get("/posts").set('Accept', 'text/plain');
        response = await supertest(app).get("/posts").set('Accept', 'text/html');
        response = await supertest(app).get("/posts").set('Accept', 'application/xml');
        response = await supertest(app).get("/posts");
        expect(response.statusCode).toBe(200);
    });
    test("read story by id fail", async () => {
        const response = await supertest(app).get("/posts/1");
        expect(response.statusCode).toBe(404)
    });
    test("read story by id", async () => {
        const response = await supertest(app).get("/posts/vdkvpwLzXNoVHNgW5Hh-Ztester2021-05-18T08:41:51.585Z1621327311585").set('Accept', 'application/json');
        expect(response.statusCode).toBe(200)
        expect(response.body.title).toBe('test story');
    });
    //-------put---------
    test("edit story", async () => {
        let request = {
            title: 'updated test story',
            story: 'updated test',

        }
        const response = await supertest(app).put("/posts/BNR2W3lBDrK-if_B7EayLtester2021-05-18T08:47:27.406Z1621327647406").send(request).set('Cookie', ['Authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJ0ZXN0ZXIiLCJpYXQiOjE2MjEzMTcxMjMsImV4cCI6MTYyMTMzNTEyM30.HXKVbJF8-QLlvY7IxxKY_CEh9KaGAXwmxnnHNKoOpYI']);
        expect(response.statusCode).toBe(200)
        expect(response.body.message).toBe('Updated');
    });
    test("edit story fail", async () => {
        let request = {
            title: 'fail test story',
            story: 'fail test',

        }
        const response = await supertest(app).put("/posts/BNR2W3lBDrK-if_B7EayLtester2021-05-18T08:47:27.406Z1621327647406").send(request).set('Cookie', ['Authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJ0ZXN0ZXIiLCJpYXQiOjE2MjEzMTcxMjMsImV4cCI6MTYyMTMzNTEyM30.HXKVbJF8-QLlvY7IxxKY_CEh9KaGAXwmxnnHNKo']);
        expect(response.statusCode).toBe(403)
    });
    //-------delete------
    test("delete story", async () => {
        const post = await supertest(app).get("/posts").set('Accept', 'application/json');
        console.log(post.body[10].pid)
        let deletePath = "/posts/" + post.body[10].pid;
        const response = await supertest(app).delete(deletePath).set('Cookie', ['Authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJ0ZXN0ZXIiLCJpYXQiOjE2MjEzMTcxMjMsImV4cCI6MTYyMTMzNTEyM30.HXKVbJF8-QLlvY7IxxKY_CEh9KaGAXwmxnnHNKoOpYI']);
        expect(response.statusCode).toBe(200)
        expect(response.body.message).toBe('Deleted');
    });
    test("delete story fail", async () => {
        const post = await supertest(app).get("/posts").set('Accept', 'application/json');
        console.log(post.body[10].pid)
        let deletePath = "/posts/" + post.body[10].pid;
        const response = await supertest(app).delete(deletePath).set('Cookie', ['Authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJ0ZXN0ZXIiLCJpYXQiOjE2MjEzMTcxMjMsImV4cCI6MTYyMTMzNTEyM30.HXKVbJF8-QLlvY7IxxKY_CEh9KaGAXwmxnnHNKoOp']);
        expect(response.statusCode).toBe(403)

    });
    // After all tersts have finished, close the DB connection
    afterAll(async () => {
        await thisDb.sequelize.close()
    })
})