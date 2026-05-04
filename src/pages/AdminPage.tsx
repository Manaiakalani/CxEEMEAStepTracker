import { useEffect, useMemo, useState, type FormEvent } from "react";
import { LogOut, Lock, Footprints, Trophy, Users, Search } from "lucide-react";
import { isFirebaseConfigured } from "../firebase-config";
import {
  ensureAnonUser,
  subscribeLeaderboard,
  type LeaderboardEntry,
} from "../lib/cloud-sync";
import { weekTotalFor } from "../store";
import { canonicalTeam } from "../data";
import { formatNumber } from "../lib/format";
import {
  ALPENGLOW,
  BAYERN,
  BAYERN_SOFT,
  BRONZE,
  BRONZE_SOFT,
  GOLD,
  GOLD_SOFT,
  HAIRLINE,
  INK,
  MUTED,
  SILVER,
  SILVER_SOFT,
} from "../theme";

/**
 * SHA-256 hash of the shared admin password. The plaintext is intentionally
 * not in the bundle — it's distributed out-of-band to a small number of
 * organisers. Note: this is shallow access control on a public-read
 * Firestore collection; treat the data as visible to any authenticated
 * client. The gate exists to keep the admin URL unadvertised, not to
 * protect secrets.
 */
const ADMIN_HASH =
  "7f07d917fe4816c5c887a919563f082ebba493158e3d6aa784fa6db1d1315a62";
const SESSION_FLAG = "alpine-step-tracker:admin-session";

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const MEDALS: Array<{ fg: string; bg: string }> = [
  { fg: GOLD, bg: GOLD_SOFT },
  { fg: SILVER, bg: SILVER_SOFT },
  { fg: BRONZE, bg: BRONZE_SOFT },
];

type AdminRow = {
  uid: string;
  name: string;
  team: string;
  steps: number;
};

function aggregate(rows: LeaderboardEntry[]): AdminRow[] {
  // Group by (lower(name) | lower(team)) so cross-device duplicates collapse,
  // matching the public leaderboard's aggregation semantics.
  const groups = new Map<
    string,
    { name: string; team: string; uid: string; steps: number }
  >();
  for (const r of rows) {
    const name = (r.name ?? "").trim();
    if (!name) continue;
    const team = canonicalTeam((r.team ?? "").trim());
    const key = `${name.toLowerCase()}|${team.toLowerCase()}`;
    const cur = groups.get(key);
    const docSteps = weekTotalFor(r.entries);
    if (cur) {
      cur.steps += docSteps;
    } else {
      groups.set(key, { name, team, uid: r.uid, steps: docSteps });
    }
  }
  return Array.from(groups.values()).sort((a, b) => b.steps - a.steps);
}

export function AdminPage() {
  const [authed, setAuthed] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return window.sessionStorage.getItem(SESSION_FLAG) === "1";
    } catch {
      return false;
    }
  });

  if (!authed) {
    return <AdminLogin onAuthed={() => setAuthed(true)} />;
  }
  return (
    <AdminDashboard
      onSignOut={() => {
        try {
          window.sessionStorage.removeItem(SESSION_FLAG);
        } catch {
          /* ignore */
        }
        setAuthed(false);
      }}
    />
  );
}

