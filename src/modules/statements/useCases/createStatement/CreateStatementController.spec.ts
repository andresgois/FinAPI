import request from "supertest";
import { v4 as uuidV4 } from "uuid";
import { Connection, createConnection, SimpleConsoleLogger } from "typeorm";
import { app } from "../../../../app";

let connection: Connection;

describe("User income and expenses ", () => {

  beforeAll( async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll( async () => {
    await connection.dropDatabase();
    await connection.close();
  })

  it("Should be able deposit at the account of user", async () => {

    await request(app).post("/api/v1/users").send({
      id: uuidV4(),
      name: "Andre",
      email: "andre@email.com",
      password: "123456"
    });

    const responseToken = await request(app).post("/api/v1/sessions").send({
      email: "andre@email.com",
      password: "123456"
    });

    const { token } = responseToken.body;

    const response = await request(app).post("/api/v1/statements/deposit")
            .send({
              amount: 200.00,
              description: "Salário"
            })
            .set({
              Authorization: `Bearer ${token}`
            });

    //console.log(response.body)
    expect(response.status).toBe(201)
    expect(response.body.type).toBe("deposit")
  });

  it("Should be able withdraw at the account of user", async () => {

    const responseToken = await request(app).post("/api/v1/sessions").send({
      email: "andre@email.com",
      password: "123456"
    });

    const { token } = responseToken.body;

    const response = await request(app).post("/api/v1/statements/withdraw")
            .send({
              amount: 75.00,
              description: "Boleto"
            })
            .set({
              Authorization: `Bearer ${token}`
            });

    //console.log(response.body)
    expect(response.status).toBe(201)
    expect(response.body.type).toBe("withdraw")
  });

  it("Should be able withdraw at the account of user", async () => {

    const responseToken = await request(app).post("/api/v1/sessions").send({
      email: "andre@email.com",
      password: "123456"
    });

    const { token } = responseToken.body;

    const balance = await request(app).get("/api/v1/statements/balance")
            .send()
            .set({
              Authorization: `Bearer ${token}`
            });
    const statement_id = balance.body.statement[0].id

    const response = await request(app).get(`/api/v1/statements/${statement_id}`)
            .send()
            .set({
              Authorization: `Bearer ${token}`
            });

    expect(response.status).toBe(200)
    expect(balance.body.statement[0].type).toBe("deposit")
  });

})
