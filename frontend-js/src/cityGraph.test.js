import { buildGraph, findNearby, haversineKm } from "./cityGraph.js";

const MTY = { id: "MTY", name: "Monterrey", lat: 25.6866, lon: -100.3161 };
const SAL = { id: "SAL", name: "Saltillo",  lat: 25.4383, lon: -100.9737 };
const TAMP= { id: "TAM", name: "Tampico",   lat: 22.2553, lon:  -97.8686 };
const QRO = { id: "QRO", name: "Querétaro", lat: 20.5888, lon: -100.3899 };

describe("haversineKm", () => {
  test("distance Monterrey-Saltillo is ~70-90km", () => {
    const d = haversineKm(MTY, SAL);
    expect(d).toBeGreaterThan(70);
    expect(d).toBeLessThan(100);
  });
});

describe("buildGraph", () => {
  test("builds adjacency list with weights", () => {
    const { adj } = buildGraph([MTY, SAL], [{ from: "MTY", to: "SAL" }]);
    expect(adj.get("MTY")[0]).toHaveProperty("to", "SAL");
    expect(adj.get("MTY")[0].dist).toBeGreaterThan(0);
    expect(adj.get("SAL")[0]).toHaveProperty("to", "MTY");
  });

  test("throws if edge references unknown node", () => {
    expect(() => buildGraph([MTY], [{ from: "MTY", to: "XXX" }])).toThrow();
  });

  test("validates arrays", () => {
    expect(() => buildGraph(null, [])).toThrow(TypeError);
    expect(() => buildGraph([], {})).toThrow(TypeError);
  });
});

describe("findNearby", () => {
  const nodes = [MTY, SAL, TAMP, QRO];
  const edges = [
    { from: "MTY", to: "SAL" },
    { from: "MTY", to: "TAM" },
    { from: "MTY", to: "QRO" }
  ];
  const graph = buildGraph(nodes, edges);

  test("returns neighbors within radius ordered by distance", () => {
    const near = findNearby(graph, "MTY", 200);
    const ids = near.map(x => x.cityId);
    expect(ids).toContain("SAL");
    // QRO y TAM están más lejos que 200 km desde MTY, usualmente >200
    expect(ids).not.toContain("QRO");
    expect(ids).not.toContain("TAM");
  });

  test("throws on invalid graph or unknown city", () => {
    expect(() => findNearby({}, "MTY")).toThrow();
    expect(() => findNearby(graph, "XXX")).toThrow();
  });
});
