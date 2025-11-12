/**
 * City Graph Visualization Module - Sprint 2 & 3 (OOP Refactored)
 * Enhanced validations and edge case handling for robust graph operations.
 * Now using Object-Oriented Programming with classes for better encapsulation.
 * 
 * Public API:
 * - DistanceCalculator.haversine(a, b) - Static method for distance calculation
 * - CityGraph class - Constructor with nodes/edges, methods: findNearby(), getNode(), etc.
 * - Backward compatible: haversineKm(), buildGraph(), findNearby() functions still available
 * 
 * @author Melany Rivera, Ricardo Ruiz
 * @date 11/11/2025 - Refactored to OOP classes
 */

/**
 * Utility class for distance calculations using geographic coordinates
 * @class DistanceCalculator
 */
export class DistanceCalculator {
  /**
   * Earth's radius in kilometers
   * @constant {number}
   */
  static EARTH_RADIUS_KM = 6371;

  /**
   * Calculates the Haversine distance in kilometers between two geographic points
   * @static
   * @param {Object} pointA - First point with {lat, lon} properties
   * @param {Object} pointB - Second point with {lat, lon} properties
   * @returns {number} Distance in kilometers between the two points
   * @example
   * const monterrey = { lat: 25.6866, lon: -100.3161 };
   * const saltillo = { lat: 25.4383, lon: -100.9737 };
   * const distance = DistanceCalculator.haversine(monterrey, saltillo); // ~85.2 km
   */
  static haversine(pointA, pointB) {
    const toRadians = degrees => (degrees * Math.PI) / 180;
    
    const deltaLat = toRadians(pointB.lat - pointA.lat);
    const deltaLon = toRadians(pointB.lon - pointA.lon);
    const lat1Rad = toRadians(pointA.lat);
    const lat2Rad = toRadians(pointB.lat);
    
    const haversineValue =
      Math.sin(deltaLat / 2) ** 2 +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLon / 2) ** 2;
    
    return 2 * DistanceCalculator.EARTH_RADIUS_KM * Math.asin(Math.sqrt(haversineValue));
  }

  /**
   * Validates if a value is a finite number
   * @static
   * @param {*} value - Value to validate
   * @returns {boolean} True if value is a finite number
   */
  static isFiniteNumber(value) {
    return typeof value === "number" && Number.isFinite(value);
  }
}

/**
 * Represents a geographic node (city) in the graph
 * @class GeoNode
 */
export class GeoNode {
  /**
   * Creates a GeoNode instance
   * @param {string} id - Unique identifier for the node
   * @param {number} lat - Latitude coordinate
   * @param {number} lon - Longitude coordinate
   * @param {string} [name] - Optional name of the city
   * @throws {TypeError} When coordinates are not finite numbers
   * @throws {Error} When id is missing
   */
  constructor(id, lat, lon, name = null) {
    if (!id) throw new Error("node.id required");
    if (!DistanceCalculator.isFiniteNumber(lat) || !DistanceCalculator.isFiniteNumber(lon)) {
      throw new TypeError("node.lat/node.lon must be finite numbers");
    }
    
    this.id = id;
    this.lat = lat;
    this.lon = lon;
    this.name = name;
  }

  /**
   * Calculates distance to another GeoNode
   * @param {GeoNode} otherNode - Target node
   * @returns {number} Distance in kilometers
   */
  distanceTo(otherNode) {
    return DistanceCalculator.haversine(this, otherNode);
  }

  /**
   * Creates a GeoNode from a plain object
   * @static
   * @param {Object} obj - Object with {id, lat, lon, name?} properties
   * @returns {GeoNode} New GeoNode instance
   * @throws {TypeError} When obj is not an object or has invalid properties
   */
  static fromObject(obj) {
    if (!obj || typeof obj !== "object") {
      throw new TypeError("node must be object");
    }
    return new GeoNode(obj.id, obj.lat, obj.lon, obj.name);
  }
}

/**
 * Undirected weighted graph of cities with geographic distance calculations
 * @class CityGraph
 */
export class CityGraph {
  /**
   * Creates a CityGraph instance
   * @param {Array<Object>} nodes - Array of node objects [{id, name?, lat, lon}]
   * @param {Array<Object>} edges - Array of edge objects [{from, to}]
   * @throws {TypeError} When nodes or edges are not arrays, or nodes have invalid properties
   * @throws {Error} When edges reference non-existent nodes
   * 
   * @example
   * const nodes = [
   *   { id: "MTY", name: "Monterrey", lat: 25.6866, lon: -100.3161 },
   *   { id: "SAL", name: "Saltillo", lat: 25.4383, lon: -100.9737 }
   * ];
   * const edges = [{ from: "MTY", to: "SAL" }];
   * const graph = new CityGraph(nodes, edges);
   */
  constructor(nodes, edges) {
    if (!Array.isArray(nodes) || !Array.isArray(edges)) {
      throw new TypeError("nodes and edges must be arrays");
    }

    // Convert plain objects to GeoNode instances
    this._nodeMap = new Map();
    nodes.forEach(nodeObj => {
      const geoNode = GeoNode.fromObject(nodeObj);
      this._nodeMap.set(geoNode.id, geoNode);
    });

    // Build adjacency list with deduplication
    this._adjacencyList = new Map();
    this._nodeMap.forEach((node) => {
      this._adjacencyList.set(node.id, []);
    });

    this._buildEdges(edges);
  }

