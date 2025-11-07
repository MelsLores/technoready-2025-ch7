# BookingMx Testing Project — Sprint 1

## 📘 Context

**Teresa González** and **Karen Martínez** work at **BookingMx**, a Mexican website dedicated to the hotel industry.  
As members of the IT development team, they implemented a new feature: a **graph displaying nearby cities** relative to the customer’s destination and the distances between them.

After developing the MVP, the team optimized the code to improve performance. However, the new version failed in production — teaching an important lesson about the **need for unit testing** and **proper documentation**.

In the next sprint, Teresa created **unit tests for the JavaScript module** using **Jest**, while Karen handled **unit tests for the Java reservation module** using **JUnit**. Both agreed that all modules should reach **at least 90% code coverage** and include clear documentation.

---

## 🎯 Project Objective

Improve the reliability and performance of the BookingMx system by implementing automated **unit tests** for the backend and frontend modules.

### Modules:
- **Backend (Java)** — Reservation management with JUnit + JaCoCo.  
- **Frontend (JavaScript)** — City graph visualization with Jest.  
- **Documentation** — Installation, testing instructions, and issue log.

---

## 🧰 Tools and Technologies

| Category | Tool | Purpose | License |
|-----------|------|----------|----------|
| Backend Testing | **JUnit 5** | Unit testing framework for Java | Free |
| Coverage Report | **JaCoCo** | Java code coverage report generator | Free |
| Frontend Testing | **Jest** | JavaScript testing framework | Free |
| IDE | **IntelliJ IDEA** | Development environment for Java | Educational / Free |
| API Testing | **Postman** | Validation of REST endpoints | Free |
| Version Control | **Git / Git Bash** | Code management and version tracking | Free |

---

## ⚙️ How to Run the Project

### 🔹 Java (JUnit + JaCoCo)

1. Make sure you have **Java 17** or later installed.
2. From the root directory of the project (`ch7techno/`), run:
   ```bash
   mvn clean test
   ```
3. Once all tests pass, the **JaCoCo coverage report** will be generated in:
   ```
   target/site/jacoco/index.html
   ```
4. Open the file in your browser to view coverage results (goal: ≥90%).

---

### 🔹 JavaScript (Jest)

1. Move to the frontend folder:
   ```bash
   cd frontend-js
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Jest tests:
   ```bash
   npm test
   ```
4. Jest will generate a coverage report in:
   ```
   frontend-js/coverage/lcov-report/index.html
   ```
5. Open the file in your browser to view test coverage (goal: ≥90%).

---

## 🧩 Issue Log

Development challenges, bugs, and solutions were documented in a separate log file for continuous improvement.

File location:
```
docs/issues-log.md
```

Each entry includes:
- **Problem**
- **Cause**
- **Solution**
- **Validation result**

---

## 🗂️ Project Structure

```
ch7techno/
├─ src/
│  ├─ main/java/org/ch7techno/reservations/...
│  └─ test/java/org/ch7techno/reservations/service/ReservationServiceTest.java
├─ frontend-js/
│  ├─ cityGraph.js
│  ├─ cityGraph.test.js
│  └─ coverage/lcov-report/index.html
├─ docs/
│  ├─ issues-log.md
│  └─ screenshots/   ← (evidence saved separately)
├─ pom.xml
└─ README.md
```

---

## 🧾 Sprint Deliverables

- ✅ **JUnit tests** implemented for reservation module  
- ✅ **Jest tests** implemented for graph visualization  
- ✅ **≥90% coverage** achieved (JaCoCo + Jest)  
- ✅ **Documentation and issue log** created  
- ✅ **Functional code repository** ready for evaluation  

---

## 💡 Key Learnings

- Importance of testing before deployment.
- Creation and automation of **unit tests** for backend and frontend.
- Use of **coverage tools** (JaCoCo and Jest) to measure test completeness.
- Writing clean, modular, and maintainable code.
- Collaborative work between backend and frontend teams in a unified workflow.

---

## 🧑‍💻 Author

**Ricardo**  
Developer — *TechnoReady Project CH7*  
Faculty of Biotechnology Engineering, 2025  

---

## 📄 License

This project was developed for educational purposes under free and open-source tools.  
All dependencies used are under free or compatible licenses.
