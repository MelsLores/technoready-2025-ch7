// Grafo de ciudades cercanas y distancias (Haversine) — Sprint 2
// Se fortalecieron validaciones y manejo de bordes.
// API pública: haversineKm(a,b), buildGraph(nodes, edges), findNearby(graph, cityId, maxKm)

function isFiniteNumber(x) {
  return typeof x === "number" && Number.isFinite(x);
}

function validateNode(n) {
  if (!n || typeof n !== "object") throw new TypeError("node must be object");
  if (!("id" in n)) throw new Error("node.id required");
  if (!isFiniteNumber(n.lat) || !isFiniteNumber(n.lon)) {
    throw new TypeError("node.lat/node.lon must be finite numbers");
  }
}

/** Distancia Haversine en km entre dos puntos {lat, lon}. */
export function haversineKm(a, b) {
  const R = 6371;
  const toRad = d => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/**
 * Construye un grafo no dirigido con pesos (km).
 * nodes: [{id, name?, lat, lon}], edges: [{from, to}]
 * - Valida arrays, nodos y que las aristas referencien nodos existentes.
 * - Ignora self-loops (from === to).
 * - De-duplica aristas (MTY-SAL y SAL-MTY se cuentan una vez).
 */
export function buildGraph(nodes, edges) {
  if (!Array.isArray(nodes) || !Array.isArray(edges)) {
    throw new TypeError("nodes and edges must be arrays");
  }

  nodes.forEach(validateNode);

  const byId = new Map(nodes.map(n => [n.id, n]));
  const adj = new Map(nodes.map(n => [n.id, []]));

  // set de aristas sin dirección para evitar duplicados
  const seen = new Set();

  for (const e of edges) {
    if (!e || typeof e !== "object") throw new TypeError("edge must be object");
    const u = byId.get(e.from);
    const v = byId.get(e.to);
    if (!u || !v) throw new Error("edge references unknown node");
    if (u.id === v.id) continue; // ignorar self-loop

    const key = [u.id, v.id].sort().join("::"); // llave simétrica
    if (seen.has(key)) continue;
    seen.add(key);

    const d = haversineKm(u, v);
    adj.get(u.id).push({ to: v.id, dist: d });
    adj.get(v.id).push({ to: u.id, dist: d });
  }

  return { byId, adj };
}

/**
 * Vecinos dentro de un radio maxKm (inclusive), ordenados por distancia y luego por id.
 */
export function findNearby(graph, cityId, maxKm = 200) {
  if (!graph?.byId || !graph?.adj) throw new Error("invalid graph");
  if (!graph.byId.has(cityId)) throw new Error("unknown city");

  const result = [];
  for (const { to, dist } of graph.adj.get(cityId)) {
    if (dist <= maxKm) result.push({ cityId: to, km: +dist.toFixed(1) });
  }
  // orden estable: primero por km, luego por id para resultados deterministas
  return result.sort(
    (a, b) => (a.km - b.km) || (a.cityId < b.cityId ? -1 : a.cityId > b.cityId ? 1 : 0)
  );
}
