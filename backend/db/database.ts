import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";


export const client = new Client({
  user: "postgres",
  password: "postgres",
  database: "INSO_Database",
  hostname: "localhost",
  port: 5432,
});

await client.connect();
