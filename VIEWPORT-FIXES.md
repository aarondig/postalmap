# Viewport Unit Fixes for Mobile-in-Frame

## Problem Summary
The `<canvas>` elements rendered by React Three Fiber change size based on browser window height, even though they should be constrained to the 375×812px device frame.

**Root Causes Identified:**
1. Frame scales with `max-height` media queries (lines 147-184 in devices.css)
2. Viewport units (`vh`, `vw`, `svh`) in desktop styles resolve against browser viewport, not the 812px frame

---

## Phase 1: Remove Max-Height Scaling

**Goal:** Eliminate frame scaling so the device stays at fixed 375×812px regardless of window size.

**File:** `src/styles/devices.css`

### Tasks

- [ ] **1.1** Comment out or remove the max-height media queries (lines 147-184)
  ```css
  /* REMOVE THESE: */
  @media (max-height: 920px) { .device-frame { transform: scale(0.95); } }
  @media (max-height: 870px) { .device-frame { transform: scale(0.9); } }
  @media (max-height: 820px) { .device-frame { transform: scale(0.85); } }
  @media (max-height: 770px) { .device-frame { transform: scale(0.8); } }
  @media (max-height: 720px) { .device-frame { transform: scale(0.75); } }
  @media (max-height: 670px) { .device-frame { transform: scale(0.7); } }
  ```

- [ ] **1.2** Test: Resize browser window height - frame should NOT change size
- [ ] **1.3** Test: Canvas elements should no longer scale with window height
- [ ] **1.4** Note: Frame may get cut off on short screens (acceptable for now)

---

## Phase 2: Convert Viewport Units to Frame-Relative Values

**Goal:** Replace `vh`/`vw`/`svh` units with fixed pixel values based on 375×812 frame.

**File:** `src/styles/devices.css`

### Conversion Reference
| Viewport Unit | Frame-Relative Value | Calculation |
|---------------|---------------------|-------------|
| `1vh` | `8.12px` | 812 / 100 |
| `1vw` | `3.75px` | 375 / 100 |
| `80vh` | `650px` | 812 × 0.80 |
| `50vh` | `406px` | 812 × 0.50 |
| `42vh` | `341px` | 812 × 0.42 |
| `24vh/svh` | `195px` | 812 × 0.24 |
| `16vh` | `130px` | 812 × 0.16 |
| `12vh` | `97px` | 812 × 0.12 |
| `10vh` | `81px` | 812 × 0.10 |
| `4vh` | `32px` | 812 × 0.04 |
| `2vh` | `16px` | 812 × 0.02 |
| `75vw` | `281px` | 375 × 0.75 |
| `50vw` | `188px` | 375 × 0.50 |
| `12vw` | `45px` | 375 × 0.12 |
| `6vw` | `22px` | 375 × 0.06 |

### Tasks - Height Units (vh/svh)

- [ ] **2.1** Line 244: `.nav-bar { height: 12vh }` → `height: 97px`
- [ ] **2.2** Line 264: `.nav-inner-wrap { padding: 16vh 10% 10vh 10% }` → `padding: 130px 10% 81px 10%`
- [ ] **2.3** Line 335-336: `.nav-link-title.md { padding-top: 2.2vh; padding-bottom: 1vh }` → `padding-top: 18px; padding-bottom: 8px`
- [ ] **2.4** Line 341-342: `.nav-link-title.lg { padding-top: 2.2vh; padding-bottom: 2vh }` → `padding-top: 18px; padding-bottom: 16px`
- [ ] **2.5** Line 377: `.section-wrap { padding: 12vh 10% }` → `padding: 97px 10%`
- [ ] **2.6** Line 427: `#view .text-c { padding-top: 42vh }` → `padding-top: 341px`
- [ ] **2.7** Line 465: `.image-c { height: 80vh }` → `height: 650px`
- [ ] **2.8** Line 524: `.subtitle { margin-bottom: 2vh }` → `margin-bottom: 16px`
- [ ] **2.9** Line 535: `.video-c { height: 80vh }` → `height: 650px`
- [ ] **2.10** Line 569: `.view-button-hitboxes { height: 80vh }` → `height: 650px`
- [ ] **2.11** Line 574: `.view-button-hitboxes { padding-bottom: 24vh }` → `padding-bottom: 195px`
- [ ] **2.12** Line 743: `.detail-inner { gap: 12vh }` → `gap: 97px`
- [ ] **2.13** Line 747: `.detail-item { margin-bottom: 2vh }` → `margin-bottom: 16px`
- [ ] **2.14** Line 769: `.title-section .title { margin-bottom: 4vh }` → `margin-bottom: 32px`
- [ ] **2.15** Line 843: `#text .title { margin-bottom: 2vh }` → `margin-bottom: 16px`
- [ ] **2.16** Line 851: `#text .subtitle { margin-bottom: 2vh }` → `margin-bottom: 16px`
- [ ] **2.17** Line 914: `#title .title { margin-bottom: 2vh }` → `margin-bottom: 16px`
- [ ] **2.18** Line 922: `#title .subtitle { margin-bottom: 2vh }` → `margin-bottom: 16px`
- [ ] **2.19** Line 1051: `#video { height: 80vh }` → `height: 650px`
- [ ] **2.20** Line 1127: `#detail .title { margin-bottom: 2vh }` → `margin-bottom: 16px`
- [ ] **2.21** Line 1158: `#detail .row { gap: 12vh }` → `gap: 97px`
- [ ] **2.22** Line 1195: `#home .info-c { height: 24svh }` → `height: 195px`
- [ ] **2.23** Line 1202: `#home .text-c { min-height: 12svh }` → `min-height: 97px`

### Tasks - Width Units (vw)

- [ ] **2.24** Line 557: `.slider-image { min-width: 75vw; height: 50vw }` → `min-width: 281px; height: 188px`
- [ ] **2.25** Line 714: `.carousel-nav { gap: 12vw }` → `gap: 45px`
- [ ] **2.26** Line 768: `.title-section .title { font-size: 6vw }` → `font-size: 22px`
- [ ] **2.27** Line 1007: `.card { min-width: 75vw }` → `min-width: 281px`
- [ ] **2.28** Line 1016: `.thumbnail { height: 50vw }` → `height: 188px`
- [ ] **2.29** Line 1228: `#home .row { gap: 12vw }` → `gap: 45px`

---

## Testing Checklist

### After Phase 1
- [ ] Mobile (≤768px): No changes - works exactly as before
- [ ] Desktop: Frame stays fixed at 375×812px
- [ ] Desktop: Canvas no longer changes size when resizing window height
- [ ] Desktop: Frame may be cut off on short screens (expected)

### After Phase 2
- [ ] Mobile (≤768px): Still no changes - works exactly as before
- [ ] Desktop: All spacing/sizing consistent regardless of window size
- [ ] Desktop: Navigation bar correct height
- [ ] Desktop: Parallax sections (view, image, video) correct proportions
- [ ] Desktop: Home page info section correct height
- [ ] Desktop: Slider cards correct size

---

## Rollback
If issues occur, revert changes to `src/styles/devices.css` only. Mobile CSS files are never modified.

---

## Notes
- All changes are scoped to `.device-screen` selectors
- Mobile CSS files (`@media max-width: 768px`) remain untouched
- Frame dimensions: 375px width × 812px height (iPhone X logical resolution)
