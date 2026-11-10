// Mantenido a mano (jor-cli build lo conserva). Columnas = campos de contract/resources.mjs + auditoría.
import { sql } from "drizzle-orm";
import {
  boolean, date, doublePrecision, index, integer, jsonb, numeric, pgTable, text, timestamp, unique, uniqueIndex, uuid, vector,
} from "drizzle-orm/pg-core";

export type Channel = "whatsapp" | "email" | "web" | "form" | "sim";
export type AgentName = "leads" | "incidents";
export type Weekday = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
export type WeeklyHours = Partial<Record<Weekday, Array<[string, string]>>>;
export type Urgency = "baja" | "media" | "alta";
export type Lang = "es" | "en" | "pt" | "fr" | "it" | "de";
export type LeadState = "nuevo" | "respondido" | "cualificando" | "cualificado" | "asignado" | "entregado";
export type LeadType = "vacacional" | "luna_de_miel" | "grupo" | "corporativo" | "otro";
export type IncidentState =
  | "identificando" | "bienvenida" | "clasificando" | "protocolo" | "conversacional" | "escalado" | "seguimiento" | "cerrado";
export type IncidentType = "traslado_no_presentado" | "consulta" | "emergencia" | "otra";
export type IncidentUrgency = "baja" | "media" | "alta" | "critica";
export type IncidentActionType =
  | "identificacion" | "mensaje_viajero" | "mensaje_proveedor" | "espera" | "decision" | "autorizacion" | "escalado" | "resultado" | "feedback";
export interface BookingService {
  tipo: "traslado" | "hotel" | "vuelo" | "otro";
  proveedor: string;
  telefono?: string;
  email?: string;
  inicio?: string; // ISO 8601
  lugar?: string;
  referencia?: string;
}
// Estado del intérprete de protocolos (src/protocols/engine.ts). espera_hasta en ISO 8601.
export interface ProtocolState {
  paso: string;
  espera_hasta: string | null;
  eta_min: number | null;
  autorizado: number | null;
  terminado: boolean;
}

const id = () => uuid("id").primaryKey().defaultRandom();
const createdAt = () => timestamp("created_at", { withTimezone: true }).notNull().defaultNow();

export const contact = pgTable("contact", {
  id: id(),
  nombre: text("nombre"),
  telefono: text("telefono").unique(),
  email: text("email").unique(),
  idioma: text("idioma"),
  mercado: text("mercado"),
  canal_preferido: text("canal_preferido").$type<Channel>(),
  created_at: createdAt(),
});

export const conversation = pgTable("conversation", {
  id: id(),
  contact_id: uuid("contact_id").notNull().references(() => contact.id),
  canal: text("canal").$type<Channel>().notNull(),
  agente: text("agente").$type<AgentName>(),
  estado: text("estado").$type<"abierta" | "cerrada">().notNull().default("abierta"),
  created_at: createdAt(),
}, (t) => [
  uniqueIndex("conversation_abierta_unica").on(t.contact_id, t.canal).where(sql`estado = 'abierta'`),
]);

export const message = pgTable("message", {
  id: id(),
  conversation_id: uuid("conversation_id").notNull().references(() => conversation.id),
  canal: text("canal").$type<Channel>().notNull(),
  direccion: text("direccion").$type<"in" | "out">().notNull(),
  contenido: text("contenido").notNull(),
  external_id: text("external_id").notNull(),
  agente: text("agente").$type<AgentName>(),
  created_at: createdAt(),
}, (t) => [unique("message_canal_external_id").on(t.canal, t.external_id)]);

export const sales_agent = pgTable("sales_agent", {
  id: id(),
  nombre: text("nombre").notNull(),
  email: text("email").notNull().unique(),
  destinos: text("destinos").array().notNull().default([]),
  idiomas: text("idiomas").array().notNull().default([]),
  mercados: text("mercados").array().notNull().default([]),
  tipos_lead: text("tipos_lead").array().notNull().default([]),
  zona_horaria: text("zona_horaria"),
  activo: boolean("activo").notNull().default(true),
  created_at: createdAt(),
});

export const lead = pgTable("lead", {
  id: id(),
  contact_id: uuid("contact_id").notNull().references(() => contact.id),
  conversation_id: uuid("conversation_id").references(() => conversation.id).unique(),
  destino: text("destino"),
  fecha_inicio: date("fecha_inicio"),
  fecha_fin: date("fecha_fin"),
  viajeros: integer("viajeros"),
  interes: text("interes"),
  urgencia: text("urgencia").$type<Urgency>(),
  score: integer("score"),
  estado: text("estado").$type<LeadState>().notNull().default("nuevo"),
  sales_agent_id: uuid("sales_agent_id").references(() => sales_agent.id),
  resumen_ia: text("resumen_ia"),
  fuera_de_horario: boolean("fuera_de_horario").notNull().default(false),
  mercado: text("mercado"),
  idioma: text("idioma"),
  tipo: text("tipo").$type<LeadType>(),
  requiere_humano: boolean("requiere_humano").notNull().default(false),
  entregado_at: timestamp("entregado_at", { withTimezone: true }),
  created_at: createdAt(),
});

