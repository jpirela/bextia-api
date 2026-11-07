// Generado por jor-cli — el entorno, validado al arrancar.

/** Lanza si la variable no está: mejor no arrancar que arrancar a medias. */
function required(name: string): string {
  const v = process.env[name];
  if (v === undefined || v === "") throw new Error(`Falta la variable de entorno: ${name}`);
  return v;
}

const nodeEnv = process.env.NODE_ENV ?? "development";

function parseOrigins(raw: string): string[] {
  return raw.split(",").map((o) => o.trim()).filter((o) => o !== "");
}

/**
 * Los orígenes autorizados para CORS, por ambiente.
 *
 * En producción son OBLIGATORIOS: el generador no puede saber el dominio
 * del frontend, y un default permisivo es peor que un arranque fallido.
 * En desarrollo caen a los puertos de Vite.
 */
function allowedOrigins(): string[] {
  if (nodeEnv === "development") {
    const raw = process.env.CORS_ORIGINS;
    return raw === undefined || raw === ""
      ? ["http://localhost:5173", "http://localhost:5174"]
      : parseOrigins(raw);
  }
  return parseOrigins(required("CORS_ORIGINS"));
}

export const env = {
  // El PaaS asigna el puerto; 3000 es solo el default local.
  port: Number(process.env.PORT ?? 3000),
  nodeEnv,
  allowedOrigins: allowedOrigins(),
  databaseUrl: required("DATABASE_URL"),
};
