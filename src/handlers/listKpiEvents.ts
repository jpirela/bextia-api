// Generado por jor-cli · listKpiEvents (Listar evento KPI) · query
import { validate, type FieldDescriptor } from "@jorgepirelarivas/clark";
import * as dbSchema from "../db/schema.ts";
import { db } from "../db/client.ts";

const schema: FieldDescriptor[] = [
  {
    "name": "tipo",
    "type": "text",
    "required": true
  },
  {
    "name": "agente",
    "type": "enum",
    "enum": [
      "leads",
      "incidents"
    ]
  },
  {
    "name": "canal",
    "type": "enum",
    "enum": [
      "whatsapp",
      "email",
      "web",
      "form",
      "sim"
    ]
  },
  {
    "name": "valor",
    "type": "number"
  },
  {
    "name": "ref_id",
    "type": "uuid"
  },
  {
    "name": "datos",
    "type": "object"
  }
];

interface ListKpiEventsInput {
  tipo: string;
  agente?: "leads" | "incidents";
  canal?: "whatsapp" | "email" | "web" | "form" | "sim";
  valor?: number;
  ref_id?: string;
  datos?: Record<string, unknown>;
}

export async function listKpiEvents(body: Record<string, unknown>) {
  const result = validate(schema, body);
  if (!result.ok) {
    return { status: 400, body: { data: null, meta: { errors: result.issues } } };
  }
  // Datos validados y tipados (Clark ya garantizó la forma).
  const input = body as unknown as ListKpiEventsInput;
  // TODO(jor-cli): lógica de negocio de "Listar evento KPI" (lee de `input`)
  const data: unknown = null;
  return { status: 200, body: { data, meta: {} } };
}
