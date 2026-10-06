// Downloads underground residual-waste (restafval) containers from the Gemeente Amsterdam open data API
// and writes one point per container to src/data/map/underground-containers.geojson.
// Uses the same selection as the "Restafval" layer on https://maps.amsterdam.nl/afvalcontainers/
// (see its legenda.php): active, not removed, owner not 180, fraction code 1.
// Run with: npm run data:containers
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const API = "https://api.data.amsterdam.nl/v1/huishoudelijkafval";
const OUT = resolve(dirname(fileURLToPath(import.meta.url)), "../src/data/map/underground-containers.geojson");
const ACTIVE = 1;
const EXCLUDED_OWNER = "180";
const RESIDUAL_WASTE = "1";

async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res.json();
}

const types = await getJson(`${API}/containertype/?_format=json&_pageSize=10000&_fields=id,containertypeContainerType`);
const undergroundTypes = new Set(
  types._embedded.containertype.filter((t) => t.containertypeContainerType === "UNDERGROUND").map((t) => t.id),
);

const containers = await getJson(
  `${API}/container/?_format=geojson&_pageSize=100000&_fields=id,status,typeId,fractieCode,eigenaarId,verwijderdDp,geometrie`,
);

const round = (n) => Math.round(n * 1e6) / 1e6;

const features = containers.features
  .filter(
    ({ geometry, properties: p }) =>
      geometry &&
      p.status === ACTIVE &&
      !p.verwijderdDp &&
      String(p.eigenaarId) !== EXCLUDED_OWNER &&
      String(p.fractieCode) === RESIDUAL_WASTE &&
      undergroundTypes.has(p.typeId),
  )
  .map(({ geometry, properties: p }) => ({
    type: "Feature",
    properties: { id: p.id, category: "underground" },
    geometry: { type: "Point", coordinates: geometry.coordinates.map(round) },
  }));

await mkdir(dirname(OUT), { recursive: true });
await writeFile(
  OUT,
  JSON.stringify({
    type: "FeatureCollection",
    metadata: { source: `${API}/container/`, retrieved: new Date().toISOString().slice(0, 10) },
    features,
  }),
);
console.log(`Wrote ${features.length} containers to ${OUT}`);
