
import { createUser, deleteUser, loginUser, updateUser } from "../controllers/users.controller.ts";

export async function usersRouter(request: Request) {
  //console.log("entro1")
  const url = new URL(request.url);
  // const pathname = url.pathname;
  const pathname = decodeURIComponent(url.pathname).replace(/\/$/, "").trim();

  
  // console.log("Request method:", request);
  // console.log("Request pathname:", pathname);

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
  } else if (request.method === "PUT" && /^\/users\/\d+$/.test(pathname)) {
    // console.log("Entro")
    const id = parseInt(pathname.split("/")[2]);
    const body = await request.json();
    const result = await updateUser(id, body);
    return new Response(JSON.stringify(result), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } else if (request.method === "DELETE" && /^\/users\/\d+$/.test(pathname)) {
    const id = parseInt(pathname.split("/")[2]);
    const result = await deleteUser(id);
    return new Response(JSON.stringify(result), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }else if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: { 
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }else {
    return new Response("Method Not Allowed", { status: 405 });
  }
}