function AdminLogin({ onAuthed }: { onAuthed: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      const hash = await sha256Hex(pw);
      if (hash === ADMIN_HASH) {
        try {
          window.sessionStorage.setItem(SESSION_FLAG, "1");
        } catch {
          /* ignore */
        }
        onAuthed();
      } else {
        setErr("Incorrect password.");
      }
    } catch {
      setErr("Could not verify password in this browser.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "var(--surface)" }}
    >
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-xl p-7"
        style={{
          border: `1px solid ${HAIRLINE}`,
          background: "var(--surface-raised)",
        }}
      >
        <div
          className="w-9 h-9 rounded-full inline-flex items-center justify-center mb-5"
          style={{ background: BAYERN_SOFT, color: BAYERN }}
        >
          <Lock className="w-4 h-4" strokeWidth={1.75} />
        </div>
        <p
          className="text-[12px] uppercase tracking-[0.18em] mb-2"
          style={{ color: MUTED }}
        >
          Restricted
        </p>
        <h1
          className="text-[22px] font-semibold tracking-tight"
          style={{ color: INK }}
        >
          Admin sign-in
        </h1>
        <p
          className="text-[13.5px] mt-2 mb-6"
          style={{ color: MUTED }}
        >
          Enter the shared admin password to view all walkers.
        </p>
        <label
          className="text-[12px] tracking-tight block mb-2"
          style={{ color: MUTED }}
          htmlFor="admin-password"
        >
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          autoFocus
          autoComplete="current-password"
          className="w-full h-11 px-3 rounded-md text-[14px] focus:outline-none focus-visible:ring-2"
          style={{
            border: `1px solid ${HAIRLINE}`,
            background: "var(--surface)",
            color: INK,
            ["--tw-ring-color" as never]: BAYERN,
          }}
        />
        {err && (
          <p
            className="text-[12.5px] mt-3"
            style={{ color: "var(--color-warn)" }}
            role="alert"
          >
            {err}
          </p>
        )}
        <button
          type="submit"
          disabled={busy || pw.length === 0}
          className="mt-5 w-full h-11 rounded-full text-[13.5px] font-medium tracking-tight transition-colors disabled:opacity-60"
          style={{ background: BAYERN, color: "#fff" }}
        >
          {busy ? "Checking…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}

function AdminDashboard({ onSignOut }: { onSignOut: () => void }) {
  const [rows, setRows] = useState<LeaderboardEntry[]>([]);
  const [status, setStatus] = useState<"connecting" | "live" | "offline" | "unconfigured">(
    isFirebaseConfigured() ? "connecting" : "unconfigured",
  );
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (!isFirebaseConfigured()) return;
    let cancelled = false;
    let unsub = () => {};
    (async () => {
      await ensureAnonUser();
      if (cancelled) return;
      unsub = subscribeLeaderboard((next) => {
        setRows(next);
        setStatus("live");
      });
    })();
    return () => {
      cancelled = true;
      unsub();
    };
  }, []);

  const aggregated = useMemo(() => aggregate(rows), [rows]);
  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return aggregated;
    return aggregated.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.team.toLowerCase().includes(q),
    );
  }, [aggregated, filter]);

  const totalSteps = aggregated.reduce((s, r) => s + r.steps, 0);
  const teamCount = new Set(aggregated.map((r) => r.team).filter(Boolean)).size;
  const leader = aggregated[0];
  const max = leader?.steps || 1;

  return (
    <div className="min-h-screen flex flex-col">
      <header
        className="border-b sticky top-0 z-20 surface-translucent backdrop-blur-sm"
        style={{ borderColor: HAIRLINE }}
      >
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="w-7 h-7 rounded-md inline-flex items-center justify-center"
              style={{ background: BAYERN_SOFT, color: BAYERN }}
              aria-hidden="true"
            >
              <Lock className="w-3.5 h-3.5" strokeWidth={1.75} />
            </span>
            <span
              className="text-[13px] font-medium tracking-tight"
              style={{ color: INK }}
            >
              Step Tracker · Admin
            </span>
            <span
              className="ml-3 text-[11px] uppercase tracking-[0.16em] px-2 h-5 inline-flex items-center rounded-full"
              style={{
                color: status === "live" ? "var(--color-success)" : MUTED,
                background: "var(--surface-raised)",
                border: `1px solid ${HAIRLINE}`,
              }}
            >
              {status === "live"
                ? "Live"
                : status === "connecting"
                  ? "Connecting"
                  : status === "unconfigured"
                    ? "Cloud off"
                    : "Offline"}
            </span>
          </div>
          <button
            type="button"
            onClick={onSignOut}
            className="h-9 px-3 rounded-full text-[12.5px] font-medium tracking-tight inline-flex items-center gap-1.5 hover-surface"
            style={{ color: MUTED, border: `1px solid ${HAIRLINE}` }}
          >
            <LogOut className="w-3.5 h-3.5" strokeWidth={1.75} />
            Sign out
          </button>
        </div>
      </header>

      <main className="flex-1">
        <section className="border-b" style={{ borderColor: HAIRLINE }}>
          <div className="max-w-[1200px] mx-auto px-6 sm:px-10 pt-12 pb-10">
            <p
              className="text-[12px] uppercase tracking-[0.18em] mb-3"
              style={{ color: MUTED }}
            >
              Admin Overview
            </p>
            <h1
              className="text-[36px] sm:text-[44px] leading-[1.05] font-semibold tracking-tight"
              style={{ color: INK }}
            >
              {aggregated.length === 0
                ? "No walkers yet."
                : leader
                  ? `${leader.name} leads the offsite.`
                  : "All walkers."}
            </h1>
            <p
              className="text-[15px] mt-3 max-w-xl"
              style={{ color: MUTED }}
            >
              Live snapshot of every registered walker, aggregated across
              devices. Steps reflect the rolling 7-day window used by the
              public leaderboard.
            </p>
          </div>
        </section>

        <section className="border-b" style={{ borderColor: HAIRLINE }}>
          <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Stat
              icon={<Footprints className="w-3.5 h-3.5" strokeWidth={1.75} style={{ color: ALPENGLOW }} />}
              label="Total Stomp"
              value={formatNumber(totalSteps)}
            />
            <Stat
              icon={<Users className="w-3.5 h-3.5" strokeWidth={1.75} />}
              label="Walkers"
              value={`${formatNumber(aggregated.length)}${teamCount ? ` · ${teamCount} ${teamCount === 1 ? "team" : "teams"}` : ""}`}
            />
            <Stat
              icon={<Trophy className="w-3.5 h-3.5" strokeWidth={1.75} style={{ color: GOLD }} />}
              label="Top walker"
              value={
                leader
                  ? `${leader.name} · ${formatNumber(leader.steps)}`
                  : "—"
              }
            />
          </div>
        </section>

        <section>
          <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-12">
            <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
              <div>
                <p
                  className="text-[12px] uppercase tracking-[0.18em] mb-3"
                  style={{ color: MUTED }}
                >
                  Walker roster
                </p>
                <h2
                  className="text-[22px] sm:text-[26px] font-medium tracking-tight"
                  style={{ color: INK }}
                >
                  {aggregated.length}{" "}
                  {aggregated.length === 1 ? "walker" : "walkers"} · sorted by
                  steps
                </h2>
              </div>
              <label
                className="relative h-10 inline-flex items-center"
                style={{ color: MUTED }}
              >
                <Search
                  className="w-3.5 h-3.5 absolute left-3"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="Filter by name or team"
                  className="h-10 pl-9 pr-3 rounded-full text-[13px] w-64 focus:outline-none focus-visible:ring-2"
                  style={{
                    border: `1px solid ${HAIRLINE}`,
                    background: "var(--surface)",
                    color: INK,
                    ["--tw-ring-color" as never]: BAYERN,
                  }}
                />
              </label>
            </div>

            {status === "unconfigured" ? (
              <div
                className="rounded-lg p-6 text-[14px]"
                style={{ border: `1px solid ${HAIRLINE}`, color: MUTED }}
              >
                Firebase is not configured for this build, so live walker data
                is unavailable.
              </div>
            ) : aggregated.length === 0 ? (
              <div
                className="rounded-lg p-6 text-[14px]"
                style={{ border: `1px solid ${HAIRLINE}`, color: MUTED }}
              >
                {status === "connecting"
                  ? "Connecting to live data…"
                  : "No walkers have logged steps yet."}
              </div>
            ) : (
              <ul>
                {filtered.map((row, i) => {
                  const rankIdx = aggregated.indexOf(row);
                  const medal = rankIdx < 3 ? MEDALS[rankIdx] : null;
                  const pct = (row.steps / max) * 100;
                  return (
                    <li
                      key={row.uid + i}
                      className="grid grid-cols-12 gap-4 sm:gap-6 items-center py-5 border-b"
                      style={{ borderColor: HAIRLINE }}
                    >
                      <div className="col-span-2 sm:col-span-1 flex items-center">
                        {medal ? (
                          <span
                            className="inline-flex items-center justify-center w-7 h-7 rounded-full text-[12.5px] font-semibold tabular-nums"
                            style={{ background: medal.bg, color: medal.fg }}
                          >
                            {rankIdx + 1}
                          </span>
                        ) : (
                          <span
                            className="text-[16px] sm:text-[18px] font-medium tracking-tight tabular-nums"
                            style={{ color: INK }}
                          >
                            {String(rankIdx + 1).padStart(2, "0")}
                          </span>
                        )}
                      </div>
                      <div className="col-span-10 sm:col-span-4 min-w-0">
                        <p
                          className="text-[14px] sm:text-[15px] font-medium tracking-tight truncate"
                          style={{ color: INK }}
                          title={row.name}
                        >
                          {row.name}
                        </p>
                        <p
                          className="text-[12px] mt-0.5 truncate"
                          style={{ color: MUTED }}
                          title={row.team}
                        >
                          {row.team || "—"}
                        </p>
                      </div>
                      <div className="col-span-8 sm:col-span-5">
                        <div
                          className="h-[3px] w-full rounded-full overflow-hidden"
                          style={{ background: HAIRLINE }}
                        >
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${pct}%`,
                              background: "var(--color-bar-rest)",
                              transition: "width 500ms ease",
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-span-4 sm:col-span-2 text-right">
                        <p
                          className="text-[14px] sm:text-[15px] font-medium tracking-tight tabular-nums"
                          style={{ color: INK }}
                        >
                          {formatNumber(row.steps)}
                        </p>
                      </div>
                    </li>
                  );
                })}
                {filtered.length === 0 && (
                  <li
                    className="text-[13px] py-5"
                    style={{ color: MUTED }}
                  >
                    No walkers match “{filter}”.
                  </li>
                )}
              </ul>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t" style={{ borderColor: HAIRLINE }}>
        <div
          className="max-w-[1200px] mx-auto px-6 sm:px-10 py-8 text-[12px] tracking-tight"
          style={{ color: MUTED }}
        >
          CxE EMEA Offsite 2026 · Admin view · 7-day rolling totals
        </div>
      </footer>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="rounded-lg p-5"
      style={{ border: `1px solid ${HAIRLINE}` }}
    >
      <p
        className="text-[12px] uppercase tracking-[0.18em] mb-3 inline-flex items-center gap-2"
        style={{ color: MUTED }}
      >
        {icon}
        {label}
      </p>
      <p
        className="text-[22px] font-semibold tracking-tight tabular-nums"
        style={{ color: INK }}
      >
        {value}
      </p>
    </div>
  );
}
