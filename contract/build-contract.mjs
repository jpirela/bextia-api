// Genera contract/jor.json desde resources.mjs. Uso: node contract/build-contract.mjs
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resources } from "./resources.mjs";

const functionalities = resources.flatMap(({ resource, singular, plural, label, fields }) => [
  { id: `list${plural}`, name: `Listar ${label}`, kind: "query", resource, fields },
  { id: `create${singular}`, name: `Crear ${label}`, kind: "mutation", resource, fields },
]);

const manifest = {
  version: "1",
  project: { name: "bextia-agentes", root: "." },
  discovery: [],
  mode: "crear-e-integrar",
  outputs: { selected: ["api"] },
  deploy: { target: "render" },
  functionalities,
  demo: { path: "apps/backoffice" },
  persistence: { engine: "supabase", secretRef: "DATABASE_URL" },
  sources: { databases: [] },
};

const out = fileURLToPath(new URL("./jor.json", import.meta.url));
writeFileSync(out, JSON.stringify(manifest, null, 2) + "\n");
console.log(`jor.json: ${functionalities.length} funcionalidades`);
