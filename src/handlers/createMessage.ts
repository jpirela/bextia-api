// Generado por jor-cli · createMessage (Crear mensaje) · mutation
import { validate, type FieldDescriptor } from "@jorgepirelarivas/clark";
import * as dbSchema from "../db/schema.ts";
import { db } from "../db/client.ts";

const schema: FieldDescriptor[] = [
  {
    "name": "conversation_id",
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
    "name": "direccion",
    "type": "enum",
    "enum": [
      "in",
      "out"
    ],
    "required": true
  },
  {
    "name": "contenido",
    "type": "longtext",
    "required": true
  },
  {
    "name": "external_id",
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
  }
];

interface CreateMessageInput {
  conversation_id: string;
  canal: "whatsapp" | "email" | "web" | "form" | "sim";
  direccion: "in" | "out";
  contenido: string;
  external_id: string;
  agente?: "leads" | "incidents";
}

export async function createMessage(body: Record<string, unknown>) {
  const result = validate(schema, body);
  if (!result.ok) {
    return { status: 400, body: { data: null, meta: { errors: result.issues } } };
  }
  // Datos validados y tipados (Clark ya garantizó la forma).
  const input = body as unknown as CreateMessageInput;
  // TODO(jor-cli): lógica de negocio de "Crear mensaje" (lee de `input`)
  const data: unknown = null;
  return { status: 200, body: { data, meta: {} } };
}
