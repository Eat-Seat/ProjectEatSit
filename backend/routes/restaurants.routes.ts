import { createRestaurante } from "../controllers/restaurants.controller.ts";

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
  }

  return new Response("Not Found", { status: 404 });
}
