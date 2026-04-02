# Decision Replay

## Goal
Turn the result screen into a guided, scrollable replay of the decision instead of showing all analysis blocks at once.

The replay should feel like a narrative:
1. the user sees the decision question
2. the app introduces the strongest option
3. the app walks through the key tradeoffs
4. the app reveals the full ranking
5. the app ends with unknowns and a final verdict

This should increase:
- perceived product quality
- emotional impact of the result
- clarity for first-time users
- shareability of result pages

## MVP Scope
Implement `Decision Replay` on the existing result page using the current `AnalysisResponse`.

Do not add new backend endpoints in v1.
Do not change the analysis schema in v1.
Do not add auth in v1.

## Existing Data We Can Reuse
The current result payload already contains everything needed for a first version:
- `normalizedQuestion`
- `verdict`
- `confidence`
- `optionResults[]`
- `optionResults[].summary`
- `optionResults[].pros`
- `optionResults[].cons`
- `optionResults[].risks`
- `optionResults[].criterionScores`
- `optionResults[].weightedScore`
- `unknowns[]`

## Product Definition
`Decision Replay` is a sequential presentation mode for the result page.

Instead of dropping the user straight into:
- scoreboard
- comparison grid
- unknowns

the page should guide the user through a staged reveal:

### Step 1: Decision Intro
Show:
- the original question
- short explanation that the app built a structured recommendation
- confidence badge

### Step 2: Leading Option
Show:
- the top-ranked option
- weighted score
- one-sentence summary
- primary callout like `this option currently leads`

### Step 3: Why It Leads
Show 3-4 strongest reasons:
- best scoring criteria
- strongest pros
- one key tradeoff

This section should feel like the "why" behind the score.

### Step 4: Full Ranking
Show all options in ranked order:
- rank
- label
- score
- short summary

This is where the user sees the broader comparison.

### Step 5: Deep Comparison
Expandable section with:
- pros
- cons
- risks
- criterion breakdown

This is the detailed layer for users who want to inspect reasoning.

### Step 6: Unknowns
Show:
- what could still change the outcome
- what information is missing

This prevents the result from looking overconfident.

### Step 7: Final Verdict
End with:
- final recommendation
- confidence
- share CTA
- optional "run another decision" CTA

## UX Requirements
- The replay should be readable as a narrative, not a dashboard.
- The first viewport should contain only the intro and first decision signal.
- The user should discover more information by scrolling.
- Detail-heavy sections should be collapsed or visually deferred.
- The page should remain useful when opened directly from a shared link.

## UI Requirements
Add the following UI patterns:

### Replay Rail
A vertical progress rail or section index showing where the user is in the replay:
- intro
- leader
- why
- ranking
- details
- unknowns
- verdict

This can be sticky on desktop and simplified on mobile.

### Staged Reveal
Each section should have:
- clear section title
- short supporting copy
- stronger spacing between sections
- optional reveal-on-scroll motion

### Spotlight Card
The leading option should be presented in a larger, highlighted card separate from the comparison grid.

### Deferred Detail
Detailed option comparison should not appear at full intensity immediately.
Use one of:
- collapsible cards
- tabs per option
- accordion rows

Recommendation for v1:
- accordion per option

## Technical Approach
Implement the replay as a new result presentation layer on the frontend.

### Frontend Structure
Add or refactor toward:
- `ResultReplayView.tsx`
- `ResultReplayView.css.ts`
- small subcomponents if needed:
  - `ReplaySection`
  - `ReplayRail`
  - `LeadingOptionCard`
  - `RankingList`
  - `OptionAccordion`

### Suggested Route Integration
Keep the existing route:
- `/result/:shareSlug`

Keep `ResultPage.tsx` as the data-loading container.

Replace the current result body with:
- `ResultReplayView` for the new narrative experience

Optionally keep the current insight-heavy layout behind a local flag during development.

## Data Mapping Rules
Use these mapping rules in v1:

### Leading Option
The leading option is:
- `optionResults` sorted descending by `weightedScore`
- take index `0`

### Why It Leads
Build this section from:
- top 2 highest `criterionScores`
- top 1-2 `pros`
- 1 most important `cons` or `risks`

This can be selected deterministically in the UI first.
No extra AI call is needed in v1.

### Ranking
Use sorted `optionResults`.

### Unknowns
Render `unknowns[]` exactly as delivered by the backend.

## Motion Requirements
Motion should support comprehension, not decorate randomly.

Use:
- reveal on scroll for major sections
- progress indicator activation as sections enter view
- subtle number / bar transitions for ranking and scores

Do not use:
- generic hover lift as the main effect
- constant floating motion everywhere
- autoplay animation loops that distract from reading

## Accessibility Requirements
- Replay sections must remain readable without animation.
- All interactions must work with keyboard.
- Accordions must use proper button semantics and aria state.
- Respect `prefers-reduced-motion`.

## Implementation Plan

### Phase 1: Replace Current Layout
- Create `ResultReplayView`
- Keep current `ResultPage` query logic
- Add replay sections in static order
- Move existing content into the new structure

### Phase 2: Add Replay Navigation
- Add sticky progress rail on desktop
- Highlight active section based on scroll
- Add mobile-safe fallback navigation

### Phase 3: Reduce Information Density
- Convert detailed option cards into accordions
- Keep only the leading option expanded by default
- Push criterion breakdown deeper in the flow

### Phase 4: Motion and Polish
- Add reveal-on-scroll for sections
- Animate score bars and section transitions
- Tune spacing and typography for a calmer reading experience

## Acceptance Criteria
- The result page no longer dumps all data in the first viewport.
- The leading option is clearly introduced before the full comparison.
- Users can scroll through the result as a story.
- Detailed reasoning is still available without overwhelming the page.
- Shared links still work with the new layout.
- No backend changes are required for v1.

## Non-Goals
- No new AI call to generate replay copy in v1
- No user auth
- No persistence changes
- No editable result state

## Future Extensions
Possible v2 directions:
- replay mode generated by AI as a polished narrative
- voiceover mode
- timeline scrubber
- compare two replay states after changing weights
- save replay in a user history area
