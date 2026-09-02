# Changelog

All notable changes to the CxE EMEA Step Tracker are documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) and follows the [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format.

---

## [Unreleased]

### Added

- This changelog.

### Security

- Bump `browserslist` from 4.28.4 to 4.28.8 (indirect, lockfile only).

---

## [0.1.0] — 2026-09-01

First tagged release. Munich-themed step tracker for the CxE EMEA Offsite 2026 (11–14 May, Microsoft München).

### Added

- Dashboard with daily progress ring, goal tracking, weekly chart, daily focus, and quick-entry buttons.
- Configurable landmark and EMEA-history challenges, including stretch goals.
- Eight-team roster with live per-team standings and a Total Stomp aggregate.
- Per-walker leaderboard; team picker lives on Profile.
- Welcome flow with cross-device dedupe by display name and team.
- Optional Firebase Anonymous Auth + Firestore cloud sync, with IndexedDB offline buffering.
- Internal admin view for roster and live columns.
- About tab with event dates, suggested Munich routes, FAQ, and a GDPR-oriented privacy notice.
- Alpine editorial visual system (Inter, light + dark themes) documented in `DESIGN.md`.
- Brand favicon set and web manifest.

### Changed

- Team display names no longer include people; legacy `"Team / Leader"` strings still fold onto the canonical roster.
- Challenge copy no longer names individuals.
- README and Firebase setup describe generic static hosting. Clone URL, em/en dashes, and hosting notes updated.
- About privacy section no longer lists Azure Static Web Apps as a third party.

### Removed

- Azure Static Web Apps CI/CD workflow, `staticwebapp.config.json`, and the deploy token. Pushes to `main` no longer publish a site.
- GitHub Pages deployment (superseded earlier, then retired with Azure).

### Fixed

- iPhone empty-leaderboard layout, mobile Content-Security-Policy, reset/cloud parity, and roster drift.
- Total Stomp no longer counts pre-onboarding mock rows.
- Team association no longer silently buckets skipped walkers.
- Security advisories in npm dependencies (protobufjs, `@grpc/grpc-js`, `@babel/core`, websocket-driver, postcss).

[Unreleased]: https://github.com/Manaiakalani/CxEEMEAStepTracker/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/Manaiakalani/CxEEMEAStepTracker/releases/tag/v0.1.0
