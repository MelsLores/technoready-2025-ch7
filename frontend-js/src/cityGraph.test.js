/**
 * Comprehensive unit tests for city graph visualization module
 * Tests nearby cities display, distance calculations, edge cases, and error handling
 * 
 * Sprint 3: Added OOP tests for DistanceCalculator, GeoNode, and CityGraph classes
 * 
 * @author Melany Rivera, Ricardo Ruiz
 * @date 11/11/2025 - Added OOP class tests
 */

import { 
  buildGraph, 
  findNearby, 
  haversineKm,
  DistanceCalculator,
  GeoNode,
  CityGraph
} from "./cityGraph.js";

// Test cities with real approximate coordinates
const MTY = { id: "MTY", name: "Monterrey", lat: 25.6866, lon: -100.3161 };
const SAL = { id: "SAL", name: "Saltillo",  lat: 25.4383, lon: -100.9737 };
const TAM = { id: "TAM", name: "Tampico",   lat: 22.2553, lon:  -97.8686 };
const QRO = { id: "QRO", name: "Querétaro", lat: 20.5888, lon: -100.3899 };

// ===========================================
// SPRINT 3: OOP CLASS TESTS
// ===========================================

describe("DistanceCalculator (OOP)", () => {
  test("haversine() calculates distance correctly between two points", () => {
    const distance = DistanceCalculator.haversine(MTY, SAL);
    expect(distance).toBeGreaterThan(70);
    expect(distance).toBeLessThan(100);
  });

  test("haversine() returns zero for identical coordinates", () => {
    const distance = DistanceCalculator.haversine(MTY, MTY);
    expect(distance).toBeCloseTo(0, 5);
  });

  test("haversine() handles North and South pole edge case", () => {
    const northPole = { lat: 90, lon: 0 };
    const southPole = { lat: -90, lon: 0 };
    const distance = DistanceCalculator.haversine(northPole, southPole);
    expect(distance).toBeCloseTo(20015.1, 0);
  });

  test("isFiniteNumber() validates finite numbers correctly", () => {
    expect(DistanceCalculator.isFiniteNumber(42)).toBe(true);
    expect(DistanceCalculator.isFiniteNumber(0)).toBe(true);
    expect(DistanceCalculator.isFiniteNumber(-3.14)).toBe(true);
    expect(DistanceCalculator.isFiniteNumber(Infinity)).toBe(false);
    expect(DistanceCalculator.isFiniteNumber(NaN)).toBe(false);
    expect(DistanceCalculator.isFiniteNumber("42")).toBe(false);
    expect(DistanceCalculator.isFiniteNumber(null)).toBe(false);
  });

  test("EARTH_RADIUS_KM constant is correct", () => {
    expect(DistanceCalculator.EARTH_RADIUS_KM).toBe(6371);
  });
});

