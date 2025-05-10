import { restaurantesRouter } from "./routes/restaurants.routes.ts";
import { usersRouter } from "./routes/users.routes.ts";


console.log("Server running at http://localhost:3000");

Deno.serve({ port: 3000 }, async (request: Request) => {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST,PUT,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (pathname.startsWith("/users")==true) {
    return await usersRouter(request);
  }else if (pathname === "/login") {
      return await usersRouter(request);
  }else if(pathname=="/restaurants"){
    return await restaurantesRouter(request);
  } else {
    return new Response("Not Found", {
      status: 404,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
});
