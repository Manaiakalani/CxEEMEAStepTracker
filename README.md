# Step Tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-1761A0.svg)](./LICENSE)

A lightweight, mobile-friendly step-tracking web app for short team
events. Drop in a roster of teams, set a daily goal, and let participants
log their steps from any device — totals roll up live into per-walker and
per-team leaderboards backed by an optional Firebase cloud sync.

## ✨ Features

- **Dashboard** — daily progress ring, goal tracking, weekly chart, daily focus, and quick-entry buttons.
- **Challenges** — configurable list of step-count goals with descriptive copy.
- **Teams** — configurable team roster. Per-walker view, per-team standings, and a total-steps roll-up.
- **Profile** — set your display name, team, and personal daily goal; switch teams at any time and your contribution moves with you.
- **Optional cloud sync** — when Firebase is configured, walker totals mirror to a shared backend for a live leaderboard, with offline buffering so nothing is lost when the network drops. Disable it by leaving the env vars empty and the app stays purely local.
- **Visual system** — Inter typeface, hairline-driven editorial layout, full light + dark themes, configurable accent color.
- **Motion** — subtle pointer-driven parallax on the hero and tinted tab icons. All motion collapses under `prefers-reduced-motion`.

## 🛠 Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (lazy-routed tabs via `React.lazy` + `Suspense`)
- [Vite 7](https://vitejs.dev/) for dev/build (manual chunks for `firebase` + `react`)
- [Tailwind CSS 4](https://tailwindcss.com/) (via `@tailwindcss/vite`)
- [Firebase 12](https://firebase.google.com/) — Anonymous Auth + Firestore with persistent IndexedDB cache (optional)
- [lucide-react](https://lucide.dev/) icons
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
git clone <your-fork-url>
cd <repo-name>
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
│   └── cloud-sync.ts       # Firebase Auth + Firestore (optional)
├── components/             # UI building blocks (TopNav, Hero, Leaderboard, …)
└── pages/                  # Dashboard, Leaderboard, Profile, About
```

## 🧩 Customising for your event

Most of what makes the app feel like "your" event lives in two files:

- **`src/data.ts`** — team roster, challenge list, seed copy.
- **`src/theme.ts`** + the CSS variables in **`src/index.css`** — accent color, light/dark surfaces, typography ramp.

Tweak those and the rest of the app picks up the new branding automatically.

## 💾 Data & Privacy

The app collects only what's needed for a leaderboard: display name, team,
daily goal, and per-day step counts. Each browser is an anonymous random
ID — no email, password, or other identity is collected. No analytics or
third-party trackers are bundled.

If you enable cloud sync via Firebase:

- **Storage.** Local: `localStorage` + Firestore's IndexedDB cache. Remote: Cloud Firestore in whichever region your Firebase project lives.
- **Anonymous sign-in only.** Each browser receives a stable random UID so the leaderboard row can be updated in place.
- **Offline-resilient.** New entries are saved locally and pushed automatically when the connection returns — no data loss.
- **Right to erasure.** "Reset week" / "Reset all data" on Profile clears this device and pushes a cleared snapshot up so the cloud row also blanks. Delete `users/<uid>` from Firestore to remove the row entirely.

The user-facing version of this lives inside the app on the **About** tab.

## ☁️ Cloud sync (optional)

Cloud sync activates when the Firebase web config is supplied via
`VITE_FIREBASE_*` build variables (see `.env.example`). The Firestore SDK
uses an IndexedDB-backed persistent local cache, so writes succeed
instantly even offline and are flushed to the server automatically once
connectivity returns. The **Profile → Cloud sync** panel surfaces the
current state (Synced / Offline — saving locally / Connecting…).

If you leave the `VITE_FIREBASE_*` variables unset, the app falls back to
a purely local experience — no Firebase code talks to the network.

See [`docs/firebase-setup.md`](./docs/firebase-setup.md) for the one-time
Firebase Console setup, the Firestore security rules, and the API key
referrer allowlist for production.

## 🚢 Hosting

The app is a plain static SPA, so it deploys cleanly to any static host.
The repo includes a `staticwebapp.config.json` with sensible SPA fallback
and asset cache headers if you choose Azure Static Web Apps; equivalent
config for Netlify / Vercel / Cloudflare Pages is a one-file change.

## 🤝 Contributing

Issues and PRs are welcome. Please:

1. Open an issue to discuss large changes first.
2. Run `npm run typecheck` before pushing.
3. Keep changes focused — small PRs are easier to review.

## 📄 License

[MIT](./LICENSE)
