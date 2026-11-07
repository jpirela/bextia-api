// Generado por jor-cli · createBusinessHours (Crear horario) · mutation
import { validate, type FieldDescriptor } from "@jorgepirelarivas/clark";
import * as dbSchema from "../db/schema.ts";
import { db } from "../db/client.ts";

const schema: FieldDescriptor[] = [
  {
    "name": "mercado",
    "type": "text",
    "required": true
  },
  {
    "name": "zona_horaria",
    "type": "text",
    "required": true
  },
  {
    "name": "horario",
    "type": "object",
    "required": true
  },
  {
    "name": "festivos",
    "type": "array"
  }
];

interface CreateBusinessHoursInput {
  mercado: string;
  zona_horaria: string;
  horario: Record<string, unknown>;
  festivos?: unknown[];
}

export async function createBusinessHours(body: Record<string, unknown>) {
  const result = validate(schema, body);
  if (!result.ok) {
    return { status: 400, body: { data: null, meta: { errors: result.issues } } };
  }
  // Datos validados y tipados (Clark ya garantizó la forma).
  const input = body as unknown as CreateBusinessHoursInput;
  // TODO(jor-cli): lógica de negocio de "Crear horario" (lee de `input`)
  const data: unknown = null;
  return { status: 200, body: { data, meta: {} } };
}
