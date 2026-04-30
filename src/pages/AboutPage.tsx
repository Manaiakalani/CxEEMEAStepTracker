import {
  ShieldCheck,
  Mountain,
  Route,
  Info,
  HelpCircle,
  AlertTriangle,
} from "lucide-react";
import { BAYERN, BAYERN_SOFT, HAIRLINE, INK, MUTED } from "../theme";

type Section = {
  id: string;
  icon: typeof Info;
  title: string;
  body: React.ReactNode;
};

const SECTIONS: Section[] = [
  {
    id: "about",
    icon: Info,
    title: "What this is",
    body: (
      <>
        <p>
          A small step-tracker for the <strong>CxE EMEA Offsite 2026</strong>{" "}
          in München — built to nudge us off our chairs, give the teams
          something to compete over, and make Munich feel like part of the
          week, not just the venue.
        </p>
        <p>
          Log your steps each day, watch your team climb the leaderboard, and
          chase landmark-themed challenges between sessions. It's voluntary,
          it's for fun, and it's a motivational tool — not medical advice.
        </p>
      </>
    ),
  },
  {
    id: "privacy",
    icon: ShieldCheck,
    title: "Privacy & data",
    body: (
      <>
        <p>
          We store as little as possible: <strong>display name, team, daily
          goal, and step counts</strong>. No email, password, location, IP
          geolocation, device fingerprint, or analytics.
        </p>
        <ul>
          <li>
            <strong>Where it lives.</strong> On this device (browser{" "}
            <code>localStorage</code> + <code>IndexedDB</code>), mirrored to
            Firebase Firestore in the EU (<code>europe-west</code>) under
            project <code>cxeemeastep</code>.
          </li>
          <li>
            <strong>Who you are to the cloud.</strong> An anonymous random
            UID per browser — no identity is collected.
          </li>
          <li>
            <strong>Erasure.</strong> "Reset week" / "Reset all data" on
            Profile wipes this device immediately. Ask an organiser to remove
            your Firestore row, or wait — the whole <code>users</code>{" "}
            collection is purged within 14 days of the offsite ending.
          </li>
          <li>
            <strong>Third parties.</strong> Google Cloud (Firestore + Auth,
            EU), Google Fonts (the <em>Inter</em> typeface), GitHub Pages for
            hosting. Nothing else.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "theme-days",
    icon: Mountain,
    title: "Munich theme days",
    body: (
      <>
        <p>
          Light-hearted dress-up days through the week — opt in, no pressure:
        </p>
        <ul>
          <li>
            <strong>Mon · Marienplatz Monday</strong> — blue &amp; white
            (Bavarian flag).
          </li>
          <li>
            <strong>Tue · Trachten Tuesday</strong> — a tasteful nod to
            Lederhosen / Dirndl, totally optional.
          </li>
          <li>
            <strong>Wed · Walking Shoes Wednesday</strong> — best step-friendly
            footwear wins a prize.
          </li>
          <li>
            <strong>Thu · Trail Mix Thursday</strong> — bring a snack from
            your home country and swap.
          </li>
          <li>
            <strong>Fri · Fancy Shoe Friday</strong> — send the offsite off
            with style.
          </li>
          <li>
            <strong>Sat · Surfwelle Saturday</strong> — optional group walk
            to the Eisbach surf wave.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "routes",
    icon: Route,
    title: "Suggested Munich routes",
    body: (
      <>
        <p>
          Real-world walking targets between sessions:
        </p>
        <ul>
          <li>
            <strong>Marienplatz → Englischer Garten</strong> · 2.0 km · ~2,800
            steps
          </li>
          <li>
            <strong>Kleinhesseloher See loop</strong> · 1.5 km · ~2,000 steps
          </li>
          <li>
            <strong>Marienplatz → Eisbach Surfwelle → Hofgarten</strong> · 2.5
            km · ~3,500 steps
          </li>
          <li>
            <strong>Englischer Garten → Olympiapark</strong> · 4.5 km · ~6,300
            steps
          </li>
          <li>
            <strong>Marienplatz → Microsoft München (Schwabing)</strong> · 5.5
            km · ~7,500 steps
          </li>
          <li>
            <strong>Haus der Kunst → Lake → Isar return</strong> · 8.5 km ·
            ~11,000 steps
          </li>
          <li>
            <strong>Marienplatz → Schloss Nymphenburg &amp; back</strong> ·
            ~12 km · ~16,000 steps
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "faq",
    icon: HelpCircle,
    title: "FAQ",
    body: (
      <dl className="space-y-5">
        <div>
          <dt className="font-medium" style={{ color: INK }}>
            How are steps counted?
          </dt>
          <dd className="mt-1">
            Manually — read the number off your watch, phone, or fitness
            tracker and type it in. Honour system, offsite spirit.
          </dd>
        </div>
        <div>
          <dt className="font-medium" style={{ color: INK }}>
            What happens if the venue Wi-Fi drops?
          </dt>
          <dd className="mt-1">
            Nothing visible. Entries are saved locally and pushed to the
            cloud the moment you reconnect. The Cloud sync pill on Profile
            shows the current state.
          </dd>
        </div>
        <div>
          <dt className="font-medium" style={{ color: INK }}>
            Will my steps sync across devices?
          </dt>
          <dd className="mt-1">
            Sort of — and intentionally simply. Each browser signs in
            anonymously, so logging on phone <em>and</em> laptop creates two
            separate cloud rows. The leaderboard merges anyone with the same
            name + team into one combined row, so your total reflects every
            device you walked on. Heads up: two real people sharing a first
            name <em>and</em> a team would also merge — pick a slightly
            different display name if that's you.
          </dd>
        </div>
        <div>
          <dt className="font-medium" style={{ color: INK }}>
            I used the tracker on another device — can I pick up where I
            left off?
          </dt>
          <dd className="mt-1">
            On your first visit on a new device, the welcome flow shows any
            walker already on the leaderboard with the same name and offers
            to join you to that row. Your steps from that point on combine
            with the existing total. Past per-day entries stay on the
            original device.
          </dd>
        </div>
        <div>
          <dt className="font-medium" style={{ color: INK }}>
            I cleared my browser — can my data come back?
          </dt>
          <dd className="mt-1">
            Not on this device. Clearing storage drops the anonymous
            credential, so a fresh visit is a fresh identity. The previous
            row stays in Firestore until the post-offsite purge.
          </dd>
        </div>
        <div>
          <dt className="font-medium" style={{ color: INK }}>
            Found a bug or have an idea?
          </dt>
          <dd className="mt-1">
            Ping an offsite organiser or open an issue on the{" "}
            <a
              href="https://github.com/Manaiakalani/CxEEMEAStepTracker/issues"
              target="_blank"
              rel="noreferrer"
              className="underline"
              style={{ color: BAYERN }}
            >
              GitHub repo
            </a>
            .
          </dd>
        </div>
      </dl>
    ),
  },
  {
    id: "important",
    icon: AlertTriangle,
    title: "The fine print",
    body: (
      <p>
        Step-tracking is voluntary and for team morale only. The app is
        provided as-is, with no warranty. It's a motivational tool, not
        medical advice — talk to a healthcare provider for fitness guidance.
      </p>
    ),
  },
];

export function AboutPage() {
  return (
    <>
      <header className="border-b" style={{ borderColor: HAIRLINE }}>
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 pt-12 pb-10">
          <p
            className="text-[12px] uppercase tracking-[0.18em] mb-3"
            style={{ color: MUTED }}
          >
            About &amp; Info
          </p>
          <h1
            className="text-[32px] sm:text-[40px] leading-[1.05] font-semibold tracking-tight"
            style={{ color: INK }}
          >
            About this Step Tracker
          </h1>
          <p
            className="text-[15px] mt-3 max-w-2xl"
            style={{ color: MUTED }}
          >
            What this is, what we store, and what to wear on Trachten Tuesday.
          </p>
        </div>
      </header>

      {SECTIONS.map((section) => {
        const Icon = section.icon;
        return (
          <section
            key={section.id}
            id={section.id}
            className="border-b"
            style={{ borderColor: HAIRLINE }}
          >
            <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-12 grid grid-cols-12 gap-6 sm:gap-12">
              <div className="col-span-12 md:col-span-4">
                <span
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full mb-4"
                  style={{ background: BAYERN_SOFT, color: BAYERN }}
                >
                  <Icon className="w-4 h-4" strokeWidth={1.75} />
                </span>
                <h2
                  className="text-[22px] font-medium tracking-tight"
                  style={{ color: INK }}
                >
                  {section.title}
                </h2>
              </div>
              <div
                className="col-span-12 md:col-span-8 text-[14.5px] leading-[1.65] space-y-4 about-prose"
                style={{ color: MUTED }}
              >
                {section.body}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
