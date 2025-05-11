import { createReserva, deleteReserva, updateReserva, getReservasByUsuario } from "../controllers/reservas.controller.ts"

export async function reservasRouter(request: Request) {
  const url = new URL(request.url);
  const pathname = decodeURIComponent(url.pathname).replace(/\/$/, "").trim();
  

  if (request.method === "POST" && pathname === "/reservas") {
    const body = await request.json();
    const result = await createReserva(body);
    return new Response(JSON.stringify(result), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }else if (request.method === "DELETE" && /^\/reservas\/\d+$/.test(pathname)) {
    const id = parseInt(pathname.split("/")[2]);
    const result = await deleteReserva(id);
    return new Response(JSON.stringify(result), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } else if (request.method === "PUT" && /^\/reservas\/\d+$/.test(pathname)) {
    const id = parseInt(pathname.split("/")[2]);
    const body = await request.json();
    const result = await updateReserva(id, body);
    return new Response(JSON.stringify(result), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } else if (request.method === "GET" && pathname === "/reservas") {
  const userId = url.searchParams.get("user_id");

  if (userId) {
    const result = await getReservasByUsuario(parseInt(userId));
    return new Response(JSON.stringify(result), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } else {
    return new Response(JSON.stringify({ success: false, message: "Parámetro user_id requerido" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }}else {
    return new Response("Not Found", {
      status: 404,
      headers: { "Access-Control-Allow-Origin": "*" }
    });
  }
  }
