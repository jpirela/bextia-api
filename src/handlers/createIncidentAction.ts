// Generado por jor-cli · createIncidentAction (Crear acción) · mutation
import { validate, type FieldDescriptor } from "@jorgepirelarivas/clark";
import * as dbSchema from "../db/schema.ts";
import { db } from "../db/client.ts";

const schema: FieldDescriptor[] = [
  {
    "name": "incident_id",
    "type": "uuid",
    "required": true
  },
  {
    "name": "tipo",
    "type": "enum",
    "enum": [
      "mensaje_viajero",
      "mensaje_proveedor",
      "espera",
      "decision",
      "autorizacion",
      "escalado",
      "resultado"
    ],
    "required": true
  },
  {
    "name": "detalle",
    "type": "object"
  },
  {
    "name": "monto",
    "type": "money"
  }
];

interface CreateIncidentActionInput {
  incident_id: string;
  tipo: "mensaje_viajero" | "mensaje_proveedor" | "espera" | "decision" | "autorizacion" | "escalado" | "resultado";
  detalle?: Record<string, unknown>;
  monto?: number;
}

export async function createIncidentAction(body: Record<string, unknown>) {
  const result = validate(schema, body);
  if (!result.ok) {
    return { status: 400, body: { data: null, meta: { errors: result.issues } } };
  }
  // Datos validados y tipados (Clark ya garantizó la forma).
  const input = body as unknown as CreateIncidentActionInput;
  // TODO(jor-cli): lógica de negocio de "Crear acción" (lee de `input`)
  const data: unknown = null;
  return { status: 200, body: { data, meta: {} } };
}
