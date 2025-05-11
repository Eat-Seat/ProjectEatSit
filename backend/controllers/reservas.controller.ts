import { client } from "../db/database.ts";

export async function createReserva(data: any) {
  const { restaurante_id, nombre, apellidos, telefono, personas, fecha, hora } = data;

  if (!restaurante_id || !nombre || !apellidos || !fecha || !personas || !hora) {
    return { success: false, message: "Faltan campos obligatorios" };
  }

  await client.queryObject`
    INSERT INTO reservas (restaurante_id, nombre, apellidos, telefono, personas, fecha, hora)
    VALUES (${restaurante_id}, ${nombre}, ${apellidos}, ${telefono}, ${personas}, ${fecha}, ${hora});
  `;

  return { success: true, message: "Reserva guardada correctamente" };
}
