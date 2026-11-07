// Generado por jor-cli · listLeads (Listar lead) · query
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
    "name": "destino",
    "type": "text"
  },
  {
    "name": "fecha_inicio",
    "type": "date"
  },
  {
    "name": "fecha_fin",
    "type": "date"
  },
  {
    "name": "viajeros",
    "type": "integer",
    "min": 1
  },
  {
    "name": "interes",
    "type": "text"
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
    "name": "score",
    "type": "integer",
    "min": 0,
    "max": 100
  },
  {
    "name": "estado",
    "type": "enum",
    "enum": [
      "nuevo",
      "respondido",
      "cualificando",
      "cualificado",
      "asignado",
      "entregado"
    ]
  },
  {
    "name": "sales_agent_id",
    "type": "uuid"
  },
  {
    "name": "resumen_ia",
    "type": "longtext"
  },
  {
    "name": "fuera_de_horario",
    "type": "boolean"
  },
  {
    "name": "mercado",
    "type": "text"
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
  }
];

interface ListLeadsInput {
  contact_id: string;
  destino?: string;
  fecha_inicio?: string;
  fecha_fin?: string;
  viajeros?: number;
  interes?: string;
  urgencia?: "baja" | "media" | "alta";
  score?: number;
  estado?: "nuevo" | "respondido" | "cualificando" | "cualificado" | "asignado" | "entregado";
  sales_agent_id?: string;
  resumen_ia?: string;
  fuera_de_horario?: boolean;
  mercado?: string;
  idioma?: "es" | "en" | "pt" | "fr" | "it" | "de";
}

export async function listLeads(body: Record<string, unknown>) {
  const result = validate(schema, body);
  if (!result.ok) {
    return { status: 400, body: { data: null, meta: { errors: result.issues } } };
  }
  // Datos validados y tipados (Clark ya garantizó la forma).
  const input = body as unknown as ListLeadsInput;
  // TODO(jor-cli): lógica de negocio de "Listar lead" (lee de `input`)
  const data: unknown = null;
  return { status: 200, body: { data, meta: {} } };
}
