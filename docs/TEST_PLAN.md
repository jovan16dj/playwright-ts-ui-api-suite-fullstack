# Test Plan and Strategy

## 1. Introduction

This document describes the testing approach for a simple full‑stack web application consisting of a React frontend and a Node.js backend API. The goal is to demonstrate automated coverage of key user flows and API endpoints, ensuring functional correctness and regression safety.

## 2. Scope

### 2.1 UI Automation (React App)

- **Login**: Valid and invalid credential scenarios.
- **Item Management**:
  - Create a new item.
  - Edit an existing item.
  - Delete an item.
  - Verify presence or absence of items after each action.

### 2.2 API Automation (Node.js Backend)

- **Authentication**: `POST /login` (positive and negative).
- **CRUD Endpoints** for `/items`:
  - `GET /items`
  - `POST /items`
  - `PUT /items/:id`
  - `DELETE /items/:id`

## 3. Test Coverage Areas

### 3.1 Positive Test Cases

- Successful login redirects to dashboard.
- Creating, updating, and deleting items returns expected status codes and response bodies.

### 3.2 Negative Test Cases

- Invalid login returns 401 and error message.
- Updating or deleting non‑existent IDs returns 404.
- Attempting to create items with invalid payloads returns 400.

### 3.3 Edge Cases

- Empty or malformed request bodies.
- Handling of rapid consecutive operations (race conditions).

## 4. Tools and Rationale

- **Playwright Test Runner** for both UI and API: fast setup, cross‑browser support, built‑in fixtures, HTTP request capabilities, and snapshot testing.
- **TypeScript**: static typing for maintainable test code.
- **GitHub Actions**: automated CI to run tests on every push/PR.

## 5. Test Execution

See `README.md` for local setup instructions including installation, running the backend, and executing tests.

### 5.2 Continuous Integration

- Workflow triggers on `push` and `pull_request`.
- Steps:
  1. Checkout code.
  2. Setup Node.js.
  3. Install dependencies.
  4. Start backend.
  5. Run UI and API tests.
  6. Upload artifacts (screenshots, traces, coverage reports).

## 6. Assumptions and Limitations

- Backend runs at `http://localhost:5001` by default.
- Database state is reset before each test run.
- No performance or security testing included.
- Visual snapshot testing is limited to core flows to avoid excessive maintenance.
- Cleanup logic is intentionally omitted to keep the test code simpler and because the data is not persisted—each session starts with a clean state.

## 7. Backend coverage note

The backend is a minimal Express stub used only for functional UI/API demos.
It spins up, handles a handful of requests, and exits almost instantly, leaving no executable lines for V8 to record.
As a result, Codecov currently shows 0 % for the backend.
A future iteration could switch to c8 instrumentation on long‑running integration tests or introduce unit tests with Jest to generate meaningful coverage.
