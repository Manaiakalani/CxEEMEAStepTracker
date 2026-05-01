# CxE EMEA Step Tracker

[![Azure Static Web Apps CI/CD](https://github.com/Manaiakalani/CxEEMEAStepTracker/actions/workflows/azure-static-web-apps-gentle-cliff-07e205d03.yml/badge.svg)](https://github.com/Manaiakalani/CxEEMEAStepTracker/actions/workflows/azure-static-web-apps-gentle-cliff-07e205d03.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-1761A0.svg)](./LICENSE)

🔗 **Live:** <https://gentle-cliff-07e205d03.7.azurestaticapps.net>

A lightweight, Munich-themed step-tracking web app for the **CxE EMEA Offsite 2026**, running **11–14 May 2026** at the **Microsoft München office** (Walter-Gropius-Straße, Schwabing). Twelve landmark- and history-inspired challenges, eight teams, a real-time leaderboard, and an always-on cloud sync that keeps the offsite spirit alive between sessions.

> _"Match Munich's twin onion-domed towers, 98 m tall, watching over the Altstadt since 1488."_

## ✨ Features

- **Dashboard** — daily progress ring, goal tracking, weekly chart, today's focus, and quick-entry buttons.
- **12 challenges** spanning a 6 k Marienplatz Loop up to a 20 k Hannover Halle Marathon — Munich landmarks (Frauenkirche, Viktualienmarkt, Englischer Garten, Isar, Olympiapark, Microsoft München Mile) plus walking-meeting goals (Copilot Cadence, CxE Customer Connect) and two stretch goals from Microsoft EMEA history (MSR Cambridge 1997, CeBIT Hannover 1986–2018).
- **8 teams** — _Care / Aleks · UEM / Craig · MTP / Diego · Purview / Nishan · CCP / Mags · Shared Services / Kim · IDNA / Travis · CxE LT_. Per-walker view, per-team standings, and a Total Stomp roll-up.
- **Profile** — set your name, team, and personal daily goal; switch teams any time and your contribution moves with you.
- **Always-on cloud sync** — steps mirror automatically to a shared EU server database for the live leaderboard, with offline buffering so nothing is lost when Wi-Fi drops.
- **Visual system** — Inter typeface, hairline-driven editorial layout, alpine palette, full dark theme, custom mountain silhouette, `#1761A0` brand accent.
- **Motion** — pointer-driven parallax on the hero ridge (ambient drift on touch), brand glyph pans on hover, tinted tab icons. All collapse under `prefers-reduced-motion`.

## 🛠 Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (lazy-routed tabs via `React.lazy` + `Suspense`)
- [Vite 7](https://vitejs.dev/) for dev/build (manual chunks for `firebase` + `react`)
- [Tailwind CSS 4](https://tailwindcss.com/) (via `@tailwindcss/vite`)
- [Firebase 12](https://firebase.google.com/) — Anonymous Auth + Firestore (EU `eur3`), persistent IndexedDB cache. Anonymous sign-in is referrer-locked to `cxeemeastep.firebaseapp.com`, `cxeemeastep.web.app`, and the SWA host (see `docs/firebase-setup.md` for forks).
- [lucide-react](https://lucide.dev/) icons
- [Azure Static Web Apps](https://azure.microsoft.com/products/app-service/static) for hosting + CI/CD
- React Context for state; localStorage + Firestore IndexedDB for offline persistence

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

In short: only display name, team, daily goal, and per-day step counts ever
leave the device. Each browser is an anonymous random ID. Data lives in the
EU. The whole walker list is purged within 14 days of the offsite ending.

For developers / forks, the specifics are:

- **Storage.** Local: `localStorage` + Firestore's IndexedDB cache. Remote:
  Cloud Firestore in the EU `eur3 / europe-west` multi-region under project
  `cxeemeastep`.
- **Anonymous sign-in only.** Each browser receives a stable random UID so
  the leaderboard row can be updated in place. No email, password, or other
  identity is collected.
- **Minimal data.** Only the four fields above ever leave the device. No
  location, IP-derived geo, device fingerprints, analytics, or third-party
  trackers.
- **Offline-resilient.** New entries are saved locally and pushed
  automatically when the connection returns — no data loss.
- **Right to erasure.** "Reset week" / "Reset all data" on Profile clears
  this device and pushes a cleared snapshot up so the cloud row also
  blanks. Ask an organiser (or project admin) to remove `users/<uid>`
  entirely.
- **Event lifecycle.** The Firestore `users` collection will be purged by
  the organisers within 14 days of the offsite ending.
- **Third parties.** Google Cloud (Firebase Auth + Firestore, EU region);
  Google Fonts (Inter typeface); Azure Static Web Apps (hosting). Nothing
  else.

The user-facing version of this lives inside the app on the **About** tab.

## ☁️ Cloud sync

Cloud sync is **always on** when the app is configured. The Firebase
project (`cxeemeastep`, EU region) is wired in at build time via
`src/firebase-config.ts`, with the `VITE_FIREBASE_*` values injected by
the Azure Static Web Apps workflow from repo secrets. The Firestore SDK
uses an IndexedDB-backed persistent local cache, so writes succeed
instantly even offline and are flushed to the server automatically once
connectivity returns. The **Profile → Cloud sync** panel surfaces the
current state (Synced / Offline — saving locally / Connecting…).

If a fork doesn't set the `VITE_FIREBASE_*` build variables, the app falls
back to a purely local experience — no Firebase code talks to the network.

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
