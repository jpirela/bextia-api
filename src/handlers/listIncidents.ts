// Generado por jor-cli · listIncidents (Listar incidencia) · query
import { validate, type FieldDescriptor } from "@jorgepirelarivas/clark";
import * as dbSchema from "../db/schema.ts";
import { db } from "../db/client.ts";

const schema: FieldDescriptor[] = [
  {
    "name": "booking_id",
    "type": "uuid",
    "required": true
  },
  {
    "name": "conversation_id",
    "type": "uuid"
  },
  {
    "name": "tipologia",
    "type": "enum",
    "enum": [
      "traslado_no_presentado",
      "consulta",
      "otra"
    ]
  },
  {
    "name": "urgencia",
    "type": "enum",
    "enum": [
      "baja",
      "media",
      "alta"
    ]
  },
  {
    "name": "estado",
    "type": "enum",
    "enum": [
      "identificando",
      "bienvenida",
      "clasificando",
      "protocolo",
      "conversacional",
      "escalado",
      "seguimiento",
      "cerrado"
    ]
  },
  {
    "name": "protocol_id",
    "type": "uuid"
  },
  {
    "name": "escalado_a",
    "type": "text"
  },
  {
    "name": "sla_vence",
    "type": "datetime"
  },
  {
    "name": "feedback",
    "type": "longtext"
  }
];

interface ListIncidentsInput {
  booking_id: string;
  conversation_id?: string;
  tipologia?: "traslado_no_presentado" | "consulta" | "otra";
  urgencia?: "baja" | "media" | "alta";
  estado?: "identificando" | "bienvenida" | "clasificando" | "protocolo" | "conversacional" | "escalado" | "seguimiento" | "cerrado";
  protocol_id?: string;
  escalado_a?: string;
  sla_vence?: string;
  feedback?: string;
}

export async function listIncidents(body: Record<string, unknown>) {
  const result = validate(schema, body);
  if (!result.ok) {
    return { status: 400, body: { data: null, meta: { errors: result.issues } } };
  }
  // Datos validados y tipados (Clark ya garantizó la forma).
  const input = body as unknown as ListIncidentsInput;
  // TODO(jor-cli): lógica de negocio de "Listar incidencia" (lee de `input`)
  const data: unknown = null;
  return { status: 200, body: { data, meta: {} } };
}
