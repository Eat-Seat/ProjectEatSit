import { client } from "../db/database.ts";

export async function createReserva(data: any) {
  const { restaurante_id, nombre, apellidos, telefono, personas, fecha, hora, user_id} = data;

  if (!restaurante_id || !nombre || !apellidos || !fecha || !personas || !hora || !user_id) {
    return { success: false, message: "Faltan campos obligatorios" };
  }

  await client.queryObject`
    INSERT INTO reservas (restaurante_id, nombre, apellidos, telefono, personas, fecha, hora , user_id)
    VALUES (${restaurante_id}, ${nombre}, ${apellidos}, ${telefono}, ${personas}, ${fecha}, ${hora}, ${user_id});
  `;

  return { success: true, message: "Reserva guardada correctamente" };
}
export async function getReservasByUsuario(userId: number) {
  const result = await client.queryObject`
    SELECT 
      r.id AS reserva_id,
      r.user_id,
      r.nombre,
      r.apellidos,
      r.fecha,
      r.hora,
      r.personas,
      r.telefono,
      r.restaurante_id,
      res.nombre AS restaurante_nombre,
      res.direccion,
      res.ciudad,
      res.capacidad
    FROM reservas r
    JOIN restaurantes res ON r.restaurante_id = res.id
    WHERE r.user_id = ${userId}
    ORDER BY r.fecha ASC, r.hora ASC;
  `;
  return result.rows;
}




export async function deleteReserva(id: number) {
  const result = await client.queryObject`
    DELETE FROM reservas WHERE id = ${id};
  `;
  return { success: true, message: "Reserva eliminada correctamente." };
}
export async function updateReserva(id: number, data: any) {
  const { nombre, apellidos, telefono, personas, fecha, hora } = data;

  const result = await client.queryObject`
    SELECT * FROM reservas WHERE id = ${id};
  `;

  if (result.rows.length === 0) {
    return { success: false, message: "Reserva no encontrada." };
  }

  const actual = result.rows[0];

  const nuevoNombre = nombre || actual.nombre;
  const nuevosApellidos = apellidos || actual.apellidos;
  const nuevoTelefono = telefono || actual.telefono;
  const nuevasPersonas = personas ?? actual.personas;
  const nuevaFecha = fecha || actual.fecha;
  const nuevaHora = hora || actual.hora;

  await client.queryObject`
    UPDATE reservas
    SET nombre = ${nuevoNombre},
        apellidos = ${nuevosApellidos},
        telefono = ${nuevoTelefono},
        personas = ${nuevasPersonas},
        fecha = ${nuevaFecha},
        hora = ${nuevaHora}
    WHERE id = ${id};
  `;

  return { success: true, message: "Reserva actualizada correctamente." };
}
