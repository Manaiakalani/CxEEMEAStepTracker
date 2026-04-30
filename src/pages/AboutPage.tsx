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
    title: "About this app",
    body: (
      <>
        <p>
          The <strong>CxE EMEA Offsite 2026 Step Tracker</strong> is a small
          web app built to encourage movement and friendly team competition
          during our week in München. It's a lightweight re-imagining of the
          previous CxE step trackers — pared back to the essentials and
          styled around the Bavarian capital.
        </p>
        <ul>
          <li>
            <strong>Personal dashboard</strong> — daily progress, weekly chart,
            and today's focus.
          </li>
          <li>
            <strong>Munich-themed challenges</strong> — landmark-inspired step
            goals (Frauenkirche, Englischer Garten, Hofbräuhaus, and more).
          </li>
          <li>
            <strong>Leaderboard &amp; teams</strong> — see how you and your team
            stack up.
          </li>
          <li>
            <strong>Light &amp; dark mode</strong> — alpine palette by day,
            Munich-night by night.
          </li>
          <li>
            <strong>Always-on cloud sync</strong> — your steps mirror to a
            shared offsite Firestore project in real time, with offline
            fallback so nothing is lost when the venue Wi-Fi drops.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "privacy",
    icon: ShieldCheck,
    title: "Privacy, data & GDPR",
    body: (
      <>
        <p>
          <strong>Your privacy matters.</strong> Anything you enter — display
          name, team, daily goal, and step counts — is used solely to power
          the dashboard, leaderboard, and team views during the offsite.
        </p>
        <ul>
          <li>
            <strong>What we store, and where.</strong> Your snapshot is kept
            on this device (browser <code>localStorage</code> +{" "}
            <code>IndexedDB</code>) and mirrored to a Firebase Firestore
            database hosted by Google Cloud in the <strong>EU</strong> region
            (<code>eur3 / europe-west</code>). Project: <code>cxeemeastep</code>.
          </li>
          <li>
            <strong>Anonymous sign-in only.</strong> The app signs you in
            anonymously — no email, password, phone number, or other identity
            is collected. Each browser receives a stable random UID so your
            updates can be associated with your row in the leaderboard.
          </li>
          <li>
            <strong>Minimal data.</strong> Only your chosen display name,
            team, daily goal, and per-day step counts ever leave the device.
            No location, IP-derived geo, device fingerprints, or analytics.
          </li>
          <li>
            <strong>Offline-resilient.</strong> If you go offline mid-walk,
            new entries are saved locally and pushed automatically the moment
            you reconnect — no data loss, no manual action.
          </li>
          <li>
            <strong>Right to erasure.</strong> The Profile screen offers
            "Reset week" and "Reset all data" — these wipe local state
            immediately. To remove your row from Firestore as well, ask the
            offsite organiser (or the project admin) to delete{" "}
            <code>users/&lt;your-uid&gt;</code> from the Firebase console.
          </li>
          <li>
            <strong>Event lifecycle.</strong> The Firestore <code>users</code>{" "}
            collection will be purged by the organisers within 14 days of the
            offsite ending — consistent with GDPR storage-limitation
            principles.
          </li>
          <li>
            <strong>Third parties.</strong> The app uses Google Cloud
            (Firebase Auth + Firestore, EU region) for sync, and loads the{" "}
            <em>Inter</em> typeface from Google Fonts. The site itself is
            served from GitHub Pages. No advertising, analytics, or
            third-party trackers are loaded.
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
          Light-hearted dress-up days during the offsite week — opt in, no
          pressure:
        </p>
        <ul>
          <li>
            <strong>Monday — Marienplatz Monday:</strong> anything blue &amp;
            white (Bavarian flag colours).
          </li>
          <li>
            <strong>Tuesday — Trachten Tuesday:</strong> a tasteful nod to
            traditional Bavarian dress (Lederhosen / Dirndl optional, definitely
            not required).
          </li>
          <li>
            <strong>Wednesday — Walking Shoes Wednesday:</strong> best
            step-friendly footwear wins a prize.
          </li>
          <li>
            <strong>Thursday — Trail Mix Thursday:</strong> snack swap on the
            office floor — bring something from your home country.
          </li>
          <li>
            <strong>Friday — Fancy Shoe Friday:</strong> send the offsite off
            with style.
          </li>
          <li>
            <strong>Saturday — Surfwelle Saturday:</strong> optional group walk
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
          Real-world walking targets you can chase between sessions, mapped to
          Munich landmarks:
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
            <strong>Marienplatz → Olympiapark / BMW Welt</strong> · 5.5 km ·
            ~7,800 steps
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
    title: "Frequently asked questions",
    body: (
      <dl className="space-y-5">
        <div>
          <dt className="font-medium" style={{ color: INK }}>
            How accurate is the step tracking?
          </dt>
          <dd className="mt-1">
            This app uses manual step entry — read the count from your fitness
            tracker, phone health app, or smartwatch and type it in.
          </dd>
        </div>
        <div>
          <dt className="font-medium" style={{ color: INK }}>
            Can I see other people's steps?
          </dt>
          <dd className="mt-1">
            Yes — the Leaderboard reflects everyone who's signed in via the
            shared Firestore project, in real time. The Teams view aggregates
            those numbers per team. Only display name, team, and step counts
            are shared.
          </dd>
        </div>
        <div>
          <dt className="font-medium" style={{ color: INK }}>
            What happens to my data after the offsite?
          </dt>
          <dd className="mt-1">
            The cloud-stored copy in Firestore will be purged by the
            organisers within 14 days of the offsite ending. Local-device
            data can be wiped any time from "Reset all data" on the Profile
            screen, or by clearing this site's storage in your browser.
          </dd>
        </div>
        <div>
          <dt className="font-medium" style={{ color: INK }}>
            What if I lose Wi-Fi at the venue?
          </dt>
          <dd className="mt-1">
            No problem. The app saves new step entries locally and pushes
            them to the cloud automatically the moment you reconnect. The
            "Cloud sync" indicator on the Profile screen shows the current
            state (Synced / Offline — saving locally / Connecting…).
          </dd>
        </div>
        <div>
          <dt className="font-medium" style={{ color: INK }}>
            I cleared my browser, can my data be recovered?
          </dt>
          <dd className="mt-1">
            Not from this device — clearing browser storage also discards
            the cached anonymous credential, so a fresh visit starts a new
            anonymous identity. Your previously-synced row will remain in
            Firestore until the post-offsite purge, but this device will no
            longer be linked to it.
          </dd>
        </div>
        <div>
          <dt className="font-medium" style={{ color: INK }}>
            Does this work on mobile?
          </dt>
          <dd className="mt-1">
            Yes — the layout is fully responsive and touch-friendly on phones,
            tablets, and desktops.
          </dd>
        </div>
        <div>
          <dt className="font-medium" style={{ color: INK }}>
            Will my steps sync across devices?
          </dt>
          <dd className="mt-1">
            Not automatically. Anonymous sign-in is per-browser, so each
            device starts a new identity and shows up as a separate row in
            the leaderboard. For consistency, log your steps on the device
            you use most. (A future version could add proper sign-in for
            cross-device sync.)
          </dd>
        </div>
        <div>
          <dt className="font-medium" style={{ color: INK }}>
            I found a bug or have a feature request.
          </dt>
          <dd className="mt-1">
            Reach out to Max Stein or one of the CxE admins, or open an issue
            on the{" "}
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
    title: "Important information",
    body: (
      <>
        <p>
          <strong>Event purpose.</strong> This app is designed exclusively for
          the CxE EMEA Offsite 2026 to boost team morale and encourage physical
          activity during the week.
        </p>
        <p>
          <strong>Voluntary participation.</strong> Joining the step-tracking
          challenge is entirely voluntary and for entertainment purposes only.
        </p>
        <p>
          <strong>No warranty.</strong> The app is provided "as is" for team
          building and motivational purposes without any warranties.
        </p>
        <p>
          <strong>Health disclaimer.</strong> This is a fun team activity, not
          medical advice. Please consult healthcare providers for fitness
          guidance — step tracking here is for motivation and team engagement
          only.
        </p>
      </>
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
            What this app is, how your data is handled, the Munich theme of the
            week, and answers to common questions.
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
