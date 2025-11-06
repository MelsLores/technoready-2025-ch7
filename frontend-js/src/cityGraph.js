// Módulo: grafo de ciudades cercanas + distancias
// Supone nodos {id, name, lat, lon} y edges [{from, to}] (no dirigidos)

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

export function buildGraph(nodes, edges) {
  if (!Array.isArray(nodes) || !Array.isArray(edges)) {
    throw new TypeError("nodes and edges must be arrays");
  }
  const byId = new Map(nodes.map(n => [n.id, n]));
  const adj = new Map(nodes.map(n => [n.id, []]));
  for (const e of edges) {
    const u = byId.get(e.from);
    const v = byId.get(e.to);
    if (!u || !v) throw new Error("edge references unknown node");
    const d = haversineKm(u, v);
    adj.get(u.id).push({ to: v.id, dist: d });
    adj.get(v.id).push({ to: u.id, dist: d });
  }
  return { byId, adj };
}

export function findNearby(graph, cityId, maxKm = 200) {
  if (!graph?.byId || !graph?.adj) throw new Error("invalid graph");
  if (!graph.byId.has(cityId)) throw new Error("unknown city");
  const result = [];
  for (const { to, dist } of graph.adj.get(cityId)) {
    if (dist <= maxKm) result.push({ cityId: to, km: +dist.toFixed(1) });
  }
  return result.sort((a, b) => a.km - b.km);
}
