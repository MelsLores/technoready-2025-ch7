export default {
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.js", "!**/node_modules/**"],
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 85,
      functions: 90,
      lines: 90
    }
  }
};
