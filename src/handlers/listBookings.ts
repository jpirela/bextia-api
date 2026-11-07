// Generado por jor-cli · listBookings (Listar reserva) · query
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
    "name": "contact_id",
    "type": "uuid"
  },
  {
    "name": "viajero_nombre",
    "type": "text",
    "required": true
  },
  {
    "name": "viajero_telefono",
    "type": "text",
    "pattern": "^+?[0-9]{7,15}$"
  },
  {
    "name": "viajero_email",
    "type": "email"
  },
  {
    "name": "destino",
    "type": "text",
    "required": true
  },
  {
    "name": "inicio",
    "type": "datetime",
    "required": true
  },
  {
    "name": "fin",
    "type": "datetime",
    "required": true
  },
  {
    "name": "servicios",
    "type": "array"
  }
];

interface ListBookingsInput {
  codigo: string;
  contact_id?: string;
  viajero_nombre: string;
  viajero_telefono?: string;
  viajero_email?: string;
  destino: string;
  inicio: string;
  fin: string;
  servicios?: unknown[];
}

export async function listBookings(body: Record<string, unknown>) {
  const result = validate(schema, body);
  if (!result.ok) {
    return { status: 400, body: { data: null, meta: { errors: result.issues } } };
  }
  // Datos validados y tipados (Clark ya garantizó la forma).
  const input = body as unknown as ListBookingsInput;
  // TODO(jor-cli): lógica de negocio de "Listar reserva" (lee de `input`)
  const data: unknown = null;
  return { status: 200, body: { data, meta: {} } };
}
