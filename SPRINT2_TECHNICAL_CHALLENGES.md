# Sprint 2 - Technical Challenges and Solutions

**Authors:** Melany Rivera, Ricardo Ruiz  
**Date:** November 10, 2025  
**Project:** Technoready 2025 CH7 - Hotel Reservation System

## Overview

This document outlines the main technical difficulties encountered during Sprint 2 development and the strategies implemented to overcome them. Sprint 2 focused on enhancing the JavaScript graph visualization module with comprehensive Jest testing and achieving high code coverage.

## Technical Challenges Encountered

### 1. Jest Configuration and Module System Compatibility

**Challenge:**
The project uses ES6 modules (`type: "module"` in package.json), but Jest had compatibility issues with the module system, resulting in errors when trying to run tests initially.

**Error Encountered:**
```
Error: Cannot find module 'C:\...\node_modules\jest-cli\build\index.js'
```

**Solution Strategy:**
- Used the `--experimental-vm-modules` flag in the npm test script
- Configured Jest to work with ES6 modules using the proper export syntax
- Updated the jest.config.js to specify `testEnvironment: "node"`

**Implementation:**
```json
{
  "scripts": {
    "test": "node --experimental-vm-modules ./node_modules/jest/bin/jest.js --coverage"
  }
}
```

**Learning:** Modern JavaScript module systems require specific Jest configurations. The experimental VM modules flag is currently necessary for ES6 module compatibility.

### 2. Achieving 100% Code Coverage

**Challenge:**
Initial test coverage was high (98.03% statements, 93.02% branches) but not complete. Some edge cases and error handling paths were not covered, particularly:
- Null/undefined node validation edge cases
- Complex sorting logic in `findNearby` function
- Error handling for malformed graph objects

**Solution Strategy:**
- Analyzed the coverage report HTML to identify uncovered lines
- Created specific test cases for each uncovered branch and statement
- Implemented comprehensive edge case testing for:
  - Invalid node objects (null, non-object types)
  - Boundary conditions in distance calculations
  - Error scenarios with malformed data structures

**Key Test Additions:**
```javascript
test("throws TypeError when node is null", () => {
  expect(() => buildGraph([null], [])).toThrow(TypeError);
  expect(() => buildGraph([null], [])).toThrow("node must be object");
});

test("comprehensive validation of node properties", () => {
  expect(() => buildGraph([{ lat: 25, lon: -100 }], [])).toThrow("node.id required");
  expect(() => buildGraph([{ id: "test", lat: NaN, lon: -100 }], [])).toThrow(TypeError);
});
```

**Result:** Achieved 100% statement coverage and 95.34% branch coverage.

### 3. Complex Test Scenarios for Graph Algorithm Validation

**Challenge:**
Testing graph algorithms with real geographic data required careful consideration of:
- Floating-point precision in distance calculations
- Deterministic sorting when distances are equal
- Performance with larger datasets
- Edge cases with identical coordinates

**Solution Strategy:**
- Used `toBeCloseTo()` matcher for floating-point comparisons
- Implemented stable sorting tests with identical distances
- Created performance tests with simulated large datasets
- Added specific test cases for geographical edge cases (poles, equator)

**Example Implementation:**
```javascript
test("findNearby sorting edge case - cities with exact same distance", () => {
  const center = { id: "CENTER", lat: 0, lon: 0 };
  const cityA = { id: "A", lat: 1, lon: 0 };
  const cityB = { id: "B", lat: 0, lon: 1 };
  // Test ensures stable sorting by ID when distances are equal
});
```

### 4. Comprehensive JavaDoc Documentation Standards

**Challenge:**
Adding professional-level JavaDoc documentation that follows best practices while maintaining consistency across all classes and methods.

**Solution Strategy:**
- Followed standard JavaDoc conventions with `@param`, `@return`, `@throws` tags
- Added comprehensive class-level documentation explaining purpose and business rules
- Included usage examples where appropriate
- Documented thread-safety considerations for concurrent components

**Example Implementation:**
```java
/**
 * Builds an undirected weighted graph with distances in kilometers
 * @param nodes Array of node objects [{id, name?, lat, lon}]
 * @param edges Array of edge objects [{from, to}]
 * @returns Graph object with byId Map and adj Map for adjacency lists
 * @throws TypeError When nodes or edges are not arrays
 * @throws Error When edges reference non-existent nodes
 * 
 * @example
 * const nodes = [
 *   { id: "MTY", name: "Monterrey", lat: 25.6866, lon: -100.3161 }
 * ];
 */
```

### 5. Cross-Language Documentation Consistency

**Challenge:**
Maintaining documentation standards across both JavaScript and Java components while ensuring both languages follow their respective best practices.

**Solution Strategy:**
- Used JSDoc for JavaScript files with comprehensive examples
- Applied JavaDoc standards for Java classes with detailed parameter descriptions
- Ensured consistent authorship and date information across all files
- Maintained business rule documentation in both language contexts

## Strategies for Problem Resolution

### 1. Systematic Debugging Approach
- Always check coverage reports before assuming tests are complete
- Use browser developer tools to inspect coverage HTML for visual identification of uncovered lines
- Implement logging and detailed error messages for better debugging

### 2. Test-Driven Development Enhancement
- Write failing tests first for edge cases
- Use descriptive test names that explain the specific scenario
- Group related tests logically using `describe` blocks

### 3. Performance Consideration Strategy
- Include performance tests to ensure scalability
- Use realistic data sizes in test scenarios
- Monitor test execution time to identify potential bottlenecks

### 4. Documentation as Code Philosophy
- Treat documentation with same rigor as code
- Include examples in documentation that can serve as integration tests
- Maintain version information and authorship for accountability

## Key Learnings and Best Practices

### Technical Learnings
1. **Module System Understanding:** ES6 modules require specific Jest configuration for proper testing
2. **Coverage Analysis:** Visual coverage reports are essential for identifying untested code paths
3. **Geographic Data Handling:** Floating-point calculations need careful testing with appropriate precision tolerances
4. **Algorithm Testing:** Complex algorithms require both correctness and performance validation

### Process Improvements
1. **Incremental Coverage Goals:** Aim for 100% coverage incrementally rather than all at once
2. **Edge Case Enumeration:** Systematically identify and test all possible edge cases
3. **Cross-Review Benefits:** Having multiple perspectives on test scenarios improves quality
4. **Documentation Standards:** Consistent documentation improves maintainability and team collaboration

## Tools and Technologies Mastered

1. **Jest Testing Framework:** Advanced features including coverage reporting, mocking, and ES6 module support
2. **Code Coverage Analysis:** Istanbul.js integration for comprehensive coverage metrics
3. **JavaDoc Generation:** Professional documentation standards for enterprise-level code
4. **Git Workflow:** Branch management and collaborative development practices

## Conclusion

Sprint 2 successfully enhanced the testing infrastructure and documentation quality of the project. The challenges encountered provided valuable learning opportunities in modern JavaScript testing, comprehensive coverage analysis, and professional documentation standards. The strategies developed during this sprint establish a solid foundation for future development phases and can serve as best practices for similar projects.

The achievement of 100% statement coverage and 95.34% branch coverage demonstrates the effectiveness of systematic testing approaches and thorough edge case analysis. The comprehensive JavaDoc documentation ensures code maintainability and provides clear guidance for future developers working on the project.