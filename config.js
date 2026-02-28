/**
 * Oscars Contest Configuration
 * [AI:OPENCODE]
 */

const CONFIG = {
    // Phase 2: Voting closes at this time
    // March 1, 2026, 8:00 PM EST -> 2026-03-02T01:00:00Z
    CEREMONY_START: '2026-03-02T01:00:00Z',

    // Phase 3: Results revealed at this time
    // March 1, 2026, 11:30 PM EST -> 2026-03-02T04:30:00Z
    CEREMONY_END: '2026-03-02T04:30:00Z'
};

if (typeof module !== 'undefined') {
    module.exports = CONFIG;
}
