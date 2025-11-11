/**
 * City Graph Visualization Module - Sprint 2
 * Enhanced validations and edge case handling for robust graph operations.
 * Public API: haversineKm(a,b), buildGraph(nodes, edges), findNearby(graph, cityId, maxKm)
 * 
 * @author Melany Rivera, Ricardo Ruiz
 * @date 10/11/2025
 */

/**
 * Validates if a value is a finite number
 * @param {*} x - Value to validate
 * @returns {boolean} True if x is a finite number
 */
function isFiniteNumber(x) {
  return typeof x === "number" && Number.isFinite(x);
}

/**
 * Validates a node object structure and properties
 * @param {Object} n - Node object to validate
 * @throws {TypeError} When node is not an object or has invalid coordinates
 * @throws {Error} When node is missing required id property
 */
function validateNode(n) {
  if (!n || typeof n !== "object") throw new TypeError("node must be object");
  if (!("id" in n)) throw new Error("node.id required");
  if (!isFiniteNumber(n.lat) || !isFiniteNumber(n.lon)) {
    throw new TypeError("node.lat/node.lon must be finite numbers");
  }
}

/**
 * Calculates the Haversine distance in kilometers between two geographic points
 * @param {Object} a - First point with {lat, lon} properties
 * @param {Object} b - Second point with {lat, lon} properties
 * @returns {number} Distance in kilometers between the two points
 * @example
 * const monterrey = { lat: 25.6866, lon: -100.3161 };
 * const saltillo = { lat: 25.4383, lon: -100.9737 };
 * const distance = haversineKm(monterrey, saltillo); // ~85.2 km
 */
export function haversineKm(a, b) {
  const R = 6371; // Earth's radius in kilometers
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
 * Builds an undirected weighted graph with distances in kilometers
 * @param {Array<Object>} nodes - Array of node objects [{id, name?, lat, lon}]
 * @param {Array<Object>} edges - Array of edge objects [{from, to}]
 * @returns {Object} Graph object with byId Map and adj Map for adjacency lists
 * @throws {TypeError} When nodes or edges are not arrays, or when nodes have invalid properties
 * @throws {Error} When edges reference non-existent nodes
 * 
 * Features:
 * - Validates arrays, nodes, and that edges reference existing nodes
 * - Ignores self-loops (from === to)
 * - Deduplicates edges (MTY-SAL and SAL-MTY count as one edge)
 * 
 * @example
 * const nodes = [
 *   { id: "MTY", name: "Monterrey", lat: 25.6866, lon: -100.3161 },
 *   { id: "SAL", name: "Saltillo", lat: 25.4383, lon: -100.9737 }
 * ];
 * const edges = [{ from: "MTY", to: "SAL" }];
 * const graph = buildGraph(nodes, edges);
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
 * Finds neighboring cities within a specified radius, sorted by distance then by ID
 * @param {Object} graph - Graph object with byId and adj Maps
 * @param {string} cityId - ID of the city to find neighbors for
 * @param {number} [maxKm=200] - Maximum distance in kilometers (inclusive)
 * @returns {Array<Object>} Array of nearby cities [{cityId, km}] sorted by distance, then by ID
 * @throws {Error} When graph is invalid or cityId doesn't exist
 * 
 * @example
 * const nearby = findNearby(graph, "MTY", 100);
 * // Returns: [{ cityId: "SAL", km: 85.2 }, { cityId: "QRO", km: 95.4 }]
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
