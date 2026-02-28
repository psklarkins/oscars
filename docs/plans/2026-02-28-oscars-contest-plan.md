# 2026-02-28 Oscars Predictions Contest Implementation Plan

This plan outlines the TDD-driven implementation for the Oscars Predictions Contest state machine, locking logic, and leaderboard display.

## Task 1: Architecture & Data Persistence
**Assigned Agent:** `zen-architect`
**Responsibility:** Review the state machine logic (Start/End timestamps) to ensure it doesn't break the existing JSON persistence model, and define the data structures.
*   **Write Tests:** Write schema validation tests and boundary tests for the existing `votes.json` and the new `winners.json` formats.
*   **Verify Failure:** Run the tests to confirm they fail because `winners.json` is missing/undefined and schemas aren't enforced.
*   **Implement:** Define the exact JSON schema for `winners.json` and establish the architectural boundaries for reading/writing safely during the 3 phases.
*   **Verify Pass:** Run the schema and persistence tests to ensure data integrity passes.

## Task 2: Backend State Machine & API Lockout
**Assigned Agent:** `modular-builder`
**Responsibility:** Implement the hardcoded timestamps, lockout logic in `server.js`, and the new `/api/leaderboard` scoring algorithm.
*   **Write Tests:** Write backend unit/integration tests (e.g., Jest/Supertest) for:
    *   `POST /api/vote` returning `403` after `CEREMONY_START`.
    *   `GET /api/winners` and `GET /api/leaderboard` returning `403` before `CEREMONY_END`.
    *   `/api/leaderboard` correctly scoring users (1 point per match) using mock JSON data.
*   **Verify Failure:** Execute tests; observe failures due to missing endpoint logic and constants.
*   **Implement:** Add `CEREMONY_START` and `CEREMONY_END` to `server.js`. Add the time-check middleware/logic to the API routes. Implement the leaderboard scoring algorithm iterating over `votes.json` against `winners.json`.
*   **Verify Pass:** Rerun backend tests and confirm all 403 lockouts and scoring calculations pass.

## Task 3: Frontend UI - Phase 2 Lockout Banner
**Assigned Agent:** `component-designer`
**Responsibility:** Build the Phase 2 lockout banner and disable inputs.
*   **Write Tests:** Write frontend DOM/component tests asserting that when the app state is "Live" (Phase 2), category buttons have the `disabled` attribute and a banner reading "Guesses Locked! Enjoy the show." is present.
*   **Verify Failure:** Run tests; confirm they fail as the frontend doesn't yet parse or respect the Phase 2 state.
*   **Implement:** Update `script.js` to evaluate the current time against the backend configuration or handle `403` responses by transitioning to Phase 2. Update `index.html` and `style.css` to render the banner and disable interactions.
*   **Verify Pass:** Run frontend tests and verify the UI updates appropriately for Phase 2.

## Task 4: Frontend UI - Phase 3 Leaderboard & Results Feedback
**Assigned Agent:** `component-designer`
**Responsibility:** Build the Phase 3 Leaderboard UI, and the gold/green/red visual feedback states in `index.html`/`style.css`.
*   **Write Tests:** Write frontend tests checking that in Phase 3, the leaderboard container is visible and populated, correct guesses receive a `.guess-correct` (green check) class, incorrect receive a `.guess-incorrect` (red X) class, and actual winners receive a `.winner-gold` class.
*   **Verify Failure:** Run tests; they will fail due to missing DOM elements and CSS classes.
*   **Implement:** Update `script.js` to fetch from `/api/leaderboard` and `/api/winners`. Inject the leaderboard HTML. Apply the correct CSS classes to the category options based on the user's vote vs. the actual winner.
*   **Verify Pass:** Rerun frontend tests and verify successful rendering of the results state.

## Task 5: Review & End-to-End Validation
**Assigned Agent:** `test-coverage`
**Responsibility:** Verify the spec requirements (lockout, scoring, reveal times) are met across the whole stack.
*   **Write Tests:** Write E2E integration tests simulating a user journey through Phase 1 (Voting), Phase 2 (Locked out), and Phase 3 (Viewing results and leaderboard).
*   **Verify Failure:** Run E2E tests against the partially integrated system to catch any boundary or timing issues between frontend and backend.
*   **Implement:** Fix any integration bugs, refine error handling, and ensure the state transitions smoothly without hard page reloads if required.
*   **Verify Pass:** Execute the E2E suite to confirm a 100% pass rate.

## Task 6: Final Code Hygiene
**Assigned Agent:** `post-task-cleanup`
**Responsibility:** Final code hygiene.
*   **Write Tests:** Add strict linting and formatting rules to the test suite (e.g., ESLint, Prettier).
*   **Verify Failure:** Run linters to identify unformatted code, unused variables, or console.logs left from debugging.
*   **Implement:** Clean up the codebase, remove dead code, and format files consistently.
*   **Verify Pass:** Run the linting checks to ensure zero warnings or errors remain.