# 2026-02-28 Oscars Predictions Contest Design Spec

## Problem
The company's internal predictions contest lacks a mechanism to automatically enforce voting deadlines and handle the transition to revealing results and calculating final scores.

## Goal
Implement a "ruthlessly simple" internal predictions contest with a 3-phase state machine (Voting Open, Ceremony Live, Results Revealed) governed by hardcoded timestamps.

## State Machine Architecture
*   **Phase 1: Voting Open:** Employees guess winners (current baseline state).
*   **Phase 2: Ceremony Live (Locked):** Voting closes at a hardcoded `CEREMONY_START` time (e.g., March 1, 2026, 8:00 PM EST).
*   **Phase 3: Results Revealed:** The app reveals actual Oscar winners and the company leaderboard at a hardcoded `CEREMONY_END` time (e.g., March 1, 2026, 11:30 PM EST).

## Identity
Employees authenticate and maintain their sessions using the existing honor-system name entry stored via `localStorage.getItem('oscarsVoterName')`.

## Changes

### Backend Changes (`server.js`)
*   **Timestamps:** Hardcode `CEREMONY_START` and `CEREMONY_END` constants.
*   **Lockout Logic:** Update `POST /api/vote` to reject submissions if `Date.now() > CEREMONY_START` by returning a `403 Forbidden` status.
*   **Results Reveal Logic:** Update `GET /api/winners` and create `GET /api/leaderboard` to return `403 Forbidden` with the message "Results hidden until ceremony ends" if `Date.now() < CEREMONY_END`.
*   **Leaderboard Calculation:** When Phase 3 is active (`Date.now() >= CEREMONY_END`), the server reads `data/votes.json` and `data/winners.json`. It scores each user by awarding 1 point per correct guess. The API returns a sorted JSON array: `[{ name: "Alice", score: 18, total: 24 }, ...]`.

### Frontend Changes (`script.js`, `index.html`, `style.css`)
*   **Phase 1 (Open):** Present the normal voting UI to users.
*   **Phase 2 (Live):** 
    *   Disable all category selection buttons to prevent input.
    *   Display a prominent banner stating: "Guesses Locked! Enjoy the show."
*   **Phase 3 (Results):** 
    *   Display the complete Leaderboard prominently at the top of the page.
    *   Iterate through all categories to highlight the actual Oscar winner with a gold background.
    *   Render a green checkmark next to the user's predicted winner if correct, or a red X if incorrect.

### Winner Data Entry
The administrator manually populates `data/winners.json` as the ceremony progresses or immediately after it concludes.

## Impact
This enforces strict deadlines preventing late entries, automates the transition from voting to spectating, and provides immediate, automated scoring without requiring a database beyond simple JSON files.

## Files Changed
*   `server.js` (Timestamps, endpoint protection, leaderboard calculation)
*   `script.js` (Phase transitions, UI state management, results rendering)
*   `index.html` (Banner elements, leaderboard container, status indicators)
*   `style.css` (Gold highlight, green checkmark, red X styling, banner styling)
*   `data/winners.json` (New or updated structure for correct answers)

## Agent Allocation

| Phase | Agent | Responsibility |
|-------|-------|---------------|
| Architecture | `zen-architect` | Review the state machine logic (Start/End timestamps) to ensure it doesn't break the existing JSON persistence model. |
| Backend & API | `modular-builder` | Implement the hardcoded timestamps, lockout logic in `server.js`, and the new `/api/leaderboard` scoring algorithm. |
| Frontend UI | `component-designer` | Build the Phase 2 lockout banner, the Phase 3 Leaderboard UI, and the gold/green/red visual feedback states in `index.html`/`style.css`. |
| Review | `test-coverage` | Verify the spec requirements (lockout, scoring, reveal times) are met. |
| Cleanup | `post-task-cleanup` | Final code hygiene. |

## Test Plan
1. **Voting Phase Validation:** Ensure system clock is before `CEREMONY_START`. Verify `POST /api/vote` succeeds. Verify `GET /api/leaderboard` returns `403 Forbidden`.
2. **Lockout Phase Validation:** Set system clock between `CEREMONY_START` and `CEREMONY_END`. Verify `POST /api/vote` returns `403 Forbidden`. Verify frontend displays "Guesses Locked! Enjoy the show." banner and disables buttons.
3. **Results Phase Validation:** Set system clock past `CEREMONY_END`. Verify `GET /api/leaderboard` succeeds and returns a sorted array. Verify frontend displays the leaderboard, gold highlights on winners, and correct checkmarks/crosses.
4. **Scoring Validation:** Provide a mock `data/votes.json` and `data/winners.json`. Verify the returned scores match manual calculations exactly (1 pt/correct).