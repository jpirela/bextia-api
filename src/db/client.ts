// Generado por jor-cli — cliente Postgres (Drizzle).
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "../lib/env.ts";
import * as schema from "./schema.ts";

const sql = postgres(env.databaseUrl);
export const db = drizzle(sql, { schema });
