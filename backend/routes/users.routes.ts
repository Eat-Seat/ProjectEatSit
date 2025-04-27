import { createUser, loginUser } from "../controllers/users.controller.ts";

export async function usersRouter(request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (request.method === "POST" && pathname === "/users") {
    const body = await request.json();
    const result = await createUser(body);
    return new Response(JSON.stringify(result), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } else if (request.method === "POST" && pathname === "/login") {
    const body = await request.json();
    const result = await loginUser(body);
    return new Response(JSON.stringify(result), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } else if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } else {
    return new Response("Method Not Allowed", { status: 405 });
  }
}
