# Changelog

## 3.0.0 - 2026-09-12

### Changed

- Replaced the cloned README/terminal interface with an original build-lab visual system.
- Replaced the notch navigation, sticky sidebar, blueprint styling, and typing-test widget.
- Added a dark forest-green and acid-lime color system with bold editorial typography.
- Added a split hero, portfolio snapshot, project showcase cards, availability indicator, and high-contrast contact panel.
- Updated all production-facing identity, social, project, education, and achievement content for Aarnav Jaiswal.
- Switched the shared avatar to `/public/8bit-photo.png`.
- Made `NEXT_PUBLIC_SITE_URL` resilient to empty or malformed values so Vercel builds do not fail with `Invalid URL`.

### Fixed

- Removed stale Soham Maury references from app metadata, project/resource metadata, README, package metadata, and unused social helpers.
- Restored safe local fallback behavior when the Vercel site URL environment variable is unset.

## 2.0.0 - 2026-08-02

### Added

- Live visitor counting backed by Upstash Redis through `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.
- Light/dark theme support and a command palette.

### Fixed

- Improved the dark/light theme transition behavior.
