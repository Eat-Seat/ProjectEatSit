import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const client = new Client({
  user: Deno.env.get("DB_USER") ?? "postgres",
  password: Deno.env.get("DB_PASSWORD") ?? "postgres",
  database: Deno.env.get("DB_NAME") ?? "INSO_Database",
  hostname: Deno.env.get("DB_HOST") ?? "db",
  port: Number(Deno.env.get("DB_PORT") ?? 5432),
});

const MAX_RETRIES = 10;
const DELAY_MS = 1000;

for (let i = 0; i < MAX_RETRIES; i++) {
  try {
    await client.connect();
    console.log("✅ Conectado a la base de datos");
    break;
  } catch (error) {
    console.warn(`Intento ${i + 1} fallido: ${error.message}`);
    if (i === MAX_RETRIES - 1) throw error;
    await new Promise((res) => setTimeout(res, DELAY_MS));
  }
}

export { client };
