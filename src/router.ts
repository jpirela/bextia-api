// Generado por jor-cli — ensamblaje de rutas (id de funcionalidad → handler)
import { listContacts } from "./handlers/listContacts.ts";
import { createContact } from "./handlers/createContact.ts";
import { listConversations } from "./handlers/listConversations.ts";
import { createConversation } from "./handlers/createConversation.ts";
import { listMessages } from "./handlers/listMessages.ts";
import { createMessage } from "./handlers/createMessage.ts";
import { listLeads } from "./handlers/listLeads.ts";
import { createLead } from "./handlers/createLead.ts";
import { listSalesAgents } from "./handlers/listSalesAgents.ts";
import { createSalesAgent } from "./handlers/createSalesAgent.ts";
import { listBusinessHoursList } from "./handlers/listBusinessHoursList.ts";
import { createBusinessHours } from "./handlers/createBusinessHours.ts";
import { listBookings } from "./handlers/listBookings.ts";
import { createBooking } from "./handlers/createBooking.ts";
import { listIncidents } from "./handlers/listIncidents.ts";
import { createIncident } from "./handlers/createIncident.ts";
import { listIncidentActions } from "./handlers/listIncidentActions.ts";
import { createIncidentAction } from "./handlers/createIncidentAction.ts";
import { listProtocols } from "./handlers/listProtocols.ts";
import { createProtocol } from "./handlers/createProtocol.ts";
import { listKbArticles } from "./handlers/listKbArticles.ts";
import { createKbArticle } from "./handlers/createKbArticle.ts";
import { listKpiEvents } from "./handlers/listKpiEvents.ts";
import { createKpiEvent } from "./handlers/createKpiEvent.ts";

export const routes = {
  "listContacts": listContacts,
  "createContact": createContact,
  "listConversations": listConversations,
  "createConversation": createConversation,
  "listMessages": listMessages,
  "createMessage": createMessage,
  "listLeads": listLeads,
  "createLead": createLead,
  "listSalesAgents": listSalesAgents,
  "createSalesAgent": createSalesAgent,
  "listBusinessHoursList": listBusinessHoursList,
  "createBusinessHours": createBusinessHours,
  "listBookings": listBookings,
  "createBooking": createBooking,
  "listIncidents": listIncidents,
  "createIncident": createIncident,
  "listIncidentActions": listIncidentActions,
  "createIncidentAction": createIncidentAction,
  "listProtocols": listProtocols,
  "createProtocol": createProtocol,
  "listKbArticles": listKbArticles,
  "createKbArticle": createKbArticle,
  "listKpiEvents": listKpiEvents,
  "createKpiEvent": createKpiEvent,
} as const;
