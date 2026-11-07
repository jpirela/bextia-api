// Generado por jor-cli — schema Postgres (Drizzle), derivado de las funcionalidades.
import { boolean, date, integer, jsonb, numeric, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const booking = pgTable("booking", {
  id: uuid("id").primaryKey().defaultRandom(),
  codigo: text("codigo").notNull(),
  contactId: uuid("contact_id"),
  viajeroNombre: text("viajero_nombre").notNull(),
  viajeroTelefono: text("viajero_telefono"),
  viajeroEmail: text("viajero_email"),
  destino: text("destino").notNull(),
  inicio: timestamp("inicio").notNull(),
  fin: timestamp("fin").notNull(),
  servicios: jsonb("servicios"),
});

export const businessHours = pgTable("business_hours", {
  id: uuid("id").primaryKey().defaultRandom(),
  mercado: text("mercado").notNull(),
  zonaHoraria: text("zona_horaria").notNull(),
  horario: jsonb("horario").notNull(),
  festivos: jsonb("festivos"),
});

export const contact = pgTable("contact", {
  id: uuid("id").primaryKey().defaultRandom(),
  nombre: text("nombre"),
  telefono: text("telefono"),
  email: text("email"),
  idioma: text("idioma"),
  mercado: text("mercado"),
  canalPreferido: text("canal_preferido"),
});

export const conversation = pgTable("conversation", {
  id: uuid("id").primaryKey().defaultRandom(),
  contactId: uuid("contact_id").notNull(),
  canal: text("canal").notNull(),
  agente: text("agente"),
  estado: text("estado"),
});

export const incident = pgTable("incident", {
  id: uuid("id").primaryKey().defaultRandom(),
  bookingId: uuid("booking_id").notNull(),
  conversationId: uuid("conversation_id"),
  tipologia: text("tipologia"),
  urgencia: text("urgencia"),
  estado: text("estado"),
  protocolId: uuid("protocol_id"),
  escaladoA: text("escalado_a"),
  slaVence: timestamp("sla_vence"),
  feedback: text("feedback"),
});

export const incidentAction = pgTable("incident_action", {
  id: uuid("id").primaryKey().defaultRandom(),
  incidentId: uuid("incident_id").notNull(),
  tipo: text("tipo").notNull(),
  detalle: jsonb("detalle"),
  monto: numeric("monto"),
});

export const kbArticle = pgTable("kb_article", {
  id: uuid("id").primaryKey().defaultRandom(),
  titulo: text("titulo").notNull(),
  contenido: text("contenido").notNull(),
  idioma: text("idioma"),
  etiquetas: jsonb("etiquetas"),
});

export const kpiEvent = pgTable("kpi_event", {
  id: uuid("id").primaryKey().defaultRandom(),
  tipo: text("tipo").notNull(),
  agente: text("agente"),
  canal: text("canal"),
  valor: numeric("valor"),
  refId: uuid("ref_id"),
  datos: jsonb("datos"),
});

export const lead = pgTable("lead", {
  id: uuid("id").primaryKey().defaultRandom(),
  contactId: uuid("contact_id").notNull(),
  destino: text("destino"),
  fechaInicio: date("fecha_inicio"),
  fechaFin: date("fecha_fin"),
  viajeros: integer("viajeros"),
  interes: text("interes"),
  urgencia: text("urgencia"),
  score: integer("score"),
  estado: text("estado"),
  salesAgentId: uuid("sales_agent_id"),
  resumenIa: text("resumen_ia"),
  fueraDeHorario: boolean("fuera_de_horario"),
  mercado: text("mercado"),
  idioma: text("idioma"),
});

export const message = pgTable("message", {
  id: uuid("id").primaryKey().defaultRandom(),
  conversationId: uuid("conversation_id").notNull(),
  canal: text("canal").notNull(),
  direccion: text("direccion").notNull(),
  contenido: text("contenido").notNull(),
  externalId: text("external_id").notNull(),
  agente: text("agente"),
});

export const protocol = pgTable("protocol", {
  id: uuid("id").primaryKey().defaultRandom(),
  codigo: text("codigo").notNull(),
  nombre: text("nombre").notNull(),
  version: integer("version").notNull(),
  activo: boolean("activo"),
  definicion: jsonb("definicion").notNull(),
  topeAutorizado: numeric("tope_autorizado"),
});

export const salesAgent = pgTable("sales_agent", {
  id: uuid("id").primaryKey().defaultRandom(),
  nombre: text("nombre").notNull(),
  email: text("email").notNull(),
  destinos: jsonb("destinos"),
  idiomas: jsonb("idiomas"),
  mercados: jsonb("mercados"),
  zonaHoraria: text("zona_horaria"),
  activo: boolean("activo"),
});
