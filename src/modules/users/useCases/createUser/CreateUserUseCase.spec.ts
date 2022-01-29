import request from "supertest";
import { v4 as uuidV4 } from "uuid";
import { Connection, createConnection } from "typeorm";
import { app } from "../../../../app";

let connection: Connection;

describe("Create user", () => {

  beforeAll( async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll( async () => {
    await connection.dropDatabase();
    await connection.close();
  })

  it("Should be create a new user", async () => {

    const response = await request(app).post("/api/v1/users").send({
      id: uuidV4(),
      name: "teste 1",
      email: "teste@email.com",
      password: "123456"
    });

    expect(response.status).toBe(201);
  });

  it("Should have a token property in the response", async () => {

    const response = await request(app).post("/api/v1/sessions").send({
      email: "teste@email.com",
      password: "123456"
    });

    expect(response.body).toHaveProperty("token");
  });

  it("Should be able show profile of user", async () => {
    const responseToken = await request(app).post("/api/v1/sessions").send({
      email: "teste@email.com",
      password: "123456"
    });
    const { token } = responseToken.body;

    const response = await request(app).get("/api/v1/profile")
            .send()
            .set({
              Authorization: `Bearer ${token}`
            });
    expect(response.body).toMatchObject({email: "teste@email.com"});
  });

})
