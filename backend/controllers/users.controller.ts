import { client } from "../db/database.ts";

export async function getUsuarios() {
  const result = await client.queryObject("SELECT * FROM usuarios;");
  return result.rows;
}
export async function createUser(data: any) {
  const { email, password, role, firstname, lastname, telefono } = data;
  console.log(data)
  await client.queryObject`
    INSERT INTO usuarios (email, password, role, firstname, lastname, telefono)
    VALUES (${email}, ${password}, ${role}, ${firstname}, ${lastname}, ${telefono})
  `;
  return { message: "User created successfully" };
}
