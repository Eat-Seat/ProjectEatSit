import { getUsuarios, createUser } from "../controllers/users.controller.ts";

export async function usersRouter(request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (request.method === "GET" && pathname === "/users") {
    const usuarios = await getUsuarios();
    return new Response(JSON.stringify(usuarios), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } else if (request.method === "POST" && pathname === "/users") {
    const body = await request.json();
    const result = await createUser(body);
    return new Response(JSON.stringify(result), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } else {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}
