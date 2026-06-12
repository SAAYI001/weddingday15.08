# Wedding Mobile Invitation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a mobile-only premium minimalist wedding invitation site for `15.08.2026`.

**Architecture:** The project is a static frontend with one semantic HTML file, one visual CSS file, and one behavior JavaScript file. The page is constrained to a 390px mobile canvas and uses editable constants/content directly in the markup and script.

**Tech Stack:** HTML, CSS, JavaScript, Google Fonts, browser APIs (`IntersectionObserver`, `setInterval`, `FormData` not required).

---

## File Structure

- Create `index.html`: semantic long-page content, editable text, form fields, placeholder image blocks.
- Create `styles.css`: 390px mobile canvas, premium wedding theme, silk background, cards, timeline, palette, moodboard, form, scroll reveal states.
- Create `script.js`: countdown to `2026-08-15T00:00:00`, section reveal animation, no-backend form success message.
- Modify `state/progress.md`: record implementation and verification status.

### Task 1: HTML Structure

**Files:**
- Create: `C:\Users\Admin\Desktop\15.08.26\index.html`

- [ ] **Step 1: Create the semantic page skeleton**

Create `index.html` with linked fonts, `styles.css`, and `script.js`.

- [ ] **Step 2: Add all required sections**

Add hero, greeting, countdown, program, location, dress code, guest form, and final block using test data from the spec.

- [ ] **Step 3: Add easy replacement hooks**

Use clear class names and attributes such as `data-countdown`, `data-reveal`, and `data-success-message` so later edits are straightforward.

### Task 2: Premium Mobile Styling

**Files:**
- Create: `C:\Users\Admin\Desktop\15.08.26\styles.css`

- [ ] **Step 1: Define theme variables**

Add color, shadow, radius, and font variables for milk, beige, grey-brown, dark brown, powder rose, and muted blue.

- [ ] **Step 2: Style the 390px mobile canvas**

Center a `390px` app shell in the viewport and prevent horizontal scrolling.

- [ ] **Step 3: Style each section**

Implement silk background, thin white borders, translucent cards, countdown photo placeholder, program timeline, location block, palette, moodboard, form controls, and final monogram.

- [ ] **Step 4: Add motion**

Add background drift and scroll reveal transitions with reduced-motion support.

### Task 3: JavaScript Behavior

**Files:**
- Create: `C:\Users\Admin\Desktop\15.08.26\script.js`

- [ ] **Step 1: Add countdown logic**

Calculate the remaining days, hours, minutes, and seconds until `2026-08-15T00:00:00+07:00` and update the four counters every second.

- [ ] **Step 2: Add reveal animation**

Use `IntersectionObserver` to add `is-visible` to `[data-reveal]` sections.

- [ ] **Step 3: Add no-backend form handling**

On submit, prevent page reload, show `Спасибо! Ваш ответ сохранён.`, and reset the form.

### Task 4: Verification

**Files:**
- Modify: `C:\Users\Admin\Desktop\15.08.26\state\progress.md`

- [ ] **Step 1: Open the page locally**

Serve the folder locally and open it in the browser.

- [ ] **Step 2: Verify mobile view**

Set browser viewport to `390px` width and check that the hero, cards, countdown, moodboard, form, and final block fit without horizontal scrolling.

- [ ] **Step 3: Verify behavior**

Confirm the countdown updates, reveal animation applies, map button points to `https://maps.google.com`, and form submission shows the success message.

- [ ] **Step 4: Update progress**

Record what was built and verified in `state/progress.md`.

## Self-Review

- Spec coverage: all eight required sections, visual style, fonts, countdown, form behavior, and verification are covered.
- Placeholder scan: image content intentionally uses visual placeholders because real photos will be replaced later.
- Type consistency: JavaScript hooks are consistently named as `data-countdown`, `data-reveal`, and `data-success-message`.
