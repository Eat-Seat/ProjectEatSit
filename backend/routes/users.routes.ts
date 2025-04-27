import { getUsuarios } from "../controllers/users.controller.ts";

export async function usuariosRouter(request: Request) {
  if (request.method === "GET" && new URL(request.url).pathname === "/usuarios") {
    const usuarios = await getUsuarios();
    return new Response(JSON.stringify(usuarios), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  } else {
    return new Response("Not Found", { status: 404 });
  }
}