describe("GeoNode (OOP)", () => {
  test("constructor creates valid GeoNode with all properties", () => {
    const node = new GeoNode("MTY", 25.6866, -100.3161, "Monterrey");
    expect(node.id).toBe("MTY");
    expect(node.lat).toBe(25.6866);
    expect(node.lon).toBe(-100.3161);
    expect(node.name).toBe("Monterrey");
  });

  test("constructor creates GeoNode without optional name", () => {
    const node = new GeoNode("SAL", 25.4383, -100.9737);
    expect(node.id).toBe("SAL");
    expect(node.name).toBe(null);
  });

  test("constructor throws Error when id is missing", () => {
    expect(() => new GeoNode(null, 25, -100)).toThrow("node.id required");
    expect(() => new GeoNode("", 25, -100)).toThrow("node.id required");
  });

  test("constructor throws TypeError when lat is not finite", () => {
    expect(() => new GeoNode("X", NaN, -100)).toThrow(TypeError);
    expect(() => new GeoNode("X", Infinity, -100)).toThrow(TypeError);
    expect(() => new GeoNode("X", "25", -100)).toThrow(TypeError);
  });

  test("constructor throws TypeError when lon is not finite", () => {
    expect(() => new GeoNode("X", 25, NaN)).toThrow(TypeError);
    expect(() => new GeoNode("X", 25, Infinity)).toThrow(TypeError);
    expect(() => new GeoNode("X", 25, "-100")).toThrow(TypeError);
  });

  test("distanceTo() calculates correct distance to another node", () => {
    const mtyNode = new GeoNode("MTY", 25.6866, -100.3161);
    const salNode = new GeoNode("SAL", 25.4383, -100.9737);
    const distance = mtyNode.distanceTo(salNode);
    expect(distance).toBeGreaterThan(70);
    expect(distance).toBeLessThan(100);
  });

  test("fromObject() creates GeoNode from plain object", () => {
    const node = GeoNode.fromObject(MTY);
    expect(node).toBeInstanceOf(GeoNode);
    expect(node.id).toBe("MTY");
    expect(node.lat).toBe(25.6866);
    expect(node.lon).toBe(-100.3161);
    expect(node.name).toBe("Monterrey");
  });

  test("fromObject() throws TypeError when object is null", () => {
    expect(() => GeoNode.fromObject(null)).toThrow(TypeError);
    expect(() => GeoNode.fromObject(null)).toThrow("node must be object");
  });

  test("fromObject() throws TypeError when not an object", () => {
    expect(() => GeoNode.fromObject("invalid")).toThrow(TypeError);
    expect(() => GeoNode.fromObject(123)).toThrow(TypeError);
  });
});

