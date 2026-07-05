# Wedding Mobile Invitation Design

## Goal

Build a mobile-only wedding invitation site for `15.08.2026` in a premium minimalist wedding style. The page is a long vertical HTML/CSS/JavaScript site with no backend. All names, dates, text, links, and images remain easy to replace later.

## Visual Direction

Selected direction: **B, Silk and petals**.

The design uses a soft beige silk/atlas background with subtle blurred petal-like highlights. The palette stays calm and wedding-like: milk, beige, grey-brown, dark brown, graphite-brown, powder rose, and muted grey-blue. Cards are translucent and light, with thin white borders and soft shadows. Buttons are brown with white text. The page should feel expensive, quiet, romantic, airy, and minimal.

## Typography

- Display headings: `Cormorant Garamond`, with `Playfair Display` as a fallback option.
- Script accents: `Allura`, with `Great Vibes` as a fallback option.
- Body text and form controls: `Manrope`, with `Montserrat` or system sans-serif fallback.

## Page Structure

1. Hero screen with the label `ПРИГЛАШЕНИЕ НА СВАДЬБУ`, names `СЫЛДЫС & АЛЕНА`, the date block `АВГУСТ / 15 / 2026`, and a small down arrow.
2. Guest greeting card with the heading `РОДНЫЕ И БЛИЗКИЕ!`, script intro, body text, and date `15 АВГУСТА 2026`.
3. Countdown section with a darkened couple-photo placeholder background and four live units: days, hours, minutes, seconds.
4. Day program card with three timeline items: `15:00`, `16:00`, `17:00`.
5. Location card with text for `"Рояль-Холл"`, a brown `НА КАРТЕ` button linking to `https://maps.google.com`, and a venue image placeholder.
6. Dress Code card with text, six color squares, and a three-column moodboard collage made from placeholder images.
7. Guest questionnaire card with name field, attendance radio buttons, drinks checkboxes, submit button, and an inline success message: `Спасибо! Ваш ответ сохранён.`
8. Final closing block with `С НЕТЕРПЕНИЕМ`, script `ждём Вас!`, and monogram `С & А`.

## Technical Design

Use three files:

- `index.html` for semantic content and easily editable copy.
- `styles.css` for the full visual system, mobile layout, cards, typography, animation, and responsive guardrails.
- `script.js` for countdown logic, scroll reveal animation, and the no-backend form success message.

The main canvas is constrained to `390px` and centered in the viewport so desktop preview still shows the intended iPhone-like composition. The site itself is mobile-first and does not need a desktop layout.

## Motion

Sections fade and rise gently as they enter the viewport. The silk background moves subtly with a slow animation. No harsh motion, bright colors, or heavy effects.

## Verification

Open the page locally in the browser and inspect it at 390px width. Confirm the hero, cards, countdown, moodboard, form, and final block fit cleanly without horizontal scrolling or clipped text.
