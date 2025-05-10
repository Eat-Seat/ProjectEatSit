import { client } from "../db/database.ts";

export async function createRestaurante(data: any) {
  const { nombre, direccion, ciudad, capacidad, owner_id } = data;
  console.log(data)

  if (!nombre || !owner_id) {
    return { success: false, message: "Missing required fields." };
  }

  await client.queryObject`
    INSERT INTO restaurantes (nombre, direccion, ciudad, capacidad, owner_id)
    VALUES (${nombre}, ${direccion}, ${ciudad}, ${capacidad}, ${owner_id});
  `;

  return { success: true, message: "Restaurante creado correctamente." };
}