describe("CityGraph (OOP)", () => {
  const nodes = [MTY, SAL, TAM, QRO];
  const edges = [
    { from: "MTY", to: "SAL" },
    { from: "MTY", to: "TAM" },
    { from: "MTY", to: "QRO" }
  ];

  test("constructor creates valid CityGraph", () => {
    const graph = new CityGraph(nodes, edges);
    expect(graph).toBeInstanceOf(CityGraph);
    expect(graph.nodeCount).toBe(4);
  });

  test("constructor throws TypeError when nodes is not array", () => {
    expect(() => new CityGraph(null, [])).toThrow(TypeError);
    expect(() => new CityGraph({}, [])).toThrow(TypeError);
    expect(() => new CityGraph(null, [])).toThrow("nodes and edges must be arrays");
  });

  test("constructor throws TypeError when edges is not array", () => {
    expect(() => new CityGraph([], null)).toThrow(TypeError);
    expect(() => new CityGraph([], {})).toThrow(TypeError);
  });

  test("constructor ignores self-loops", () => {
    const graph = new CityGraph(
      [MTY, SAL],
      [
        { from: "MTY", to: "MTY" }, // self-loop
        { from: "MTY", to: "SAL" }
      ]
    );
    const neighbors = graph.getNeighbors("MTY");
    expect(neighbors.length).toBe(1);
    expect(neighbors[0].to).toBe("SAL");
  });

  test("constructor deduplicates bidirectional edges", () => {
    const graph = new CityGraph(
      [MTY, SAL],
      [
        { from: "MTY", to: "SAL" },
        { from: "SAL", to: "MTY" } // duplicate
      ]
    );
    const mtyNeighbors = graph.getNeighbors("MTY");
    expect(mtyNeighbors.length).toBe(1);
  });

  test("getNode() returns correct GeoNode", () => {
    const graph = new CityGraph(nodes, edges);
    const mtyNode = graph.getNode("MTY");
    expect(mtyNode).toBeInstanceOf(GeoNode);
    expect(mtyNode.id).toBe("MTY");
  });

  test("getNode() returns undefined for non-existent city", () => {
    const graph = new CityGraph(nodes, edges);
    expect(graph.getNode("XXX")).toBeUndefined();
  });

  test("hasCity() returns true for existing city", () => {
    const graph = new CityGraph(nodes, edges);
    expect(graph.hasCity("MTY")).toBe(true);
    expect(graph.hasCity("SAL")).toBe(true);
  });

  test("hasCity() returns false for non-existent city", () => {
    const graph = new CityGraph(nodes, edges);
    expect(graph.hasCity("XXX")).toBe(false);
  });

  test("getNeighbors() returns correct neighbors", () => {
    const graph = new CityGraph(nodes, edges);
    const neighbors = graph.getNeighbors("MTY");
    expect(neighbors.length).toBe(3);
    expect(neighbors.every(n => n.to && typeof n.dist === 'number')).toBe(true);
  });

  test("getNeighbors() throws Error for unknown city", () => {
    const graph = new CityGraph(nodes, edges);
    expect(() => graph.getNeighbors("XXX")).toThrow("unknown city");
  });

  test("findNearby() returns cities within radius sorted correctly", () => {
    const graph = new CityGraph(nodes, edges);
    const nearby = graph.findNearby("MTY", 1000);
    expect(nearby.length).toBeGreaterThan(0);
    expect(nearby[0]).toHaveProperty("cityId");
    expect(nearby[0]).toHaveProperty("km");
  });

  test("findNearby() uses default radius of 200km", () => {
    const graph = new CityGraph(
      [MTY, SAL, TAM],
      [{ from: "MTY", to: "SAL" }, { from: "MTY", to: "TAM" }]
    );
    const nearby = graph.findNearby("MTY"); // no maxKm parameter
    const ids = nearby.map(n => n.cityId);
    expect(ids).toContain("SAL"); // ~85km, within 200km
    expect(ids).not.toContain("TAM"); // ~500km, outside 200km
  });

  test("findNearby() returns empty array for small radius", () => {
    const graph = new CityGraph(nodes, edges);
    const nearby = graph.findNearby("MTY", 1);
    expect(nearby).toEqual([]);
  });

  test("getAllNodes() returns all GeoNode instances", () => {
    const graph = new CityGraph(nodes, edges);
    const allNodes = graph.getAllNodes();
    expect(allNodes.length).toBe(4);
    expect(allNodes.every(n => n instanceof GeoNode)).toBe(true);
  });

  test("nodeCount property returns correct count", () => {
    const graph = new CityGraph(nodes, edges);
    expect(graph.nodeCount).toBe(4);
  });

  test("toLegacyFormat() returns compatible structure", () => {
    const graph = new CityGraph([MTY, SAL], [{ from: "MTY", to: "SAL" }]);
    const legacy = graph.toLegacyFormat();
    expect(legacy).toHaveProperty("byId");
    expect(legacy).toHaveProperty("adj");
    expect(legacy.byId).toBeInstanceOf(Map);
    expect(legacy.adj).toBeInstanceOf(Map);
  });

  test("constructor validates edge objects", () => {
    expect(() => new CityGraph([MTY, SAL], [null])).toThrow(TypeError);
    expect(() => new CityGraph([MTY, SAL], [42])).toThrow(TypeError);
  });

  test("constructor throws Error when edge references unknown node", () => {
    expect(() => new CityGraph([MTY], [{ from: "MTY", to: "XXX" }]))
      .toThrow("edge references unknown node");
  });

  test("constructor validates node properties", () => {
    const badNode = { id: "BAD", lat: "25", lon: -100 };
    expect(() => new CityGraph([badNode], [])).toThrow(TypeError);
  });
});

// ===========================================
// LEGACY FUNCTIONAL API TESTS
// ===========================================

describe("haversineKm", () => {
  test("Monterrey–Saltillo ~70–100 km", () => {
    const d = haversineKm(MTY, SAL);
    expect(d).toBeGreaterThan(70);
    expect(d).toBeLessThan(100);
  });
  test("distancia cero contra sí mismo", () => {
    const d = haversineKm(MTY, MTY);
    expect(d).toBeCloseTo(0, 5);
  });
});

