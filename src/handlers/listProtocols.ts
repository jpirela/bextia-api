// Generado por jor-cli · listProtocols (Listar protocolo) · query
import { validate, type FieldDescriptor } from "@jorgepirelarivas/clark";
import * as dbSchema from "../db/schema.ts";
import { db } from "../db/client.ts";

const schema: FieldDescriptor[] = [
  {
    "name": "codigo",
    "type": "text",
    "required": true
  },
  {
    "name": "nombre",
    "type": "text",
    "required": true
  },
  {
    "name": "version",
    "type": "integer",
    "required": true,
    "min": 1
  },
  {
    "name": "activo",
    "type": "boolean"
  },
  {
    "name": "definicion",
    "type": "object",
    "required": true
  },
  {
    "name": "tope_autorizado",
    "type": "money"
  }
];

interface ListProtocolsInput {
  codigo: string;
  nombre: string;
  version: number;
  activo?: boolean;
  definicion: Record<string, unknown>;
  tope_autorizado?: number;
}

export async function listProtocols(body: Record<string, unknown>) {
  const result = validate(schema, body);
  if (!result.ok) {
    return { status: 400, body: { data: null, meta: { errors: result.issues } } };
  }
  // Datos validados y tipados (Clark ya garantizó la forma).
  const input = body as unknown as ListProtocolsInput;
  // TODO(jor-cli): lógica de negocio de "Listar protocolo" (lee de `input`)
  const data: unknown = null;
  return { status: 200, body: { data, meta: {} } };
}
