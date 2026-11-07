// Generado por jor-cli · createSalesAgent (Crear comercial) · mutation
import { validate, type FieldDescriptor } from "@jorgepirelarivas/clark";
import * as dbSchema from "../db/schema.ts";
import { db } from "../db/client.ts";

const schema: FieldDescriptor[] = [
  {
    "name": "nombre",
    "type": "text",
    "required": true
  },
  {
    "name": "email",
    "type": "email",
    "required": true
  },
  {
    "name": "destinos",
    "type": "array"
  },
  {
    "name": "idiomas",
    "type": "array"
  },
  {
    "name": "mercados",
    "type": "array"
  },
  {
    "name": "zona_horaria",
    "type": "text"
  },
  {
    "name": "activo",
    "type": "boolean"
  }
];

interface CreateSalesAgentInput {
  nombre: string;
  email: string;
  destinos?: unknown[];
  idiomas?: unknown[];
  mercados?: unknown[];
  zona_horaria?: string;
  activo?: boolean;
}

export async function createSalesAgent(body: Record<string, unknown>) {
  const result = validate(schema, body);
  if (!result.ok) {
    return { status: 400, body: { data: null, meta: { errors: result.issues } } };
  }
  // Datos validados y tipados (Clark ya garantizó la forma).
  const input = body as unknown as CreateSalesAgentInput;
  // TODO(jor-cli): lógica de negocio de "Crear comercial" (lee de `input`)
  const data: unknown = null;
  return { status: 200, body: { data, meta: {} } };
}