describe("buildGraph - validaciones y bordes", () => {
  test("arma adyacencia y pesos no dirigidos", () => {
    const { adj } = buildGraph([MTY, SAL], [{ from: "MTY", to: "SAL" }]);
    expect(adj.get("MTY")[0]).toMatchObject({ to: "SAL" });
    expect(adj.get("SAL")[0]).toMatchObject({ to: "MTY" });
    expect(adj.get("MTY")[0].dist).toBeGreaterThan(0);
  });

  test("lanza si nodes/edges no son arrays", () => {
    expect(() => buildGraph(null, [])).toThrow(TypeError);
    expect(() => buildGraph([], {})).toThrow(TypeError);
  });

  test("lanza si edge referencia nodo inexistente", () => {
    expect(() => buildGraph([MTY], [{ from: "MTY", to: "XXX" }])).toThrow();
  });

  test("valida nodos: id requerido y lat/lon numéricos finitos", () => {
    const badLat = { id: "X", lat: "25", lon: -100 };
    expect(() => buildGraph([badLat], [])).toThrow();
    const noId = { lat: 1, lon: 2 };
    expect(() => buildGraph([noId], [])).toThrow();
  });

  test("ignora self-loops y de-duplica aristas", () => {
    const { adj } = buildGraph(
      [MTY, SAL],
      [
        { from: "MTY", to: "MTY" },        // self-loop ignorado
        { from: "MTY", to: "SAL" },        // arista 1
        { from: "SAL", to: "MTY" }         // duplicado (debe ignorarse)
      ]
    );
    expect(adj.get("MTY").length).toBe(1);
    expect(adj.get("SAL").length).toBe(1);
  });
});

