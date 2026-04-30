# CxE EMEA Step Tracker

[![Azure Static Web Apps CI/CD](https://github.com/Manaiakalani/CxEEMEAStepTracker/actions/workflows/azure-static-web-apps-gentle-cliff-07e205d03.yml/badge.svg)](https://github.com/Manaiakalani/CxEEMEAStepTracker/actions/workflows/azure-static-web-apps-gentle-cliff-07e205d03.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-1761A0.svg)](./LICENSE)

🔗 **Live:** <https://gentle-cliff-07e205d03.7.azurestaticapps.net>

A lightweight, Munich-themed step-tracking web app for the **CxE EMEA Offsite 2026**, running **11–14 May 2026** at the **Microsoft München office** (Walter-Gropius-Straße, Schwabing). Log your steps, climb landmark-inspired challenges, race your teammates on the leaderboard, and keep the offsite spirit alive between sessions.

> _"Match Munich's twin onion-domed towers, 98 m tall, watching over the Altstadt since 1488."_

## ✨ Features

- **Dashboard** — daily progress ring, goal tracking, weekly chart, today's focus, and quick-entry buttons.
- **Challenges** — Munich landmark-inspired step goals (Frauenkirche, Viktualienmarkt, Englischer Garten, Isar, Marienplatz, Microsoft München Mile, and more).
- **Leaderboard** — team standings _and_ a per-walker view, with a Top Stomp roll-up that aggregates every registered walker.
- **Profile** — set your name, team, and personal daily goal; switch teams any time.
- **Always-on cloud sync** — your steps mirror automatically to the shared offsite Firestore project (EU region) for a real-time leaderboard, with offline fallback so nothing is lost when Wi-Fi drops.
- **Responsive & themed** — Inter typeface, alpine palette, custom mountain silhouette, and a `#1761A0` brand accent.

## 🛠 Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (lazy-routed tabs via `React.lazy` + `Suspense`)
- [Vite 7](https://vitejs.dev/) for dev/build (manual chunks for `firebase` + `react`)
- [Tailwind CSS 4](https://tailwindcss.com/) (via `@tailwindcss/vite`)
- [Firebase 12](https://firebase.google.com/) — Anonymous Auth + Firestore (EU `eur3`), persistent IndexedDB cache
- [lucide-react](https://lucide.dev/) icons
- [Azure Static Web Apps](https://azure.microsoft.com/products/app-service/static) for hosting + CI/CD
- React Context + `localStorage` for state persistence

## 🎨 Design

The full design system — color tokens (incl. dark theme), typography ramps,
spacing, motion, elevation, and component recipes — lives in
[`DESIGN.md`](./DESIGN.md). It is fully self-contained and can be lifted
into any other project that wants the same visual language.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20+ and npm

### Install

```bash
git clone https://github.com/Manaiakalani/CxEEMEAStepTracker.git
cd CxEEMEAStepTracker
npm install
```

### Develop

```bash
npm run dev
```

Then open http://localhost:5173.

### Build & Preview

```bash
npm run build
npm run preview
```

### Type-check

```bash
npm run typecheck
```

## 📁 Project Structure

```
src/
├── App.tsx                 # Root + lazy-routed tabs (Suspense)
├── main.tsx                # Vite entry
├── store.ts                # React context + localStorage persistence
├── data.ts                 # Challenges, teams, seed data
├── theme.ts                # Brand colors / tokens
├── lib/
│   ├── format.ts           # Date + number helpers
│   └── cloud-sync.ts       # Firebase Auth + Firestore (EU)
├── components/             # UI building blocks (TopNav, Hero, Leaderboard, …)
└── pages/                  # Dashboard, Leaderboard, Profile, About
```

## 💾 Data & Privacy (GDPR-friendly)

Anything you enter — display name, team, daily goal, and step counts — is
kept on this device (`localStorage` + Firestore's IndexedDB cache) **and**
mirrored to a Firebase Firestore database hosted by Google Cloud in the EU
region (`eur3 / europe-west`). Project: `cxeemeastep`.

- **Anonymous sign-in only.** No email, password, or other identity is
  collected. Each browser receives a stable random UID so your row in the
  leaderboard can be updated.
- **Minimal data.** Only display name, team, daily goal, and per-day step
  counts ever leave the device. No location, IP-derived geo, device
  fingerprints, analytics, or third-party trackers.
- **Offline-resilient.** New entries are saved locally and pushed
  automatically the moment you reconnect — no data loss.
- **Right to erasure.** The Profile screen offers "Reset week" and "Reset
  all data" to wipe local state. To remove your row from Firestore, ask the
  offsite organiser (or project admin) to delete `users/<your-uid>`.
- **Event lifecycle.** The Firestore `users` collection will be purged by
  the organisers within 14 days of the offsite ending — consistent with
  GDPR storage-limitation principles.
- **Third parties.** Google Cloud (Firebase Auth + Firestore, EU region)
  for sync; Google Fonts for the Inter typeface; Azure Static Web Apps
  for hosting.

A more detailed write-up (privacy notice, suggested routes, and FAQ) is
available inside the app on the **About** tab.

## ☁️ Cloud sync

Cloud sync is **always on** when the app is configured. The Firebase
project (`cxeemeastep`, EU region) is wired in at build time via
`src/firebase-config.ts`, with the `VITE_FIREBASE_*` values injected by
the Azure Static Web Apps workflow from repo secrets. The Firestore SDK
uses an IndexedDB-backed persistent local cache, so writes succeed
instantly even offline and are flushed to the server automatically once
connectivity returns. The **Profile → Cloud sync** panel surfaces the
current state (Synced / Offline — saving locally / Connecting…).

If `firebase-config.ts` is left empty in a fork, the app falls back to a
purely local experience — no Firebase code talks to the network.

## 🚢 Hosting

Production hosts on **Azure Static Web Apps** at
<https://gentle-cliff-07e205d03.7.azurestaticapps.net>. Every push to
`main` triggers `.github/workflows/azure-static-web-apps-*.yml`, which
runs `npm run build` (Oryx) and ships the `dist/` output. SPA fallback
and asset cache headers live in `staticwebapp.config.json`.

Repo owners: see [`docs/firebase-setup.md`](./docs/firebase-setup.md) for
the one-time Firebase Console setup, the security rules, and the API key
referrer allowlist.

## 🤝 Contributing

This is an internal offsite project, but PRs and ideas are welcome from CxE EMEA folks. Please:

1. Open an issue to discuss large changes first.
2. Run `npm run typecheck` before pushing.
3. Keep the Munich vibe alive in any new challenge copy. 🥨

## 📄 License

[MIT](./LICENSE) © 2026 Manaiakalani
