import { client } from "../db/database.ts";

export async function createRestaurante(data: any) {
  const { nombre, direccion, ciudad, capacidad, owner_id } = data;
  // console.log(data)

  if (!nombre || !owner_id) {
    return { success: false, message: "Missing required fields." };
  }

  await client.queryObject`
    INSERT INTO restaurantes (nombre, direccion, ciudad, capacidad, owner_id)
    VALUES (${nombre}, ${direccion}, ${ciudad}, ${capacidad}, ${owner_id});
  `;

  return { success: true, message: "Restaurante creado correctamente." };
}
export async function deleteRestaurant(id: number) {
  const result = await client.queryObject`
    DELETE FROM restaurantes WHERE id = ${id};
  `;

  if (result.rowCount === 1) {
    return { success: true, message: "Restaurante eliminado correctamente." };
  } else {
    return { success: false, message: "No se encontró el restaurante para eliminar." };
  }
}
export async function getAllRestaurantes() {
  const result = await client.queryObject`SELECT * FROM restaurantes;`;
  return result.rows;
}
export async function deleteRestaurante(id: number) {
  const result = await client.queryObject`
    DELETE FROM restaurantes WHERE id = ${id};
  `;
  return { success: true, message: "Restaurante eliminado correctamente" };
}


