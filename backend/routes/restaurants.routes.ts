import { createRestaurante, deleteRestaurante, getAllRestaurantes } from "../controllers/restaurants.controller.ts";

export async function restaurantesRouter(request: Request) {
  const url = new URL(request.url);
  const pathname = decodeURIComponent(url.pathname).replace(/\/$/, "").trim();

  if (request.method === "POST" && pathname === "/restaurants") {
    const body = await request.json();
    const result = await createRestaurante(body);
    return new Response(JSON.stringify(result), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } else if (request.method === "GET" && pathname === "/restaurants") {
    const result = await getAllRestaurantes();
    return new Response(JSON.stringify(result), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } else if (request.method === "DELETE" && /^\/restaurants\/\d+$/.test(pathname)) {
    const id = parseInt(pathname.split("/")[2]);
    const result = await deleteRestaurante(id);
    return new Response(JSON.stringify(result), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }

  return new Response("Not Found", { status: 404 });
}