  /**
   * Builds edges with validation and deduplication
   * @private
   * @param {Array<Object>} edges - Array of edge objects
   * @throws {TypeError} When edge is not an object
   * @throws {Error} When edge references unknown node
   */
  _buildEdges(edges) {
    const processedEdges = new Set();

    for (const edge of edges) {
      if (!edge || typeof edge !== "object") {
        throw new TypeError("edge must be object");
      }

      const nodeFrom = this._nodeMap.get(edge.from);
      const nodeTo = this._nodeMap.get(edge.to);

      if (!nodeFrom || !nodeTo) {
        throw new Error("edge references unknown node");
      }

      // Ignore self-loops
      if (nodeFrom.id === nodeTo.id) continue;

      // Deduplicate bidirectional edges (MTY-SAL === SAL-MTY)
      const edgeKey = [nodeFrom.id, nodeTo.id].sort().join("::");
      if (processedEdges.has(edgeKey)) continue;
      processedEdges.add(edgeKey);

      const distance = nodeFrom.distanceTo(nodeTo);

      // Add bidirectional edges
      this._adjacencyList.get(nodeFrom.id).push({ to: nodeTo.id, dist: distance });
      this._adjacencyList.get(nodeTo.id).push({ to: nodeFrom.id, dist: distance });
    }
  }

  /**
   * Gets a node by its ID
   * @param {string} cityId - City identifier
   * @returns {GeoNode|undefined} The node or undefined if not found
   */
  getNode(cityId) {
    return this._nodeMap.get(cityId);
  }

  /**
   * Checks if a city exists in the graph
   * @param {string} cityId - City identifier
   * @returns {boolean} True if city exists
   */
  hasCity(cityId) {
    return this._nodeMap.has(cityId);
  }

  /**
   * Gets all neighbors of a city
   * @param {string} cityId - City identifier
   * @returns {Array<Object>} Array of neighbor objects [{to, dist}]
   * @throws {Error} When cityId doesn't exist
   */
  getNeighbors(cityId) {
    if (!this.hasCity(cityId)) {
      throw new Error("unknown city");
    }
    return this._adjacencyList.get(cityId);
  }

  /**
   * Finds neighboring cities within a specified radius, sorted by distance then by ID
   * @param {string} cityId - ID of the city to find neighbors for
   * @param {number} [maxKm=200] - Maximum distance in kilometers (inclusive)
   * @returns {Array<Object>} Array of nearby cities [{cityId, km}] sorted by distance, then by ID
   * @throws {Error} When cityId doesn't exist
   * 
   * @example
   * const graph = new CityGraph(nodes, edges);
   * const nearby = graph.findNearby("MTY", 100);
   * // Returns: [{ cityId: "SAL", km: 85.2 }, { cityId: "QRO", km: 95.4 }]
   */
  findNearby(cityId, maxKm = 200) {
    const neighbors = this.getNeighbors(cityId);
    
    const result = [];
    for (const { to, dist } of neighbors) {
      if (dist <= maxKm) {
        result.push({ cityId: to, km: +dist.toFixed(1) });
      }
    }

    // Stable sort: first by distance, then by cityId for deterministic results
    return result.sort((a, b) => {
      const distDiff = a.km - b.km;
      if (distDiff !== 0) return distDiff;
      return a.cityId < b.cityId ? -1 : a.cityId > b.cityId ? 1 : 0;
    });
  }

  /**
   * Gets all nodes in the graph
   * @returns {Array<GeoNode>} Array of all GeoNode instances
   */
  getAllNodes() {
    return Array.from(this._nodeMap.values());
  }

  /**
   * Gets the total number of nodes
   * @returns {number} Number of nodes
   */
  get nodeCount() {
    return this._nodeMap.size;
  }

  /**
   * Legacy: Returns graph structure compatible with old API
   * @returns {Object} Graph object with byId and adj Maps
   */
  toLegacyFormat() {
    return {
      byId: this._nodeMap,
      adj: this._adjacencyList
    };
  }
}

// ===========================================
// BACKWARD COMPATIBILITY LAYER
// Legacy functional API maintained for existing code
// ===========================================

/**
 * @deprecated Use DistanceCalculator.haversine() instead
 * Calculates the Haversine distance in kilometers between two geographic points
 * @param {Object} a - First point with {lat, lon} properties
 * @param {Object} b - Second point with {lat, lon} properties
 * @returns {number} Distance in kilometers
 */
export function haversineKm(a, b) {
  return DistanceCalculator.haversine(a, b);
}

/**
 * @deprecated Use new CityGraph(nodes, edges) instead
 * Builds an undirected weighted graph with distances in kilometers
 * @param {Array<Object>} nodes - Array of node objects
 * @param {Array<Object>} edges - Array of edge objects
 * @returns {Object} Graph object with byId Map and adj Map
 */
export function buildGraph(nodes, edges) {
  const graph = new CityGraph(nodes, edges);
  return graph.toLegacyFormat();
}

/**
 * @deprecated Use graph.findNearby(cityId, maxKm) instead
 * Finds neighboring cities within a specified radius
 * @param {Object} graph - Graph object with byId and adj Maps
 * @param {string} cityId - ID of the city
 * @param {number} [maxKm=200] - Maximum distance in kilometers
 * @returns {Array<Object>} Array of nearby cities
 */
export function findNearby(graph, cityId, maxKm = 200) {
  if (!graph?.byId || !graph?.adj) throw new Error("invalid graph");
  if (!graph.byId.has(cityId)) throw new Error("unknown city");

  const result = [];
  for (const { to, dist } of graph.adj.get(cityId)) {
    if (dist <= maxKm) result.push({ cityId: to, km: +dist.toFixed(1) });
  }
  
  return result.sort(
    (a, b) => (a.km - b.km) || (a.cityId < b.cityId ? -1 : a.cityId > b.cityId ? 1 : 0)
  );
}
