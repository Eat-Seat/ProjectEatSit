import { reservasRouter } from "./routes/reservas.routes.ts";
import { restaurantesRouter } from "./routes/restaurants.routes.ts";
import { usersRouter } from "./routes/users.routes.ts";

console.log("Server running at http://localhost:3000");

Deno.serve({ hostname: "0.0.0.0", port: 8080 }, async (request: Request) => {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (pathname.startsWith("/users")) {
    return await usersRouter(request);
  } else if (pathname === "/login") {
    return await usersRouter(request);
  } else if (pathname.startsWith("/restaurants")) {
    return await restaurantesRouter(request);
  } else if (pathname.startsWith("/reservas")) {
    return await reservasRouter(request);
  } else {
  return await serveStaticFile(pathname);
  }
});

const frontendPath = "/app/frontend/dist/frontend/browser";


function getContentType(path: string): string {
  if (path.endsWith(".js")) return "application/javascript";
  if (path.endsWith(".css")) return "text/css";
  if (path.endsWith(".html")) return "text/html";
  if (path.endsWith(".png")) return "image/png";
  if (path.endsWith(".jpg") || path.endsWith(".jpeg")) return "image/jpeg";
  if (path.endsWith(".svg")) return "image/svg+xml";
  return "application/octet-stream";
}

async function serveStaticFile(pathname: string): Promise<Response> {
  const filePath = pathname === "/" ? "/index.html" : pathname;
  const fullPath = frontendPath + filePath;

  try {
    const file = await Deno.readFile(fullPath);
    const contentType = getContentType(filePath);
    return new Response(file, {
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch {
    // Para rutas Angular como /dashboard, /misreservas...
    const fallbackFile = frontendPath + "/index.html";
    try {
      const file = await Deno.readFile(fallbackFile);
      return new Response(file, {
        headers: {
          "Content-Type": "text/html",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch {
      return new Response("Not Found", { status: 404 });
    }
  }
}


