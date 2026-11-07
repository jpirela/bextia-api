// Generado por jor-cli — el servidor.
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import { env } from "./lib/env.ts";
import { routes } from "./router.ts";

const app = new Hono();

// Lista explícita por ambiente: lo que no está, se rechaza.
app.use("*", cors({ origin: env.allowedOrigins, credentials: true }));

// `invoice.create` → POST /api/invoice/create
for (const [id, handler] of Object.entries(routes)) {
  app.post(`/api/${id.replaceAll(".", "/")}`, async (c) => {
    // Un cuerpo ilegible es un 400 del validador, no un 500 del servidor.
    const body = await c.req.json().catch(() => ({}));
    const result = await handler(body as Record<string, unknown>);
    return new Response(JSON.stringify(result.body), {
      status: result.status,
      headers: { "content-type": "application/json" },
    });
  });
}

app.get("/", (c) => c.text("Bienvenido"));
app.get("/api/health", (c) => c.json({ ok: true, env: env.nodeEnv }));

console.log(`API escuchando en el puerto ${env.port}`);
serve({ fetch: app.fetch, port: env.port });
