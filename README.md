# bextia-api

API generada por jor-cli. La validación de entrada usa [Clark](https://www.npmjs.com/package/@jorgepirelarivas/clark); cada handler devuelve un envelope `{ data, meta }`.

Contiene además el contrato (`contract/`, se regenera con `yarn contract`), el `program.json` de Louis y el material de descubrimiento (`discovery/`, `knowledge_base/`, `docs/`, `assets/`, `demos/`).

## Esquema compartido

El esquema Drizzle (`src/db/schema.ts`) se publica como `@bextia/api/schema`. Los agentes y el backoffice de [bextia-apps](https://github.com/jpirela/bextia-apps) lo consumen como dependencia git fijada a un tag:

    "@bextia/api": "github:jpirela/bextia-api#v0.1.0"

Un cambio en el esquema exige un tag nuevo y subir la versión en bextia-apps. La documentación del proyecto está en [bextia-entregables](https://github.com/jpirela/bextia-entregables).
## Funcionalidades

- `listContacts` — Listar contacto (query)
- `createContact` — Crear contacto (mutation)
- `listConversations` — Listar conversación (query)
- `createConversation` — Crear conversación (mutation)
- `listMessages` — Listar mensaje (query)
- `createMessage` — Crear mensaje (mutation)
- `listLeads` — Listar lead (query)
- `createLead` — Crear lead (mutation)
- `listSalesAgents` — Listar comercial (query)
- `createSalesAgent` — Crear comercial (mutation)
- `listBusinessHoursList` — Listar horario (query)
- `createBusinessHours` — Crear horario (mutation)
- `listBookings` — Listar reserva (query)
- `createBooking` — Crear reserva (mutation)
- `listIncidents` — Listar incidencia (query)
- `createIncident` — Crear incidencia (mutation)
- `listIncidentActions` — Listar acción (query)
- `createIncidentAction` — Crear acción (mutation)
- `listProtocols` — Listar protocolo (query)
- `createProtocol` — Crear protocolo (mutation)
- `listKbArticles` — Listar artículo (query)
- `createKbArticle` — Crear artículo (mutation)
- `listKpiEvents` — Listar evento KPI (query)
- `createKpiEvent` — Crear evento KPI (mutation)

## Despliegue

Proyecto autocontenido: no depende de ningún workspace. Gestor de paquetes: yarn
(un solo lockfile, `yarn.lock`).

Variables a registrar en el panel de la plataforma (ver `.env.example`):

| Variable | Obligatoria | Nota |
|---|---|---|
| `PORT` | no | la asigna la plataforma |
| `NODE_ENV` | no | `production` en el servidor |
| `CORS_ORIGINS` | **sí en producción** | dominios del frontend, separados por comas |

```
yarn
```
```
cp .env.example .env
```
```
yarn dev
```
```
yarn start
```

Comprobación: `GET /` responde `Bienvenido` y `GET /api/health` responde
`{"ok":true,"env":"production"}`.
