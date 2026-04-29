# CxE EMEA Step Tracker

A lightweight, Munich-themed step-tracking web app for the **CxE EMEA Offsite 2026** in München. Log your steps, climb landmark-inspired challenges, race your teammates on the leaderboard, and keep the offsite spirit alive between sessions.

> _"Match Munich's twin onion-domed towers — 98 m tall, watching over the Altstadt since 1488."_

## ✨ Features

- **Dashboard** — daily progress ring, goal tracking, weekly chart, today's focus, and quick-entry buttons.
- **Challenges** — Munich landmark-inspired step goals (Frauenkirche, Viktualienmarkt, Englischer Garten, Isar, Marienplatz, and more).
- **Leaderboard** — see how you stack up against fellow attendees.
- **Teams** — team-by-team breakdown for friendly inter-team competition.
- **Profile** — set your name, team, and personal daily goal.
- **Local-first** — all data is stored in your browser via `localStorage`. No backend, no accounts, no tracking.
- **Responsive & themed** — Inter typeface, alpine palette, custom mountain silhouette, and a `#1761A0` brand accent.

## 🛠 Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 7](https://vitejs.dev/) for dev/build
- [Tailwind CSS 4](https://tailwindcss.com/) (via `@tailwindcss/vite`)
- [lucide-react](https://lucide.dev/) icons
- React Context + `localStorage` for state persistence

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
├── App.tsx                 # Root + tab-based router
├── main.tsx                # Vite entry
├── store.ts                # React context + localStorage persistence
├── data.ts                 # Challenges, teams, seed data
├── theme.ts                # Brand colors / tokens
├── lib/format.ts           # Date + number helpers
├── components/             # UI building blocks (TopNav, Hero, Leaderboard, …)
└── pages/                  # Dashboard, Leaderboard, Teams, Profile
```

## 💾 Data & Privacy (GDPR-friendly)

This is a **local-first** application. Everything you enter — display name,
team, daily goal, and step counts — is stored exclusively in your browser's
`localStorage` under the `alpine-step-tracker:v1` key. Nothing is transmitted
to a server, no analytics or cookies are used, and no third-party trackers
are loaded.

Because no personal data ever leaves your device, this app does not act as a
"controller" or "processor" of personal data under the GDPR — you remain in
full control of your own data at all times.

- **Right to erasure:** the Profile screen offers "Reset week" and "Reset all
  data" controls; clearing the site's storage in your browser also wipes
  everything immediately.
- **Minimal data:** only a display name, a team selection, and step counts.
  No email, location, or device identifiers.
- **Third parties:** the only external resource loaded is the Inter typeface
  from Google Fonts. The site itself is served from GitHub Pages.

A more detailed write-up — privacy notice, Munich theme days, suggested
routes, and an FAQ — is available inside the app on the **About** tab.

## 🤝 Contributing

This is an internal offsite project, but PRs and ideas are welcome from CxE EMEA folks. Please:

1. Open an issue to discuss large changes first.
2. Run `npm run typecheck` before pushing.
3. Keep the Munich vibe alive in any new challenge copy. 🥨

## 📄 License

[MIT](./LICENSE) © 2026 Manaiakalani