describe("findNearby", () => {
  const nodes = [MTY, SAL, TAM, QRO];
  const edges = [
    { from: "MTY", to: "SAL" },
    { from: "MTY", to: "TAM" },
    { from: "MTY", to: "QRO" }
  ];
  const graph = buildGraph(nodes, edges);

  test("devuelve vecinos dentro del radio, ordenado por km y estable por id", () => {
    const near = findNearby(graph, "MTY", 1000);
    // Orden esperado: SAL más cerca que QRO/TAM
    expect(near[0].cityId).toBe("SAL");
    // Al menos 2 elementos con radio grande
    expect(near.length).toBeGreaterThanOrEqual(2);
    // Distancias con 1 decimal
    expect(String(near[0].km)).toMatch(/^\d+(\.\d)?$/);
  });

  test("radio inclusivo: incluye ciudades exactamente en el borde", () => {
    // Radio igual a la distancia MTY–Saltillo (redondeado al entero superior)
    const d = haversineKm(MTY, SAL);
    const near = findNearby(graph, "MTY", Math.ceil(d));
    const ids = near.map(x => x.cityId);
    expect(ids).toContain("SAL");
  });

  test("lanza si graph o cityId no válido", () => {
    expect(() => findNearby({}, "MTY")).toThrow();
    expect(() => findNearby(graph, "XXX")).toThrow();
  });

  test("radio pequeño devuelve vacío sin fallar", () => {
    const near = findNearby(graph, "MTY", 1);
    expect(near).toEqual([]);
  });

  test("orden estable por id cuando dos vecinos tienen la MISMA distancia", () => {
    const MTY = { id: "M", lat: 25.6866, lon: -100.3161 };
    // Dos nodos con EXACTAMENTE las mismas coords → misma distancia a M
    const A = { id: "A", lat: 25.0, lon: -100.0 };
    const B = { id: "B", lat: 25.0, lon: -100.0 };
    const g = buildGraph([MTY, A, B], [
      { from: "M", to: "A" },
      { from: "M", to: "B" },
    ]);
    const near = findNearby(g, "M", 1000);
    expect(near[0].km).toBeCloseTo(near[1].km, 6);   // misma distancia
    expect(near.map(x => x.cityId)).toEqual(["A", "B"]); // orden por id
  });

  test("usa maxKm por DEFECTO (200 km) cuando no se pasa el tercer argumento", () => {
    const MTY = { id: "M", lat: 25.6866, lon: -100.3161 };
    const SAL = { id: "S", lat: 25.4383, lon: -100.9737 };   // ~80–100 km
    const TAM = { id: "T", lat: 22.2553, lon: -97.8686 };    // ~500 km
    const g = buildGraph([MTY, SAL, TAM], [
      { from: "M", to: "S" },
      { from: "M", to: "T" },
    ]);
    const near = findNearby(g, "M"); // sin maxKm → 200 por defecto
    const ids = near.map(x => x.cityId);
    expect(ids).toContain("S");
    expect(ids).not.toContain("T");
  });

  test("lanza TypeError si alguna edge es nula o no es objeto", () => {
    const A = { id: "A", lat: 1, lon: 1 };
    const B = { id: "B", lat: 2, lon: 2 };
    expect(() => buildGraph([A, B], [null])).toThrow(TypeError);
    // también cubre el typeof !== 'object'
    expect(() => buildGraph([A, B], [42])).toThrow(TypeError);
  });

  test("valida lat/lon FINITOS (Infinity/NaN) y lanza TypeError", () => {
    const bad = { id: "X", lat: 25, lon: Infinity };
    expect(() => buildGraph([bad], [])).toThrow(TypeError);
  });

  test("throws TypeError when node is null", () => {
    expect(() => buildGraph([null], [])).toThrow(TypeError);
    expect(() => buildGraph([null], [])).toThrow("node must be object");
  });

  test("throws TypeError when node is not an object", () => {
    expect(() => buildGraph(["invalid"], [])).toThrow(TypeError);
    expect(() => buildGraph([123], [])).toThrow(TypeError);
  });

  test("edge cases for haversine distance calculation", () => {
    // Test with extreme coordinates
    const northPole = { lat: 90, lon: 0 };
    const southPole = { lat: -90, lon: 0 };
    const distance = haversineKm(northPole, southPole);
    expect(distance).toBeCloseTo(20015.1, 0); // Approximate half Earth circumference
    
    // Test with same longitude, different latitude
    const pointA = { lat: 0, lon: 0 };
    const pointB = { lat: 1, lon: 0 };
    const distanceOneDegreeLat = haversineKm(pointA, pointB);
    expect(distanceOneDegreeLat).toBeCloseTo(111.3, 0); // ~111km per degree latitude
  });

  test("buildGraph handles empty arrays correctly", () => {
    const graph = buildGraph([], []);
    expect(graph.byId.size).toBe(0);
    expect(graph.adj.size).toBe(0);
  });

  test("findNearby sorting edge case - cities with exact same distance", () => {
    // Create scenario where multiple cities have exactly same distance
    const center = { id: "CENTER", lat: 0, lon: 0 };
    const cityA = { id: "A", lat: 1, lon: 0 };
    const cityB = { id: "B", lat: 0, lon: 1 };
    const cityC = { id: "C", lat: -1, lon: 0 };
    
    const graph = buildGraph([center, cityA, cityB, cityC], [
      { from: "CENTER", to: "A" },
      { from: "CENTER", to: "B" },
      { from: "CENTER", to: "C" }
    ]);
    
    const nearby = findNearby(graph, "CENTER", 200);
    
    // Should be sorted by ID when distances are equal
    const sortedIds = nearby.map(city => city.cityId);
    expect(sortedIds).toEqual(["A", "B", "C"]);
  });

  test("findNearby with cities at exactly the same coordinates", () => {
    const cityA = { id: "A", lat: 25.0, lon: -100.0 };
    const cityB = { id: "B", lat: 25.0, lon: -100.0 };
    const cityC = { id: "C", lat: 25.0, lon: -100.0 };
    
    const graph = buildGraph([cityA, cityB, cityC], [
      { from: "A", to: "B" },
      { from: "A", to: "C" }
    ]);
    
    const nearby = findNearby(graph, "A", 200);
    
    // Distance should be 0, sorted by ID
    expect(nearby).toHaveLength(2);
    expect(nearby[0].km).toBe(0);
    expect(nearby[1].km).toBe(0);
    expect(nearby[0].cityId).toBe("B");
    expect(nearby[1].cityId).toBe("C");
  });

  test("comprehensive validation of node properties", () => {
    // Test various invalid node scenarios
    expect(() => buildGraph([{ lat: 25, lon: -100 }], [])).toThrow("node.id required");
    expect(() => buildGraph([{ id: "test", lat: "25", lon: -100 }], [])).toThrow(TypeError);
    expect(() => buildGraph([{ id: "test", lat: 25, lon: "invalid" }], [])).toThrow(TypeError);
    expect(() => buildGraph([{ id: "test", lat: NaN, lon: -100 }], [])).toThrow(TypeError);
    expect(() => buildGraph([{ id: "test", lat: 25, lon: NaN }], [])).toThrow(TypeError);
  });

  test("graph visualization with realistic city network", () => {
    // Test a more complex network scenario
    const cities = [
      { id: "NYC", lat: 40.7128, lon: -74.0060 }, // New York
      { id: "LAX", lat: 34.0522, lon: -118.2437 }, // Los Angeles  
      { id: "CHI", lat: 41.8781, lon: -87.6298 }, // Chicago
      { id: "MIA", lat: 25.7617, lon: -80.1918 }  // Miami
    ];
    
    const connections = [
      { from: "NYC", to: "CHI" },
      { from: "NYC", to: "MIA" },
      { from: "CHI", to: "LAX" },
      { from: "MIA", to: "LAX" }
    ];
    
    const graph = buildGraph(cities, connections);
    
    // Test NYC connections
    const nycNearby = findNearby(graph, "NYC", 2000); // 2000km radius
    expect(nycNearby).toHaveLength(2); // CHI and MIA should be within range
    
    // Verify distances are reasonable
    nycNearby.forEach(city => {
      expect(city.km).toBeGreaterThan(0);
      expect(city.km).toBeLessThan(2000);
    });
  });

  test("error handling for inconsistent and empty data scenarios", () => {
    // Test with completely empty data
    expect(() => findNearby({ byId: new Map(), adj: new Map() }, "nonexistent"))
      .toThrow("unknown city");
    
    // Test with malformed graph objects
    expect(() => findNearby({ byId: null, adj: new Map() }, "test"))
      .toThrow("invalid graph");
    
    expect(() => findNearby({ byId: new Map(), adj: null }, "test"))
      .toThrow("invalid graph");
    
    // Test with undefined graph
    expect(() => findNearby(undefined, "test")).toThrow("invalid graph");
    expect(() => findNearby(null, "test")).toThrow("invalid graph");
  });

  test("performance with large dataset simulation", () => {
    // Create a larger network to test performance characteristics
    const largeCityNetwork = [];
    const largeEdges = [];
    
    for (let i = 0; i < 50; i++) {
      largeCityNetwork.push({
        id: `CITY_${i}`,
        lat: Math.random() * 180 - 90, // Random latitude -90 to 90
        lon: Math.random() * 360 - 180 // Random longitude -180 to 180
      });
      
      if (i > 0) {
        largeEdges.push({ from: `CITY_${i-1}`, to: `CITY_${i}` });
      }
    }
    
    const startTime = Date.now();
    const graph = buildGraph(largeCityNetwork, largeEdges);
    const buildTime = Date.now() - startTime;
    
    expect(buildTime).toBeLessThan(1000); // Should build in under 1 second
    expect(graph.byId.size).toBe(50);
    expect(graph.adj.size).toBe(50);
    
    // Test findNearby performance
    const searchStart = Date.now();
    const nearby = findNearby(graph, "CITY_25", 5000);
    const searchTime = Date.now() - searchStart;
    
    expect(searchTime).toBeLessThan(100); // Should search in under 100ms
  });

});