export const business_hours = pgTable("business_hours", {
  id: id(),
  mercado: text("mercado").notNull().unique(),
  zona_horaria: text("zona_horaria").notNull(),
  horario: jsonb("horario").$type<WeeklyHours>().notNull(),
  festivos: text("festivos").array().notNull().default([]),
});

export const booking = pgTable("booking", {
  id: id(),
  codigo: text("codigo").notNull().unique(),
  contact_id: uuid("contact_id").references(() => contact.id),
  viajero_nombre: text("viajero_nombre").notNull(),
  viajero_telefono: text("viajero_telefono"),
  viajero_email: text("viajero_email"),
  destino: text("destino").notNull(),
  inicio: timestamp("inicio", { withTimezone: true }).notNull(),
  fin: timestamp("fin", { withTimezone: true }).notNull(),
  servicios: jsonb("servicios").$type<BookingService[]>().notNull().default([]),
  bienvenida_at: timestamp("bienvenida_at", { withTimezone: true }),
  created_at: createdAt(),
});

export const protocol = pgTable("protocol", {
  id: id(),
  codigo: text("codigo").notNull(),
  nombre: text("nombre").notNull(),
  version: integer("version").notNull(),
  activo: boolean("activo").notNull().default(true),
  definicion: jsonb("definicion").$type<Record<string, unknown>>().notNull(),
  tope_autorizado: numeric("tope_autorizado", { precision: 12, scale: 2 }),
  moneda: text("moneda").notNull().default("EUR"),
  created_at: createdAt(),
}, (t) => [unique("protocol_codigo_version").on(t.codigo, t.version)]);

export const incident = pgTable("incident", {
  id: id(),
  booking_id: uuid("booking_id").notNull().references(() => booking.id),
  conversation_id: uuid("conversation_id").references(() => conversation.id),
  contact_id: uuid("contact_id").references(() => contact.id),
  tipologia: text("tipologia").$type<IncidentType>(),
  urgencia: text("urgencia").$type<IncidentUrgency>(),
  estado: text("estado").$type<IncidentState>().notNull().default("identificando"),
  protocol_id: uuid("protocol_id").references(() => protocol.id),
  protocolo_estado: jsonb("protocolo_estado").$type<ProtocolState | null>(),
  proximo_paso_at: timestamp("proximo_paso_at", { withTimezone: true }),
  proveedor_contacto: text("proveedor_contacto"),
  intentos_identificacion: integer("intentos_identificacion").notNull().default(0),
  requiere_humano: boolean("requiere_humano").notNull().default(false),
  resumen_ia: text("resumen_ia"),
  escalado_a: text("escalado_a"),
  sla_vence: timestamp("sla_vence", { withTimezone: true }),
  feedback: text("feedback"),
  created_at: createdAt(),
  cerrado_at: timestamp("cerrado_at", { withTimezone: true }),
}, (t) => [
  uniqueIndex("incident_abierta_por_conversacion").on(t.conversation_id).where(sql`estado <> 'cerrado'`),
  index("incident_proveedor_contacto").on(t.proveedor_contacto),
  index("incident_proximo_paso").on(t.proximo_paso_at),
]);
export const incident_action = pgTable("incident_action", {
  id: id(),
  incident_id: uuid("incident_id").notNull().references(() => incident.id),
  tipo: text("tipo").$type<IncidentActionType>().notNull(),
  detalle: jsonb("detalle").$type<Record<string, unknown>>().notNull().default({}),
  monto: numeric("monto", { precision: 12, scale: 2 }),
  created_at: createdAt(),
});

export const kb_article = pgTable("kb_article", {
  id: id(),
  titulo: text("titulo").notNull(),
  contenido: text("contenido").notNull(),
  idioma: text("idioma").notNull().default("es"),
  etiquetas: text("etiquetas").array().notNull().default([]),
  // gte-small (Supabase Edge Function `embed`), 384 dimensiones
  embedding: vector("embedding", { dimensions: 384 }),
  created_at: createdAt(),
});

export const kpi_event = pgTable("kpi_event", {
  id: id(),
  tipo: text("tipo").notNull(),
  agente: text("agente").$type<AgentName>(),
  canal: text("canal").$type<Channel>(),
  valor: doublePrecision("valor"),
  ref_id: uuid("ref_id"),
  datos: jsonb("datos").$type<Record<string, unknown>>().notNull().default({}),
  created_at: createdAt(),
});

// Guardia humana del Agente 2 (se escala al activo de menor prioridad).
export const on_call = pgTable("on_call", {
  id: id(),
  nombre: text("nombre").notNull(),
  email: text("email").notNull().unique(),
  telefono: text("telefono"),
  prioridad: integer("prioridad").notNull().default(1),
  activo: boolean("activo").notNull().default(true),
  created_at: createdAt(),
});

// Interna (no está en el contrato): códigos OTP del widget web, guardados como HMAC.
export const web_otp = pgTable("web_otp", {
  id: id(),
  destino: text("destino").notNull(),
  codigo_hash: text("codigo_hash").notNull(),
  expira_at: timestamp("expira_at", { withTimezone: true }).notNull(),
  intentos: integer("intentos").notNull().default(0),
  usado_at: timestamp("usado_at", { withTimezone: true }),
  created_at: createdAt(),
}, (t) => [index("web_otp_destino").on(t.destino)]);