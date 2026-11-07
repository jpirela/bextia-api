// Generado por jor-cli · listContacts (Listar contacto) · query
import { validate, type FieldDescriptor } from "@jorgepirelarivas/clark";
import * as dbSchema from "../db/schema.ts";
import { db } from "../db/client.ts";

const schema: FieldDescriptor[] = [
  {
    "name": "nombre",
    "type": "text"
  },
  {
    "name": "telefono",
    "type": "text",
    "pattern": "^\\+?[0-9]{7,15}$"
  },
  {
    "name": "email",
    "type": "email"
  },
  {
    "name": "idioma",
    "type": "enum",
    "enum": [
      "es",
      "en",
      "pt",
      "fr",
      "it",
      "de"
    ]
  },
  {
    "name": "mercado",
    "type": "text"
  },
  {
    "name": "canal_preferido",
    "type": "enum",
    "enum": [
      "whatsapp",
      "email",
      "web",
      "form",
      "sim"
    ]
  }
];

interface ListContactsInput {
  nombre?: string;
  telefono?: string;
  email?: string;
  idioma?: "es" | "en" | "pt" | "fr" | "it" | "de";
  mercado?: string;
  canal_preferido?: "whatsapp" | "email" | "web" | "form" | "sim";
}

export async function listContacts(body: Record<string, unknown>) {
  const result = validate(schema, body);
  if (!result.ok) {
    return { status: 400, body: { data: null, meta: { errors: result.issues } } };
  }
  // Datos validados y tipados (Clark ya garantizó la forma).
  const input = body as unknown as ListContactsInput;
  // TODO(jor-cli): lógica de negocio de "Listar contacto" (lee de `input`)
  const data: unknown = null;
  return { status: 200, body: { data, meta: {} } };
}
