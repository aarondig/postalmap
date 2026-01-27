# Postalmap: Mobile-in-Frame (Tablet/Desktop) Implementation Plan

## North Star
Mobile experience is perfect and must remain unchanged.  
Tablet and desktop should render the *same mobile UI* inside a centered iPhone X mockup using the existing `devices.css` markup.

---

## Goals

### G1 — Preserve Mobile (Do Not Touch)
- Mobile (<= 768px) remains full-screen and behaves exactly as it does today.
- No changes to mobile vh/vw usage, scrolling, navigation behavior, or animations.
- Avoid edits to `src/routes/mobile/**` unless absolutely required and explicitly approved.

### G2 — Unify App Experience Across Viewports
- Remove/disable the separate desktop landing experience.
- All viewport sizes render the mobile app.
- Tablet/Desktop render the mobile app *inside the device frame wrapper*.

### G3 — Device Frame Presentation (Tablet/Desktop)
- Use `devices.css` + existing iPhone X markup (no external device mockup libraries).
- iPhone frame stays centered in the viewport (vertical + horizontal).
- App is mounted inside the device “screen” container.
- The device “screen” is constrained to fixed mobile dimensions (iPhone X: 375x812 logical layout).

### G4 — Scrolling + Containment
- Overflow content scrolls reliably on every page, including scene pages.
- Define exactly one scroll strategy for tablet/desktop:
  - Preferred: scroll inside the device “screen” container (not the browser window).
- Content must not bleed outside rounded corners; clip/overflow must be correct.

### G5 — Positioning Behavior Within Frame
- Fixed UI (navigation, overlays) behaves fixed relative to the device screen (not the browser viewport) on tablet/desktop.
- No breakpoint weirdness where behavior changes only above certain heights (e.g., >900px).

---

## Known Risks / Prior Issues

### R1 — Legacy Desktop/Tablet Styling Interference
- Existing “web/desktop” routes and CSS may still load and override mobile presentation.
- We must audit and isolate these styles so they cannot affect the framed mobile UI.

### R2 — Viewport Units Inside a Framed Container
- Mobile UI uses vh/vw or `--app-vh/--app-vw` patterns.
- On tablet/desktop, these can resolve against the browser viewport and break framing.
- We must avoid rewriting mobile CSS; instead we’ll use wrapper-level containment and scoped overrides.

### R3 — Centering vs Scroll Conflicts
- Common failure mode: centering via flex/grid causes scroll container height/overflow to collapse.
- Must explicitly set heights on wrapper, device screen, and scroll container.

---

## Non-Goals (For This Phase)
- Refactoring mobile CSS to remove vh/vw.
- Rewriting navigation animation logic unless necessary.
- Adding new libraries or mockup packages.
- Re-architecting routing beyond removing the desktop landing output.

---

## Acceptance Criteria (Definition of Done)

### Mobile (<=768px)
- Looks and behaves exactly like current production behavior.
- No frame, no layout regressions, no scroll regressions.

### Tablet/Desktop (>768px)
- The page shows a full-page background + centered iPhone X frame.
- Mobile UI renders inside the device screen at correct scale.
- The device screen is the scroll container, and scrolling works on all pages.
- Navigation + overlays remain contained to the device screen (not browser viewport).
- No layout changes based on viewport height thresholds other than intended scaling.

---

## Implementation Tasks (Recommended Order)

### Phase 0 — Baseline + Safety
1. **Create a rollback checkpoint**
   - Ensure clean git status.
   - Create a branch or local checkpoint commit: `chore/frame-wrapper-baseline`.
2. **Define a “mobile untouched” rule**
   - Add a note in plan + avoid edits to `src/routes/mobile/**`.

### Phase 1 — Audit Current Desktop/Tablet Behavior
3. **Identify current desktop landing path**
   - Find where the desktop route renders (router logic, `src/routes/web/**`, or conditional render).
   - Document how it chooses desktop vs mobile.
4. **Inventory desktop/tablet CSS that may interfere**
   - List all files in `src/routes/web/**`, global styles, and any desktop-specific media queries.
   - Identify any global selectors that could affect mobile DOM when wrapped.

Deliverable: “Repo Map” section with file paths + responsibilities.

### Phase 2 — Wrapper Layout Contract (MobileShell)
5. **Create/confirm `MobileShell` wrapper component**
   - Behavior:
     - <=768px: render children directly (no frame, no extra containers).
     - >768px: render:
       - background layer
       - centered iPhone X markup
       - screen container that mounts the mobile app
6. **Centering + sizing**
   - Use a full-viewport wrapper (`min-height: 100vh; width: 100%`) with `display: grid; place-items: center;`
   - Ensure device frame does not cause page scroll itself.
7. **Scrolling responsibility**
   - Make the device screen container the scroll container:
     - explicit `height` (or `block-size`) matching screen
     - `overflow-y: auto; -webkit-overflow-scrolling: touch;`
   - Confirm the mobile app root expands naturally inside the screen container.

Deliverable: “Layout contract” CSS notes (which element owns height, overflow, centering).

### Phase 3 — Remove Desktop Landing Output
8. **Update routing so desktop also mounts mobile app**
   - Remove desktop landing render path.
   - Ensure tablet/desktop now render `<MobileShell><Mobile/></MobileShell>` (or equivalent).
   - Confirm no web route code is still mounted.

Deliverable: single routing decision path.

### Phase 4 — Fix Frame-Relative Fixed Positioning
9. **Ensure fixed elements are fixed to frame**
   - If using transforms for scaling, ensure the frame container always has a transform at tablet/desktop (even `scale(1)`).
   - Verify this solves the “>900px height” behavior difference.
10. **Verify overlays / nav-active containment**
   - Ensure overlay widths/heights resolve against the screen container.

Deliverable: documented explanation of why this works (containing block / stacking context).

### Phase 5 — Stabilize Viewport Unit Conflicts (Without Touching Mobile CSS)
11. **Audit vh/vw usage + custom properties**
   - Categorize raw vh/vw and `--app-vh/--app-vw`.
   - Identify which are safe because they’re inside the scroll container and which are unsafe because they reference viewport.
12. **Wrapper-level override strategy (desktop/tablet only)**
   - Prefer:
     - keep mobile CSS unchanged
     - add wrapper-scoped variables only if necessary
   - Avoid converting everything to `%` if it breaks scale.

Deliverable: short list of required overrides (if any), with risk notes.

### Phase 6 — QA Pass
13. **Manual test matrix**
   - Mobile: iPhone Safari/Chrome sizes
   - Tablet: 768–1024 widths
   - Desktop: 1280+ widths
   - Heights: 700, 900, 1000+
   - DevTools open (reduced viewport)
14. **Regression checks**
   - All pages scroll
   - Nav behaves
   - No bleed outside frame
   - No unexpected zoom/scale

---

## Open Questions (Answer These Before Coding Risky Parts)
- Should tablet/desktop scroll be inside the device screen only, or should the entire browser page scroll?
- On desktop/tablet, should the screen be fixed-size always, or scale down responsively to fit shorter heights?

(If unclear, default to: screen scrolls internally, frame scales down on short heights.)

---

## Next Claude Code Step (What to do first)
- Produce a “Repo Map” with exact file paths and where:
  - routing decision happens
  - desktop landing is mounted
  - devices.css iPhone frame markup lives
  - scroll container is defined
  - navigation/overlay is defined
- Then propose 2–3 implementation options with risks.
- Do NOT implement until approved.
