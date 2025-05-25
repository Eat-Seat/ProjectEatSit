import { client } from "../db/database.ts";
import { hash, compare } from "bcrypt";


export async function getUsuarios() {
  const result = await client.queryObject("SELECT * FROM usuarios;");
  return result.rows;
}
export async function createUser(data: any) {
  const { email, password, role, firstname, lastname, telefono } = data;
  const hashedPassword = await hash(password); // 🔐 Aquí se cifra la contraseña

  await client.queryObject`
    INSERT INTO usuarios (email, password, role, firstname, lastname, telefono)
    VALUES (${email}, ${hashedPassword}, ${role}, ${firstname}, ${lastname}, ${telefono})
  `;
  return { message: "User created successfully" };
}
export async function loginUser(data: any) {
  const { email, password } = data;

  const result = await client.queryObject`
    SELECT * FROM usuarios WHERE email = ${email};
  `;

  if (result.rows.length === 1) {
    const user = result.rows[0];
    const passwordMatch = await compare(password, user.password);

    if (passwordMatch) {
      return { success: true, message: "Login successful", user };
    }
  }

  return { success: false, message: "Invalid email or password" };
}
export async function updateUser(id: number, data: any) {
  const { firstname, lastname, telefono, email, password } = data;

  const result = await client.queryObject`
    SELECT * FROM usuarios WHERE id = ${id};
  `;

  if (result.rows.length === 0) {
    return { success: false, message: "Usuario no encontrado." };
  }

  const userActual = result.rows[0];

  const nuevoFirstname = firstname || userActual.firstname;
  const nuevoLastname = lastname || userActual.lastname;
  const nuevoTelefono = telefono || userActual.telefono;
  const nuevoEmail = email || userActual.email;
  let nuevoPassword = userActual.password;
  if (password) {
    nuevoPassword = await hash(password);
  }
  await client.queryObject`
    UPDATE usuarios
    SET firstname = ${nuevoFirstname},
        lastname = ${nuevoLastname},
        telefono = ${nuevoTelefono},
        email = ${nuevoEmail},
        password = ${nuevoPassword}
    WHERE id = ${id};
  `;

  return { success: true, message: "Usuario actualizado correctamente." };
}
export async function deleteUser(id: number) {
  const result = await client.queryObject`
    DELETE FROM usuarios WHERE id = ${id};
  `;

  if (result.rowCount === 1) {
    return { success: true, message: "Usuario eliminado correctamente." };
  } else {
    return { success: false, message: "No se encontró el usuario para eliminar." };
  }
}
