# Canonical Screenshots — Visual Ground Truth

Captured at 1920×900 desktop viewport on 2026-05-29 from `https://web-forge-1197.preview.emergentagent.com/`.

These are the **stakeholder-approved final state** of each section. If a build doesn't match these, something has regressed.

| File | Section | Capture notes |
|---|---|---|
| `01-hero-peak.jpeg` | Hero | Captured at t=6s into page load — full PEAK phase, all 5 text reveals fired, number swarm at full density. Notice green = `+`, red = `-` correlation. |
| `02-different-approach.jpeg` | Row 2 — A different approach | After viewport entry + subhead reveal animation complete |
| `03-disciplines-assembled.jpeg` | Section 3 — Disciplines Foundation | Captured after the ~3.2s entry sequence — all 5 cards in position, core materialized, connector lines drawn, payoff line landed |
| `04-pressure-exhibit.jpeg` | Section 4 — Pressure Exhibit | Captured after the ghost-to-canvas core handoff, with swarm active (red pressures flying in, green outcomes emitting) |
| `05-how-we-work.jpeg` | How We Work | Video playing mid-loop (post-crossfade-in, before next loop boundary) |
| `06-metrics.jpeg` | Metrics row | After rolling counter animation completes |
| `07-where-we-work.jpeg` | Where We Work | Industries grid |
| `08-cta-footer.jpeg` | CTA + Footer | The "Stop chasing numbers. Start building the foundation." closer and the canonical footer |

## Recapture script

If you need to regenerate these (e.g., after changes), the Playwright Python script is the source-of-truth pattern. See the handoff history in this conversation for the exact script, or replicate the viewport (1920×900) + waits documented above.
