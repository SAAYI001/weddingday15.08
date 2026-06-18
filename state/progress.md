# Progress

## Current status

- Hero screen restyled toward a soft cream wedding invitation background, with floral/bokeh CSS decoration and a confirmation CTA linking to `#guest-form`.
- Hero screen updated to use the supplied wedding reference image as the full first-screen background while keeping the confirmation CTA linked to `#guest-form`.
- Location block now shows the Kyzyl address and opens an embedded Yandex Maps iframe with a fallback Yandex Maps link.
- New wedding invitation project folder created at `C:\Users\Admin\Desktop\15.08.26`.
- Visual direction selected: B, "Silk and petals" premium minimalist mobile invitation.
- Design specification written in `docs/superpowers/specs/2026-06-12-wedding-mobile-invitation-design.md`.
- Implementation plan written in `docs/superpowers/plans/2026-06-12-wedding-mobile-invitation.md`.
- Mobile-only static wedding invitation built in `index.html`, `styles.css`, and `script.js`.
- Countdown logic covered by `tests/countdown.test.cjs`.
- Browser verification completed at mobile width: 8 sections present, no horizontal scroll, map button points to `https://maps.google.com`, and guest form shows the success message.

## Next steps

- Replace placeholder names, venue, address, map link, and photos when real data is ready.
- Review the mobile page visually and request polish changes if needed.
