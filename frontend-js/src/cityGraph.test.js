import { buildGraph, findNearby, haversineKm } from "./cityGraph.js";

// Ciudades de prueba (coordenadas reales aproximadas)
const MTY = { id: "MTY", name: "Monterrey", lat: 25.6866, lon: -100.3161 };
const SAL = { id: "SAL", name: "Saltillo",  lat: 25.4383, lon: -100.9737 };
const TAM = { id: "TAM", name: "Tampico",   lat: 22.2553, lon:  -97.8686 };
const QRO = { id: "QRO", name: "Querétaro", lat: 20.5888, lon: -100.3899 };

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

});
