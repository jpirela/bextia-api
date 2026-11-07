# bextia-agentes

API generada por jor-cli. La validación de entrada usa [Clark](https://www.npmjs.com/package/@jorgepirelarivas/clark); cada handler devuelve un envelope `{ data, meta }`.

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

Proyecto autocontenido: no depende de ningún workspace. Commitea **un solo**
lockfile (`package-lock.json` o `yarn.lock`, no ambos) — con los dos, el
gestor que elige la plataforma deja de ser determinista.

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
