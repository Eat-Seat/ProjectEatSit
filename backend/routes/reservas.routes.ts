import { createReserva } from "../controllers/reservas.controller.ts"

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
  }

  return new Response("Not Found", {
    status: 404,
    headers: { "Access-Control-Allow-Origin": "*" }
  });
}
