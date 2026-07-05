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

## Next steps

- Replace placeholder names, venue, address, map link, and photos when real data is ready.
- Review the mobile page visually and request polish changes if needed.
