# Progress

- Telegram RSVP production fix was pushed to `master` and verified in the new container: `/api/rsvp` returned `{"ok":true}`.
- Site slowness was measured on the VPS. HTML response is fast (`~0.13s`), so the bottleneck is page asset weight, not server CPU/RAM.
- Added production static caching in `server.js`:
  - `/assets/*` gets long immutable cache headers.
  - HTML/CSS/JS get short cache headers.
  - `.webp` MIME type is supported for the next image optimization step.
- Added early page optimization scripts in `index.html` and `invite.html` to disable audio preload and lazy-load secondary images.
- Added `tools/optimize-assets.ps1` to convert the large PNG assets to optimized JPG files and rewrite references.
- Remaining optimization work:
  - run `tools/optimize-assets.ps1`;
  - review generated JPG sizes;
  - commit/push and redeploy.
