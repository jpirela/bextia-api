// Generado por jor-cli · listKbArticles (Listar artículo) · query
import { validate, type FieldDescriptor } from "@jorgepirelarivas/clark";
import * as dbSchema from "../db/schema.ts";
import { db } from "../db/client.ts";

const schema: FieldDescriptor[] = [
  {
    "name": "titulo",
    "type": "text",
    "required": true
  },
  {
    "name": "contenido",
    "type": "longtext",
    "required": true
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
    "name": "etiquetas",
    "type": "array"
  }
];

interface ListKbArticlesInput {
  titulo: string;
  contenido: string;
  idioma?: "es" | "en" | "pt" | "fr" | "it" | "de";
  etiquetas?: unknown[];
}

export async function listKbArticles(body: Record<string, unknown>) {
  const result = validate(schema, body);
  if (!result.ok) {
    return { status: 400, body: { data: null, meta: { errors: result.issues } } };
  }
  // Datos validados y tipados (Clark ya garantizó la forma).
  const input = body as unknown as ListKbArticlesInput;
  // TODO(jor-cli): lógica de negocio de "Listar artículo" (lee de `input`)
  const data: unknown = null;
  return { status: 200, body: { data, meta: {} } };
}
