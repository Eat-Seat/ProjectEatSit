import { usuariosRouter } from "./routes/users.routes.ts";

console.log("Servidor listening in http://localhost:3000");

Deno.serve({ port: 3000 }, async (request: Request) => {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (request.method === "GET" && pathname === "/usuarios") {
    return await usuariosRouter(request);
  } else {
    return new Response("Not Found", { status: 404 });
  }
});
