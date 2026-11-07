// Generado por jor-cli · createConversation (Crear conversación) · mutation
import { validate, type FieldDescriptor } from "@jorgepirelarivas/clark";
import * as dbSchema from "../db/schema.ts";
import { db } from "../db/client.ts";

const schema: FieldDescriptor[] = [
  {
    "name": "contact_id",
    "type": "uuid",
    "required": true
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
    ],
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
    "name": "estado",
    "type": "enum",
    "enum": [
      "abierta",
      "cerrada"
    ]
  }
];

interface CreateConversationInput {
  contact_id: string;
  canal: "whatsapp" | "email" | "web" | "form" | "sim";
  agente?: "leads" | "incidents";
  estado?: "abierta" | "cerrada";
}

export async function createConversation(body: Record<string, unknown>) {
  const result = validate(schema, body);
  if (!result.ok) {
    return { status: 400, body: { data: null, meta: { errors: result.issues } } };
  }
  // Datos validados y tipados (Clark ya garantizó la forma).
  const input = body as unknown as CreateConversationInput;
  // TODO(jor-cli): lógica de negocio de "Crear conversación" (lee de `input`)
  const data: unknown = null;
  return { status: 200, body: { data, meta: {} } };
}
