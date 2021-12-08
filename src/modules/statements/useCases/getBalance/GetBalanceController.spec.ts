import request from "supertest";
import { v4 as uuidV4 } from "uuid";
import { Connection, createConnection } from "typeorm";
import { app } from "../../../../app";

let connection: Connection;

describe("Show Balance", () => {

  beforeAll( async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll( async () => {
    await connection.dropDatabase();
    await connection.close();
  })

  it("Should show balance of user", async () => {

    await request(app).post("/api/v1/users").send({
      id: uuidV4(),
      name: "teste 1",
      email: "teste@email.com",
      password: "123456"
    });

    const responseToken = await request(app).post("/api/v1/sessions").send({
      email: "teste@email.com",
      password: "123456"
    });

    const { token } = responseToken.body;
    const response = await request(app).get("/api/v1/statements/balance")
            .send()
            .set({
              Authorization: `Bearer ${token}`
            });

    expect(response.body).toHaveProperty("balance");
  });

})
