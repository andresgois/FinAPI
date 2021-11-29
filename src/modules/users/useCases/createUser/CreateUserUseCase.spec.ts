import request from "supertest";
import { v4 as uuidV4 } from "uuid";
import { Connection, createConnection } from "typeorm";
import { app } from "../../../../app";

let connection: Connection;

describe("Create user", () => {

  beforeAll( async () => {
    connection = await createConnection();
    await connection.runMigrations();

    //const id = uuidV4();
    console.log(connection)

  });

  it("Should be create a new user", async () => {

    const response = await request(app).post("/api/v1/users").send({
      id: uuidV4(),
      name: "teste 1",
      email: "teste@email.com",
      password: "123456"
    });

    console.log(response)
    expect(response.status).toBe(201);

  });

  /*it("Should be create a new user", async () => {
    const user = await createUserUseCase.execute({
      name: "teste 1",
      email: "teste@email.com",
      password: "123456",
    });

    expect(user).toBe(0)
  });*/

})
