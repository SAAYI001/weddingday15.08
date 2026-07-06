# Progress

## Current status

- Hero screen restyled toward a soft cream wedding invitation background, with floral/bokeh CSS decoration and a confirmation CTA linking to `#guest-form`.
- Hero screen updated to use the supplied wedding reference image as the full first-screen background while keeping the confirmation CTA linked to `#guest-form`.
- Location block now shows the Kyzyl address and opens an embedded Yandex Maps iframe with a fallback Yandex Maps link.
- Clean local Git commit `815e659` prepared in `C:\Temp\weddingday15-08-ready`; push to GitHub is blocked by command-line network access to `github.com:443`.
- New wedding invitation project folder created at `C:\Users\Admin\Desktop\15.08.26`.
- Visual direction selected: B, "Silk and petals" premium minimalist mobile invitation.
- Design specification written in `docs/superpowers/specs/2026-06-12-wedding-mobile-invitation-design.md`.
- Implementation plan written in `docs/superpowers/plans/2026-06-12-wedding-mobile-invitation.md`.
- Mobile-only static wedding invitation built in `index.html`, `styles.css`, and `script.js`.
- Countdown logic covered by `tests/countdown.test.cjs`.
- First hero photo updated to `assets/hero-invitation-cover.png`; confirmation CTA still opens `#guest-form`.
- Site text and button backgrounds updated to the wedding red tone `#ad575b`, covered by `tests/site-color.test.cjs`.
- Added opening invitation screen `assets/opening-invitation.png`; bottom arrow opens the main site at `#invitation`.
- Added styled couple photo section `assets/newlyweds.jpg` before the wedding countdown, with overlay captions removed; covered by `tests/couple-photo.test.cjs`.
- Wedding countdown moved into a transparent glass overlay at the bottom of the couple photo.
- Browser verification completed at mobile width: 8 sections present, no horizontal scroll, map uses Yandex Maps, and guest form shows the success message.
- Landing flow split into `index.html` and `invite.html`: `index.html` now shows a clickable animated envelope, then redirects to `invite.html` after 1.3 seconds.
- Shared styles moved from `styles.css` to `style.css`; tests now target `invite.html` for the invitation content and `index.html` for the opening envelope.
- In-app browser verification was attempted, but local `file://`, `127.0.0.1`, and `localhost` navigation were blocked by the browser client. Automated Node tests pass.
- Opening envelope text localized to Russian: "Свадебное приглашение", "Сылдыс & Алена", and "Нажмите на письмо, чтобы открыть"; typography tightened for the longer Russian labels.

- Opening screen labels centered in a constrained mobile text column; names reduced to prevent edge overflow.
- Added `assets/ishkin-oglu-churjejem-typ-aar.mp3` as looping invite music with a fixed top-right play/pause toggle on `invite.html`; covered by `tests/music-toggle.test.cjs`.
- Envelope click now starts the same looping music on `index.html`, remembers the request in session storage, and `invite.html` attempts to continue playback automatically; covered by `tests/music-toggle.test.cjs`.
- Location map is now always visible without the "НА КАРТЕ" button, and the Yandex Maps search targets `Рояль-Холл, г. Кызыл, ул. Каа-Хем, 106` at zoom 17 so the venue marker is shown; covered by `tests/location-map.test.cjs`.
- Location map now includes an explicit Yandex `pt=94.740760,51.701650,pm2rdm` POI marker centered on building 106 at zoom 18; covered by `tests/location-map.test.cjs`.
- Dress code palette no longer includes the dark almost-black `#4b3328` swatch; covered by `tests/site-color.test.cjs`.
- Dress code palette swatches are centered on the mobile page using a wrapping flex row; covered by `tests/site-color.test.cjs`.
- Day program section redesigned as a pastel vertical timeline with five wedding events, icon markers, decorative hearts, hover lift, and individual scroll reveal animation; covered by `tests/day-program.test.cjs`.
- Guest form no longer asks for drink preferences; covered by `tests/guest-form.test.cjs`.
- Dress code moodboard placeholder blocks (`Look`, `Detail`, `Suit`, `Palette`, `Dress`, `Texture`) replaced with `assets/dress-moodboard-girls.png` as a full-width rounded image card; covered by `tests/moodboard-image.test.cjs`.
- Added `assets/newlyweds-second.jpg` as a polished photo card between the day program and location sections; covered by `tests/newlyweds-second-photo.test.cjs`.
- Opening flow is now single-page on `index.html`: the envelope reveals the hidden invite shell without redirecting to `invite.html`, and the same `wedding-music` audio element continues playing; covered by `tests/opening-screen.test.cjs` and `tests/music-toggle.test.cjs`.
- Location description now starts with `Праздничный банкет...` without the `Выездная церемония и` phrase; covered by `tests/location-map.test.cjs`.
- Resumed on 2026-07-06: verified that the apparent Russian-text mojibake is limited to PowerShell output; `index.html` contains valid UTF-8 Russian text. Added a readable-text guard to `tests/opening-screen.test.cjs`.
- All 11 Node-based tests pass locally.
- Added root `.env` with empty `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` placeholders for manual Telegram setup.
- Added local Node server integration for Telegram RSVP submissions. The guest form now posts to `POST /api/rsvp`, `server.js` reads Telegram credentials from `.env`, sends formatted messages to Telegram, serves the static invitation, and keeps `.env` ignored by Git.
- Added `package.json` with `npm start` and `npm test`; `tests/telegram-rsvp.test.cjs` covers `.env` protection, frontend submission wiring, message formatting, successful sends, and missing Telegram configuration.
- Verification on 2026-07-06: `npm test` passes across all invitation tests plus the new Telegram RSVP coverage.
- Local server verification on 2026-07-06: `server.js` responds at `http://127.0.0.1:3000/` with the invitation page.
- Telegram send diagnosis on 2026-07-06: `.env` values are present and `/api/rsvp` is reached, but the local Codex-run environment blocks outbound Telegram HTTPS with `connect EACCES ...:443`. Test the real send from a normal terminal or VPS environment with outbound HTTPS enabled.
- Freed local port 3000 on 2026-07-06 by stopping the prior background `node server.js` process that was started from the restricted Codex environment.
- Added sanitized Telegram error logging on 2026-07-06: when `/api/rsvp` fails to send, `server.js` now prints the real Telegram/network error in the terminal while masking token and chat ID. `npm test` passes.
- User-run local Telegram diagnosis on 2026-07-06: normal `npm start` reaches `/api/rsvp`, but Telegram send fails with `connect ETIMEDOUT 149.154.166.110:443`, confirming an outbound network timeout to Telegram rather than a form or server-code issue.
- Prepared project for Dokploy deployment on 2026-07-06: added `Dockerfile`, `.dockerignore`, `.env.example`, `README.md` deploy notes, `/health` endpoint, and `tests/deploy-readiness.test.cjs`. `npm test` passes including deploy readiness coverage.

## Next steps

- Replace placeholder names, venue, address, map link, and photos when real data is ready.
- Review the mobile page visually and request polish changes if needed.
- For Dokploy deployment, connect the GitHub repository, choose Dockerfile build, set app port `3000`, set health path `/health`, add `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` environment variables, and attach the Beget domain with HTTPS.
