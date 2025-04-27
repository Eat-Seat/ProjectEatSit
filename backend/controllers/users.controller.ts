import { client } from "../db/database.ts";

export async function getUsuarios() {
  const result = await client.queryObject("SELECT * FROM usuarios;");
  return result.rows;
}
