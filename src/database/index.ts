/*import { createConnection, Connection } from 'typeorm';

(async () => await createConnection({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "docker",
  database: "fin_api"
}))();*/

import { Connection, createConnection, getConnectionOptions } from 'typeorm';
/*

export default async (host="localhost"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host,
      database: "fin_api",
    })
  );
};*/

createConnection();
