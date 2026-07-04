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

## Next steps

- Replace placeholder names, venue, address, map link, and photos when real data is ready.
- Review the mobile page visually and request polish changes if needed.
