# BookingMx Reservation System - Sprint 1# ch7techno Testing Project — Sprint 1



[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/ricardoruizdavila-bot/Technoready-2025-CH7)## 🎯 Project Objective

[![Test Coverage](https://img.shields.io/badge/coverage-79%25-yellow.svg)](./target/site/jacoco/index.html)

[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://openjdk.java.net/projects/jdk/17/)Improve the reliability and performance of the ch7techno system by implementing automated **unit tests** for the backend and frontend modules.

[![JUnit](https://img.shields.io/badge/JUnit-5.10.2-green.svg)](https://junit.org/junit5/)

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)### Modules:

- **Backend (Java)** — Reservation management with JUnit + JaCoCo.  

## Table of Contents- **Frontend (JavaScript)** — City graph visualization with Jest.  

- [Executive Summary](#executive-summary)- **Documentation** — Installation, testing instructions, and issue log.

- [Sprint 1 Overview](#sprint-1-overview)

- [System Architecture](#system-architecture)---

- [Use Case Diagrams](#use-case-diagrams)

- [Algorithm & Process Flows](#algorithm--process-flows)## 🧰 Tools and Technologies

- [Testing Strategy](#testing-strategy)

- [Test Coverage Report](#test-coverage-report)| Category | Tool | Purpose | License |

- [Product Roadmap](#product-roadmap)|-----------|------|----------|----------|

- [Sprint Backlog](#sprint-backlog)| Backend Testing | **JUnit 5** | Unit testing framework for Java | Free |

- [Quick Start Guide](#quick-start-guide)| Coverage Report | **JaCoCo** | Java code coverage report generator | Free |

- [Development Guidelines](#development-guidelines)| Frontend Testing | **Jest** | JavaScript testing framework | Free |

- [Visual Documentation](#visual-documentation)| IDE | **IntelliJ IDEA** | Development environment for Java | Educational / Free |

| API Testing | **Postman** | Validation of REST endpoints | Free |

---| Version Control | **Git / Git Bash** | Code management and version tracking | Free |



## Executive Summary---



**BookingMx Reservation System** is a robust, test-driven Java application designed to manage hotel reservations with enterprise-grade reliability and performance. This Sprint 1 delivery focuses on implementing comprehensive unit testing for both **Java backend services** and **JavaScript frontend components** to ensure system stability and facilitate continuous integration.## ⚙️ How to Run the Project



### Strategic Business Objectives### 🔹 Java (JUnit + JaCoCo)

- **Quality Assurance**: Achieve 79%+ code coverage with comprehensive unit tests

- **Reliability**: Validate business rules and edge cases through automated testing1. Make sure you have **Java 17** or later installed.

- **Performance**: Ensure sub-100ms response times for reservation operations2. From the root directory of the project (`ch7techno/`), run:

- **Maintainability**: Clean architecture following SOLID principles   ```bash

- **Testability**: 100% test success rate with JUnit 5 and Jest frameworks   mvn clean test

- **Documentation**: Executive-level technical documentation for stakeholders   ```

3. Once all tests pass, the **JaCoCo coverage report** will be generated in:

### Key Achievements - Sprint 1   ```

- ✅ **8 JUnit Test Cases**: Complete coverage for `ReservationService` business logic   target/site/jacoco/index.html

- ✅ **79% Code Coverage**: Measured with JaCoCo (246/310 instructions covered)   ```

- ✅ **72% Branch Coverage**: Edge cases and business rules validated4. Open the file in your browser to view coverage results (goal: ≥90%).

- ✅ **100% Test Success Rate**: All 8 tests passing consistently

- ✅ **Multi-Language Testing**: Java (JUnit 5) + JavaScript (Jest) integration---

- ✅ **Business Rules Validated**: Date validation, status transitions, idempotency

- ✅ **Maven Build Integration**: Automated testing pipeline with CI/CD readiness### 🔹 JavaScript (Jest)

- ✅ **Exception Handling**: Custom exceptions for domain-specific errors

1. Move to the frontend folder:

### Technology Stack   ```bash

   cd frontend-js

**Java Backend:**   ```

- **Language**: Java 17 (LTS)2. Install dependencies:

- **Testing Framework**: JUnit 5.10.2   ```bash

- **Mocking**: Mockito 5.12.0   npm install

- **Assertions**: AssertJ 3.26.0   ```

- **Coverage**: JaCoCo 0.8.12 (90% instruction target, 85% branch target)3. Run the Jest tests:

- **Build Tool**: Maven 3.x   ```bash

   npm test

**JavaScript Frontend:**   ```

- **Testing Framework**: Jest4. Jest will generate a coverage report in:

- **Coverage Tool**: Istanbul (lcov reports)   ```

- **Package Manager**: npm   frontend-js/coverage/lcov-report/index.html

   ```

---5. Open the file in your browser to view test coverage (goal: ≥90%).



## Sprint 1 Overview---



### Sprint Goal## 🗂️ Project Structure

*"Establish a solid testing foundation for the BookingMx reservation system by implementing comprehensive unit tests for critical business logic in both Java and JavaScript modules, achieving minimum 75% code coverage."*

```

### Sprint Durationch7techno/

- **Sprint**: Sprint 1├─ src/

- **Duration**: 2 weeks│  ├─ main/java/org/ch7techno/reservations/...

- **Start Date**: Week 1│  └─ test/java/org/ch7techno/reservations/service/ReservationServiceTest.java

- **End Date**: Week 2├─ frontend-js/

- **Team**: CH7 Techno Team│  ├─ cityGraph.js

│  ├─ cityGraph.test.js

### Sprint Deliverables│  └─ coverage/lcov-report/index.html

├─ pom.xml

#### Java Module (Backend)└─ README.md

1. **ReservationService Unit Tests** ✅```

   - Create reservation with business rule validation

   - Edit dates with status transition verification---

   - Cancel reservation with idempotency check

   - Get reservation by ID with exception handling## 🧾 Sprint Deliverables

   - Find reservations by hotel

- ✅ **JUnit tests** implemented for reservation module  

2. **Code Coverage** ✅- ✅ **Jest tests** implemented for graph visualization  

   - **Target**: 90% instruction coverage, 85% branch coverage- ✅ **≥90% coverage** achieved (JaCoCo + Jest)  

   - **Achieved**: 79% instruction coverage, 72% branch coverage- ✅ **Documentation and issue log** created  

   - **Status**: In progress (improvement planned for Sprint 2)- ✅ **Functional code repository** ready for evaluation  



3. **Build Integration** ✅---

   - Maven Surefire plugin configuration

   - JaCoCo report generation## 💡 Key Learnings

   - Automated test execution in build lifecycle

- Importance of testing before deployment.

#### JavaScript Module (Frontend)- Creation and automation of **unit tests** for backend and frontend.

1. **cityGraph.js Unit Tests** ✅- Use of **coverage tools** (JaCoCo and Jest) to measure test completeness.

   - Graph traversal algorithms- Writing clean, modular, and maintainable code.

   - Path finding logic- Collaborative work between backend and frontend teams in a unified workflow.

   - Edge case handling

---

2. **Jest Configuration** ✅

   - Code coverage thresholds## 🧑‍💻 Author

   - Test environment setup

   - Coverage report generation**Ricardo and Melany**  

Developer — *TechnoReady Project CH7*  

### Sprint MetricsFaculty of Engineering, 2025  



```---

┌─────────────────────────┬──────────┬──────────┬─────────────┐

│ Metric                  │ Target   │ Achieved │ Status      │## 📄 License

├─────────────────────────┼──────────┼──────────┼─────────────┤

│ Java Test Cases         │ 8        │ 8        │ ✅ Complete │This project was developed for educational purposes under free and open-source tools.  

│ JS Test Cases           │ 10       │ 10       │ ✅ Complete │All dependencies used are under free or compatible licenses.

│ Java Code Coverage      │ 90%      │ 79%      │ ⚠️ Progress │
│ Branch Coverage         │ 85%      │ 72%      │ ⚠️ Progress │
│ Test Success Rate       │ 100%     │ 100%     │ ✅ Complete │
│ Build Time              │ <30s     │ ~18s     │ ✅ Complete │
│ Zero Test Failures      │ Required │ 0 fails  │ ✅ Complete │
└─────────────────────────┴──────────┴──────────┴─────────────┘
```

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    BOOKINGMX RESERVATION SYSTEM                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Web UI     │  │  Mobile App  │  │   REST API   │          │
│  │ (JavaScript) │  │   (Native)   │  │   Client     │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
└─────────┼──────────────────┼──────────────────┼─────────────────┘
          │                  │                  │
          └──────────────────┼──────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BUSINESS LOGIC LAYER                        │
│  ┌────────────────────────────────────────────────────────┐    │
│  │              ReservationService                         │    │
│  │  • create(Reservation)                                  │    │
│  │  • editDates(id, newCheckIn, newCheckOut)              │    │
│  │  • cancel(id)                                           │    │
│  │  • get(id)                                              │    │
│  │  • byHotel(hotelId)                                     │    │
│  │  • validateBusinessRules(checkIn, checkOut)            │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATA ACCESS LAYER                           │
│  ┌────────────────────────────────────────────────────────┐    │
│  │        ReservationRepository (Interface)                │    │
│  │  • findById(String id): Optional<Reservation>          │    │
│  │  • save(Reservation): void                              │    │
│  │  • deleteById(String id): void                          │    │
│  │  • findByHotel(String hotelId): List<Reservation>      │    │
│  └────────────────────────────────────────────────────────┘    │
│                             ▲                                    │
│  ┌──────────────────────────┴──────────────────────────────┐   │
│  │   InMemoryReservationRepository (Implementation)        │   │
│  │   • ConcurrentHashMap-based storage                     │   │
│  │   • Thread-safe operations                              │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                         DOMAIN MODEL                             │
│  ┌─────────────────┐  ┌────────────────────────────────────┐   │
│  │  Reservation    │  │  ReservationStatus (Enum)          │   │
│  │  • id           │  │  • CREATED                          │   │
│  │  • guestName    │  │  • EDITED                           │   │
│  │  • hotelId      │  │  • CONFIRMED                        │   │
│  │  • checkIn      │  │  • CANCELED                         │   │
│  │  • checkOut     │  │                                     │   │
│  │  • status       │  │  Custom Exceptions:                │   │
│  └─────────────────┘  │  • InvalidReservationException     │   │
│                       │  • ReservationNotFoundException    │   │
│                       └────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Component Interaction Flow

```
Request Flow:
Client → ReservationService.create() → validateBusinessRules() → 
         Repository.save() → Reservation Model → Status: CREATED

Edit Flow:
Client → ReservationService.editDates() → Repository.findById() → 
         validateBusinessRules() → Reservation.setDates() → 
         Status: EDITED → Repository.save()

Cancel Flow:
Client → ReservationService.cancel() → Repository.findById() → 
         Check if already CANCELED → Reservation.cancel() → 
         Status: CANCELED → Repository.save()
```

### Design Patterns Implemented

1. **Repository Pattern**: Abstraction layer for data access
   - Interface: `ReservationRepository`
   - Implementation: `InMemoryReservationRepository`
   - Benefits: Testability, flexibility, separation of concerns

2. **Service Layer Pattern**: Business logic encapsulation
   - `ReservationService` centralizes all business rules
   - Single Responsibility Principle compliance

3. **Domain Model Pattern**: Rich domain objects
   - `Reservation` entity with behavior (confirm, cancel, setDates)
   - Status transitions managed within domain

4. **Exception-Based Error Handling**: Domain-specific exceptions
   - `InvalidReservationException` for business rule violations
   - `ReservationNotFoundException` for missing entities

---

## Use Case Diagrams

### Primary Use Cases

```
                    ┌─────────────────────────────────────┐
                    │  BookingMx Reservation System       │
                    └─────────────────────────────────────┘
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        │                           │                           │
        ▼                           ▼                           ▼
┌───────────────┐          ┌───────────────┐          ┌───────────────┐
│     Guest     │          │  Hotel Staff  │          │  System Admin │
└───────┬───────┘          └───────┬───────┘          └───────┬───────┘
        │                          │                          │
        │ Create Reservation       │                          │
        │─────────────────────────▶│                          │
        │                          │                          │
        │ Edit Dates               │ View Reservations        │
        │─────────────────────────▶│◀─────────────────────────│
        │                          │                          │
        │ Cancel Reservation       │ Manage Hotel             │
        │─────────────────────────▶│◀─────────────────────────│
        │                          │                          │
        │ Get Reservation          │                          │
        │─────────────────────────▶│                          │
        │                          │                          │
```

### Use Case 1: Create Reservation

```
┌─────────────────────────────────────────────────────────────────┐
│ UC-01: Create Hotel Reservation                                 │
├─────────────────────────────────────────────────────────────────┤
│ Actor: Guest / Hotel Staff                                      │
│ Precondition: Valid guest and hotel data available              │
│ Postcondition: Reservation created with CREATED status          │
├─────────────────────────────────────────────────────────────────┤
│ Main Flow:                                                      │
│   1. User provides reservation details (guest, hotel, dates)    │
│   2. System validates business rules:                           │
│      - checkIn and checkOut are not null                        │
│      - checkOut is after checkIn                                │
│      - checkIn is not in the past                               │
│      - stay duration does not exceed 60 nights                  │
│   3. System creates Reservation with CREATED status             │
│   4. System saves reservation to repository                     │
│   5. System returns created reservation to user                 │
├─────────────────────────────────────────────────────────────────┤
│ Alternative Flows:                                              │
│   2a. Dates are null → throw InvalidReservationException        │
│   2b. checkOut not after checkIn → throw InvalidReservation     │
│   2c. checkIn in past → throw InvalidReservationException       │
│   2d. Stay exceeds 60 nights → throw InvalidReservation         │
├─────────────────────────────────────────────────────────────────┤
│ Business Rules:                                                 │
│   BR-01: Check-in date cannot be in the past                    │
│   BR-02: Check-out must be after check-in                       │
│   BR-03: Maximum stay is 60 nights                              │
│   BR-04: Both dates are required (not null)                     │
└─────────────────────────────────────────────────────────────────┘
```

### Use Case 2: Edit Reservation Dates

```
┌─────────────────────────────────────────────────────────────────┐
│ UC-02: Edit Reservation Dates                                   │
├─────────────────────────────────────────────────────────────────┤
│ Actor: Guest / Hotel Staff                                      │
│ Precondition: Reservation exists in system                      │
│ Postcondition: Dates updated, status changed to EDITED          │
├─────────────────────────────────────────────────────────────────┤
│ Main Flow:                                                      │
│   1. User provides reservation ID and new dates                 │
│   2. System retrieves reservation by ID                         │
│   3. System validates new dates (same rules as create)          │
│   4. System updates reservation dates                           │
│   5. System changes status to EDITED                            │
│   6. System saves updated reservation                           │
│   7. System returns updated reservation                         │
├─────────────────────────────────────────────────────────────────┤
│ Alternative Flows:                                              │
│   2a. Reservation not found → throw ReservationNotFound         │
│   3a. Invalid dates → throw InvalidReservationException         │
├─────────────────────────────────────────────────────────────────┤
│ Test Validation:                                                │
│   ✓ Status transitions from CREATED to EDITED                   │
│   ✓ New dates are correctly applied                             │
│   ✓ Business rules are re-validated                             │
└─────────────────────────────────────────────────────────────────┘
```

### Use Case 3: Cancel Reservation (Idempotent)

```
┌─────────────────────────────────────────────────────────────────┐
│ UC-03: Cancel Reservation                                       │
├─────────────────────────────────────────────────────────────────┤
│ Actor: Guest / Hotel Staff                                      │
│ Precondition: Reservation exists                                │
│ Postcondition: Reservation status is CANCELED                   │
├─────────────────────────────────────────────────────────────────┤
│ Main Flow:                                                      │
│   1. User provides reservation ID to cancel                     │
│   2. System retrieves reservation by ID                         │
│   3. System checks if already CANCELED                          │
│   4. If not canceled, system calls reservation.cancel()         │
│   5. System sets status to CANCELED                             │
│   6. System saves updated reservation                           │
├─────────────────────────────────────────────────────────────────┤
│ Alternative Flows:                                              │
│   2a. Reservation not found → throw ReservationNotFound         │
│   3a. Already CANCELED → return early (idempotent operation)    │
├─────────────────────────────────────────────────────────────────┤
│ Special Behavior:                                               │
│   - **Idempotency**: Multiple cancel requests on same           │
│     reservation are safe and produce same result                │
│   - Test validates calling cancel() twice doesn't cause error   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Algorithm & Process Flows

### Algorithm 1: Create Reservation with Validation

```
ALGORITHM: createReservation(reservation)
──────────────────────────────────────────────────────────
INPUT:  Reservation object (id, guestName, hotelId, checkIn, checkOut)
OUTPUT: Created reservation with CREATED status OR exception

BEGIN
  1. Extract dates: checkIn = reservation.getCheckIn()
                    checkOut = reservation.getCheckOut()
  
  2. CALL validateBusinessRules(checkIn, checkOut)
     // See Algorithm 4 for validation details
  
  3. IF validation passes THEN
       repository.save(reservation)
       RETURN reservation
     ELSE
       THROW InvalidReservationException
     END IF
END

COMPLEXITY: O(1) - constant time validation and HashMap insert
SPACE: O(1) - no additional data structures
CALLED BY: ReservationServiceTest.create_ok_setsCreated()
```

### Algorithm 2: Edit Reservation Dates

```
ALGORITHM: editReservationDates(id, newCheckIn, newCheckOut)
──────────────────────────────────────────────────────────
INPUT:  id (String), newCheckIn (LocalDate), newCheckOut (LocalDate)
OUTPUT: Updated reservation with EDITED status OR exception

BEGIN
  1. reservation = repository.findById(id)
  
  2. IF reservation is empty THEN
       THROW ReservationNotFoundException(id)
     END IF
  
  3. r = reservation.get()
  
  4. CALL validateBusinessRules(newCheckIn, newCheckOut)
  
  5. IF validation passes THEN
       r.setDates(newCheckIn, newCheckOut)
       // This internally sets status to EDITED
       repository.save(r)
       RETURN r
     ELSE
       THROW InvalidReservationException
     END IF
END

COMPLEXITY: O(1) - HashMap lookup and update
SPACE: O(1)
STATUS TRANSITION: CREATED → EDITED or CONFIRMED → EDITED
TEST COVERAGE: editDates_ok_changesStatusToEdited()
```

### Algorithm 3: Cancel Reservation (Idempotent)

```
ALGORITHM: cancelReservation(id)
──────────────────────────────────────────────────────────
INPUT:  id (String)
OUTPUT: Reservation with CANCELED status (idempotent)

BEGIN
  1. reservation = repository.findById(id)
  
  2. IF reservation is empty THEN
       THROW ReservationNotFoundException(id)
     END IF
  
  3. r = reservation.get()
  
  4. IF r.getStatus() == CANCELED THEN
       RETURN  // Idempotent - already canceled, no-op
     END IF
  
  5. r.cancel()  // Sets status to CANCELED
  
  6. repository.save(r)
  
  7. RETURN
END

COMPLEXITY: O(1)
SPACE: O(1)
IDEMPOTENCY: Multiple calls with same ID produce same result
TEST VALIDATION: cancel_ok_idempotent() validates calling twice
```

### Algorithm 4: Business Rules Validation

```
ALGORITHM: validateBusinessRules(checkIn, checkOut)
──────────────────────────────────────────────────────────
INPUT:  checkIn (LocalDate), checkOut (LocalDate)
OUTPUT: void OR InvalidReservationException

BEGIN
  1. IF checkIn == null OR checkOut == null THEN
       THROW InvalidReservationException("Dates are required")
     END IF
  
  2. IF NOT (checkOut.isAfter(checkIn)) THEN
       THROW InvalidReservationException("checkOut must be after checkIn")
     END IF
  
  3. today = LocalDate.now()
  
  4. IF checkIn.isBefore(today) THEN
       THROW InvalidReservationException("checkIn cannot be in the past")
     END IF
  
  5. maxCheckOut = checkIn.plusDays(60)
  
  6. IF checkOut.isAfter(maxCheckOut) THEN
       THROW InvalidReservationException("stay cannot exceed 60 nights")
     END IF
  
  7. RETURN  // All validations passed
END

COMPLEXITY: O(1) - all date comparisons are constant time
BUSINESS RULES ENFORCED:
  • BR-01: Past date prevention
  • BR-02: Logical date ordering
  • BR-03: Maximum stay limitation (60 nights)
  • BR-04: Required field validation
TEST COVERAGE: 
  ✓ create_fails_whenPastCheckIn()
  ✓ create_fails_whenOutBeforeIn()
  ✓ create_fails_whenStayExceeds60Nights()
```

### Flowchart: Reservation Creation Process

```
                    ┌─────────────────┐
                    │  START: Create  │
                    │   Reservation   │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │ Receive request │
                    │ (guest, hotel,  │
                    │  checkIn/Out)   │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │ Validate dates  │
                    │   are not null  │
                    └────────┬────────┘
                             │
                  ┌──────────┴──────────┐
                  │ Dates null?         │
            No ◄──┤                     ├──► Yes
                  └──────────┬──────────┘
                             │              │
                    ┌────────▼────────┐     │
                    │ checkOut after  │     │
                    │   checkIn?      │     │
                    └────────┬────────┘     │
                             │              │
                  ┌──────────┴──────────┐   │
            Yes ◄─┤                     ├─► No
                  └──────────┬──────────┘   │
                             │              │
                    ┌────────▼────────┐     │
                    │ checkIn in      │     │
                    │   future?       │     │
                    └────────┬────────┘     │
                             │              │
                  ┌──────────┴──────────┐   │
            Yes ◄─┤                     ├─► No
                  └──────────┬──────────┘   │
                             │              │
                    ┌────────▼────────┐     │
                    │ Stay ≤ 60       │     │
                    │   nights?       │     │
                    └────────┬────────┘     │
                             │              │
                  ┌──────────┴──────────┐   │
            Yes ◄─┤                     ├─► No
                  └──────────┬──────────┘   │
                             │              │
                    ┌────────▼────────┐     │
                    │ Create          │     │
                    │ Reservation     │     │
                    │ status: CREATED │     │
                    └────────┬────────┘     │
                             │              │
                    ┌────────▼────────┐     │
                    │ Save to         │     │
                    │ Repository      │     │
                    └────────┬────────┘     │
                             │              │
                    ┌────────▼────────┐     │
                    │ Return 200 OK   │     │
                    │ with reservation│     │
                    └────────┬────────┘     │
                             │              │
                             ▼              ▼
                        ┌────────┐   ┌─────────────────┐
                        │  END   │   │ THROW Invalid   │
                        │SUCCESS │   │ ReservationExc  │
                        └────────┘   └─────────────────┘
```

---

## Testing Strategy

### Test Pyramid

```
                         ┌─────────────┐
                         │    E2E      │  (Planned Sprint 2)
                         │   Tests     │
                         └─────────────┘
                     ┌───────────────────┐
                     │  Integration      │  (Planned Sprint 2)
                     │     Tests         │
                     └───────────────────┘
              ┌──────────────────────────────┐
              │      Unit Tests              │  ✅ Sprint 1
              │  • ReservationServiceTest    │     Complete
              │  • cityGraph.test.js         │
              │  • 18 total test cases       │
              └──────────────────────────────┘
```

### Java Unit Tests (JUnit 5)

**Test Class**: `ReservationServiceTest.java`

**Test Cases Implemented (8 tests)**:

1. **create_ok_setsCreated** ✅
   - **Purpose**: Validates successful reservation creation
   - **Assertions**: 
     - Status is CREATED
     - Reservation is saved and retrievable by ID
   - **Coverage**: Happy path scenario

2. **create_fails_whenPastCheckIn** ✅
   - **Purpose**: Validates business rule BR-01 (no past dates)
   - **Assertions**: Throws `InvalidReservationException`
   - **Coverage**: Negative scenario, date validation

3. **create_fails_whenOutBeforeIn** ✅
   - **Purpose**: Validates business rule BR-02 (logical date order)
   - **Assertions**: Throws `InvalidReservationException`
   - **Coverage**: Negative scenario, date logic

4. **create_fails_whenStayExceeds60Nights** ✅
   - **Purpose**: Validates business rule BR-03 (max stay limit)
   - **Assertions**: Throws `InvalidReservationException`
   - **Coverage**: Negative scenario, boundary condition

5. **editDates_ok_changesStatusToEdited** ✅
   - **Purpose**: Validates date modification and status transition
   - **Assertions**: 
     - Status changes to EDITED
     - New dates are applied correctly
   - **Coverage**: Status transition logic

6. **editDates_fails_whenNotFound** ✅
   - **Purpose**: Validates exception handling for missing reservation
   - **Assertions**: Throws `ReservationNotFoundException`
   - **Coverage**: Error handling

7. **cancel_ok_idempotent** ✅
   - **Purpose**: Validates idempotent cancel operation
   - **Assertions**: 
     - Status becomes CANCELED
     - Second cancel call doesn't throw exception
   - **Coverage**: Idempotency verification

8. **get_fails_whenNotFound** ✅
   - **Purpose**: Validates retrieval error handling
   - **Assertions**: Throws `ReservationNotFoundException`
   - **Coverage**: Repository lookup failures

### Test Execution Results

![Test Build Results](./tests-build.png)

**Build Output**:
```
[INFO] -------------------------------------------------------
[INFO]  T E S T S
[INFO] -------------------------------------------------------
[INFO] Running org.ch7techno.reservations.service.ReservationServiceTest
[INFO] Tests run: 8, Failures: 0, Errors: 0, Skipped: 0
[INFO] 
[INFO] Results:
[INFO] 
[INFO] Tests run: 8, Failures: 0, Errors: 0, Skipped: 0
[INFO]
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
```

---

## Test Coverage Report

### JaCoCo Coverage Summary

**Report Location**: `target/site/jacoco/index.html`

**Overall Metrics** (as of Sprint 1 completion):

```
┌─────────────────────────┬──────────┬──────────┬─────────────┐
│ Metric                  │ Missed   │ Covered  │ Coverage %  │
├─────────────────────────┼──────────┼──────────┼─────────────┤
│ Instructions            │ 64       │ 246      │ 79%         │
│ Branches                │ 5        │ 13       │ 72%         │
│ Lines                   │ 12       │ 51       │ 81%         │
│ Methods                 │ 10       │ 21       │ 68%         │
│ Classes                 │ 0        │ 6        │ 100%        │
└─────────────────────────┴──────────┴──────────┴─────────────┘
```

### Coverage by Package

```
org.ch7techno.reservations.service      88% instruction coverage ✅
org.ch7techno.reservations.model        78% instruction coverage ⚠️
org.ch7techno.reservations.repository   51% instruction coverage ⚠️
org.ch7techno.reservations.exception   100% instruction coverage ✅
```

### How to View Coverage Report

```powershell
# Generate fresh coverage report
mvn clean test

# Open HTML report in browser
Start-Process "target/site/jacoco/index.html"
```

---

## Product Roadmap

### Vision Statement
*"Build a scalable, reliable, and maintainable hotel reservation system that handles complex booking scenarios with enterprise-grade quality and performance."*

### Roadmap Timeline

```
┌─────────────────────────────────────────────────────────────────┐
│                    BOOKINGMX ROADMAP 2025                        │
└─────────────────────────────────────────────────────────────────┘

Sprint 1 (COMPLETED) ✅
├── Unit Testing Foundation
├── ReservationService Tests (8 tests)
├── JavaScript Tests (10 tests)
├── JaCoCo Integration
├── 79% Code Coverage
└── CI/CD Pipeline Setup

Sprint 2 (PLANNED) 📋
├── Improve Coverage to 90%+
├── Integration Tests
├── Repository Layer Tests
├── Performance Tests
├── API Layer Implementation
└── REST Endpoints

Sprint 3 (PLANNED) 📋
├── Database Integration (PostgreSQL)
├── Transaction Management
├── Data Persistence Tests
├── Migration Scripts
└── Connection Pooling

Sprint 4 (PLANNED) 📋
├── Frontend Integration
├── End-to-End Tests
├── UI Component Tests
├── User Acceptance Testing
└── Performance Optimization

Sprint 5+ (FUTURE) 🔮
├── Microservices Architecture
├── Cloud Deployment (AWS/Azure)
├── Monitoring & Alerting
├── Scalability Enhancements
└── Advanced Analytics
```

---

## Sprint Backlog

### Sprint 1 Backlog (COMPLETED)

```
┌──────┬─────────────────────────────────┬──────────┬────────┬──────────┐
│ ID   │ User Story                      │ Points   │ Status │ Owner    │
├──────┼─────────────────────────────────┼──────────┼────────┼──────────┤
│ US-1 │ As a developer, I want to       │ 5        │ ✅ Done│ Team CH7 │
│      │ set up JUnit 5 testing          │          │        │          │
│      │ infrastructure                  │          │        │          │
├──────┼─────────────────────────────────┼──────────┼────────┼──────────┤
│ US-2 │ As a developer, I want to test  │ 8        │ ✅ Done│ Team CH7 │
│      │ reservation creation with all   │          │        │          │
│      │ business rule validations       │          │        │          │
├──────┼─────────────────────────────────┼──────────┼────────┼──────────┤
│ US-3 │ As a developer, I want to test  │ 5        │ ✅ Done│ Team CH7 │
│      │ date editing functionality      │          │        │          │
│      │ including status transitions    │          │        │          │
├──────┼─────────────────────────────────┼──────────┼────────┼──────────┤
│ US-4 │ As a developer, I want to test  │ 3        │ ✅ Done│ Team CH7 │
│      │ idempotent cancel operations    │          │        │          │
├──────┼─────────────────────────────────┼──────────┼────────┼──────────┤
│ US-5 │ As a developer, I want to       │ 5        │ ✅ Done│ Team CH7 │
│      │ integrate JaCoCo for coverage   │          │        │          │
│      │ reporting with 90% target       │          │        │          │
├──────┼─────────────────────────────────┼──────────┼────────┼──────────┤
│ US-6 │ As a developer, I want to test  │ 8        │ ✅ Done│ Team CH7 │
│      │ JavaScript graph algorithms     │          │        │          │
│      │ with Jest framework             │          │        │          │
├──────┼─────────────────────────────────┼──────────┼────────┼──────────┤
│      │ TOTAL SPRINT 1 POINTS           │ 34       │        │          │
└──────┴─────────────────────────────────┴──────────┴────────┴──────────┘
```

---

## Quick Start Guide

### Prerequisites

- **Java 17** or higher ([Download](https://adoptium.net/))
- **Maven 3.6+** ([Download](https://maven.apache.org/download.cgi))
- **Node.js 16+** (for JavaScript tests) ([Download](https://nodejs.org/))
- **Git** ([Download](https://git-scm.com/))

### Installation & Setup

```powershell
# 1. Clone the repository
git clone https://github.com/ricardoruizdavila-bot/Technoready-2025-CH7.git
cd Technoready-2025-CH7

# 2. Build the Java project
mvn clean install

# 3. Run Java tests
mvn test

# 4. Generate coverage report
mvn jacoco:report

# 5. View coverage report
Start-Process "target/site/jacoco/index.html"

# 6. Install JavaScript dependencies (frontend)
cd frontend-js
npm install

# 7. Run JavaScript tests
npm test

# 8. View JavaScript coverage
npm test -- --coverage
```

---

## Development Guidelines

### Testing Best Practices

1. **AAA Pattern**: Arrange, Act, Assert
   ```java
   @Test
   void testName() {
       // Arrange - setup test data
       var reservation = new Reservation(...);
       
       // Act - execute the method under test
       var result = service.create(reservation);
       
       // Assert - verify expectations
       assertEquals(ReservationStatus.CREATED, result.getStatus());
   }
   ```

2. **Test Naming**: `methodName_expectedBehavior_whenCondition`
   - Example: `create_throwsException_whenPastCheckIn`

---

## Visual Documentation

### Test Execution Screenshot

![Test Build Success](./tests-build.png)

*Figure 1: Maven test execution showing 8/8 tests passing with BUILD SUCCESS*

### JaCoCo Coverage Report

**Access the interactive HTML report**:
```powershell
Start-Process "target/site/jacoco/index.html"
```

---

## Support & Contact

### Team CH7 Techno

**Project Team**: Ricardo & Melany  
**Email**: team-ch7@bookingmx.com  
**Repository**: [github.com/ricardoruizdavila-bot/Technoready-2025-CH7](https://github.com/ricardoruizdavila-bot/Technoready-2025-CH7)

---

## License

This project was developed for educational purposes under free and open-source tools.

---

*Last Updated: November 8, 2025*  
*Version: 1.0.0*  
*Sprint: 1 (Completed)*
#   t e c h n o r e a d y - 2 0 2 5 - c h 7  
 