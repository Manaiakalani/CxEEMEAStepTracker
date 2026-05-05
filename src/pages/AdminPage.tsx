import { useEffect, useMemo, useState, type FormEvent } from "react";
import { LogOut, Lock, Trophy, Search } from "lucide-react";
import { isFirebaseConfigured } from "../firebase-config";
import {
  ensureAnonUser,
  subscribeLeaderboard,
  type LeaderboardEntry,
} from "../lib/cloud-sync";
import { weekTotalFor } from "../store";
import { canonicalTeam } from "../data";
import { formatNumber, isoDate, relativeTime } from "../lib/format";
import {
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
  today: number;
  updatedAt: number | null;
};

type SortKey = "week" | "today" | "recent";

function aggregate(rows: LeaderboardEntry[]): AdminRow[] {
  // Group by (lower(name) | lower(team)) so cross-device duplicates collapse,
  // matching the public leaderboard's aggregation semantics. When devices
  // collapse, we sum steps and keep the most recent updatedAt.
  const todayKey = isoDate(new Date());
  const groups = new Map<string, AdminRow>();
  for (const r of rows) {
    const name = (r.name ?? "").trim();
    if (!name) continue;
    const team = canonicalTeam((r.team ?? "").trim());
    const key = `${name.toLowerCase()}|${team.toLowerCase()}`;
    const docSteps = weekTotalFor(r.entries);
    const docToday = Math.max(0, Math.floor(r.entries?.[todayKey] ?? 0));
    const cur = groups.get(key);
    if (cur) {
      cur.steps += docSteps;
      cur.today += docToday;
      if (
        r.updatedAt != null &&
        (cur.updatedAt == null || r.updatedAt > cur.updatedAt)
      ) {
        cur.updatedAt = r.updatedAt;
      }
    } else {
      groups.set(key, {
        name,
        team,
        uid: r.uid,
        steps: docSteps,
        today: docToday,
        updatedAt: r.updatedAt ?? null,
      });
    }
  }
  return Array.from(groups.values()).sort((a, b) => b.steps - a.steps);
}

function sortRows(rows: AdminRow[], by: SortKey): AdminRow[] {
  const copy = [...rows];
  if (by === "today") copy.sort((a, b) => b.today - a.today || b.steps - a.steps);
  else if (by === "recent")
    copy.sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0));
  else copy.sort((a, b) => b.steps - a.steps);
  return copy;
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
  const [sortBy, setSortBy] = useState<SortKey>("week");
  // Tick once a minute so the "x min ago" labels refresh without needing a
  // new Firestore snapshot.
  const [, setTick] = useState(0);

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

  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const aggregated = useMemo(() => aggregate(rows), [rows]);
  const sorted = useMemo(() => sortRows(aggregated, sortBy), [aggregated, sortBy]);
  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return sorted;
    return sorted.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.team.toLowerCase().includes(q),
    );
  }, [sorted, filter]);

  const totalSteps = aggregated.reduce((s, r) => s + r.steps, 0);
  const totalToday = aggregated.reduce((s, r) => s + r.today, 0);
  const teamCount = new Set(aggregated.map((r) => r.team).filter(Boolean)).size;
  const leader = aggregated[0];
  const max = leader?.steps || 1;
  const activeIn5Min = aggregated.filter(
    (r) => r.updatedAt != null && Date.now() - r.updatedAt < 5 * 60_000,
  ).length;

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
        {aggregated.length === 0 ? (
          <section>
            <div className="max-w-[1200px] mx-auto px-6 sm:px-10 pt-16 pb-12">
              <p
                className="text-[12px] uppercase tracking-[0.18em] mb-3"
                style={{ color: MUTED }}
              >
                Admin
              </p>
              <h1
                className="text-[36px] sm:text-[44px] leading-[1.05] font-semibold tracking-tight"
                style={{ color: INK }}
              >
                {status === "unconfigured"
                  ? "Cloud sync isn't configured."
                  : status === "connecting"
                    ? "Connecting to live data…"
                    : "No walkers yet."}
              </h1>
            </div>
          </section>
        ) : (
          <>
            <WinnerHero
              leader={leader!}
              runnerUp={aggregated[1] ?? null}
              total={totalSteps}
              totalToday={totalToday}
              walkers={aggregated.length}
              teams={teamCount}
              activeNow={activeIn5Min}
            />
            <Podium rows={aggregated.slice(0, 3)} />
            <RosterToggle
              filtered={filtered}
              sorted={sorted}
              max={max}
              filter={filter}
              setFilter={setFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
              count={aggregated.length}
            />
          </>
        )}
      </main>

      <footer className="border-t" style={{ borderColor: HAIRLINE }}>
        <div
          className="max-w-[1200px] mx-auto px-6 sm:px-10 py-8 text-[12px] tracking-tight"
          style={{ color: MUTED }}
        >
          Admin view · live · 7-day rolling totals · today &amp; last-update derived per device
        </div>
      </footer>
    </div>
  );
}

function WinnerHero({
  leader,
  runnerUp,
  total,
  totalToday,
  walkers,
  teams,
  activeNow,
}: {
  leader: AdminRow;
  runnerUp: AdminRow | null;
  total: number;
  totalToday: number;
  walkers: number;
  teams: number;
  activeNow: number;
}) {
  const lead = runnerUp ? leader.steps - runnerUp.steps : leader.steps;
  return (
    <section className="border-b" style={{ borderColor: HAIRLINE }}>
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 pt-14 pb-12 grid grid-cols-12 gap-6 sm:gap-10">
        <div className="col-span-12 md:col-span-8">
          <p
            className="text-[12px] uppercase tracking-[0.18em] mb-3 inline-flex items-center gap-2"
            style={{ color: GOLD }}
          >
            <Trophy className="w-3.5 h-3.5" strokeWidth={1.75} />
            Currently winning
          </p>
          <h1
            className="text-[44px] sm:text-[64px] leading-[1] font-semibold tracking-tight"
            style={{ color: INK }}
          >
            {leader.name}
          </h1>
          <p
            className="text-[15px] mt-2"
            style={{ color: MUTED }}
          >
            {leader.team || "No team"}
          </p>
          <p
            className="text-[44px] sm:text-[56px] leading-[1] font-semibold tracking-tight tabular-nums mt-6"
            style={{ color: BAYERN }}
          >
            {formatNumber(leader.steps)}
            <span
              className="text-[14px] uppercase tracking-[0.16em] ml-2 font-normal align-middle"
              style={{ color: MUTED }}
            >
              steps · 7 days
            </span>
          </p>
          {runnerUp && lead > 0 && (
            <p
              className="text-[13.5px] mt-3"
              style={{ color: MUTED }}
            >
              <span style={{ color: INK, fontWeight: 500 }}>
                {formatNumber(lead)}
              </span>{" "}
              ahead of {runnerUp.name} ({formatNumber(runnerUp.steps)})
            </p>
          )}
          {leader.today > 0 && (
            <p
              className="text-[13.5px] mt-1"
              style={{ color: MUTED }}
            >
              <span style={{ color: INK, fontWeight: 500 }}>
                {formatNumber(leader.today)}
              </span>{" "}
              steps today
            </p>
          )}
        </div>
        <div className="col-span-12 md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-3 content-start">
          <MiniStat label="Total Stomp" value={formatNumber(total)} hint={`${formatNumber(totalToday)} today`} />
          <MiniStat
            label="Walkers"
            value={`${formatNumber(walkers)}`}
            hint={teams ? `${teams} ${teams === 1 ? "team" : "teams"}` : undefined}
          />
          <MiniStat
            label="Active now"
            value={`${activeNow}`}
            hint="last 5 min"
            tone="success"
          />
        </div>
      </div>
    </section>
  );
}

function MiniStat({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "success";
}) {
  return (
    <div
      className="rounded-lg px-4 py-3"
      style={{ border: `1px solid ${HAIRLINE}` }}
    >
      <p
        className="text-[10.5px] uppercase tracking-[0.16em]"
        style={{ color: MUTED }}
      >
        {label}
      </p>
      <p
        className="text-[18px] font-semibold tracking-tight tabular-nums mt-0.5"
        style={{ color: tone === "success" ? "var(--color-success)" : INK }}
      >
        {value}
      </p>
      {hint && (
        <p
          className="text-[11.5px] mt-0.5"
          style={{ color: MUTED }}
        >
          {hint}
        </p>
      )}
    </div>
  );
}

function Podium({ rows }: { rows: AdminRow[] }) {
  if (rows.length === 0) return null;
  return (
    <section className="border-b" style={{ borderColor: HAIRLINE }}>
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-12">
        <p
          className="text-[12px] uppercase tracking-[0.18em] mb-6"
          style={{ color: MUTED }}
        >
          Podium
        </p>
        <ol className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
          {rows.map((row, i) => {
            const medal = MEDALS[i];
            const labels = ["1st", "2nd", "3rd"];
            return (
              <li
                key={row.uid}
                className="rounded-lg p-5 flex flex-col"
                style={{
                  border: `1px solid ${i === 0 ? GOLD : HAIRLINE}`,
                  background: i === 0 ? GOLD_SOFT : "transparent",
                }}
              >
                <span
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full text-[13px] font-semibold"
                  style={{ background: medal.bg, color: medal.fg }}
                >
                  {labels[i]}
                </span>
                <p
                  className="text-[18px] sm:text-[20px] font-semibold tracking-tight mt-4 truncate"
                  style={{ color: INK }}
                  title={row.name}
                >
                  {row.name}
                </p>
                <p
                  className="text-[12.5px] mt-0.5 truncate"
                  style={{ color: MUTED }}
                  title={row.team}
                >
                  {row.team || "—"}
                </p>
                <p
                  className="text-[24px] font-semibold tracking-tight tabular-nums mt-3"
                  style={{ color: INK }}
                >
                  {formatNumber(row.steps)}
                  <span
                    className="text-[11px] uppercase tracking-[0.14em] ml-1.5 font-normal"
                    style={{ color: MUTED }}
                  >
                    steps
                  </span>
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function RosterToggle(props: {
  filtered: AdminRow[];
  sorted: AdminRow[];
  max: number;
  filter: string;
  setFilter: (v: string) => void;
  sortBy: SortKey;
  setSortBy: (v: SortKey) => void;
  count: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <section>
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-10">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="text-[13px] font-medium tracking-tight hover:underline transition-colors"
          style={{ color: BAYERN }}
        >
          {open ? "Hide" : "Show"} full roster ({props.count}{" "}
          {props.count === 1 ? "walker" : "walkers"})
        </button>
        {open && <RosterTable {...props} />}
      </div>
    </section>
  );
}

function RosterTable({
  filtered,
  sorted,
  max,
  filter,
  setFilter,
  sortBy,
  setSortBy,
}: {
  filtered: AdminRow[];
  sorted: AdminRow[];
  max: number;
  filter: string;
  setFilter: (v: string) => void;
  sortBy: SortKey;
  setSortBy: (v: SortKey) => void;
}) {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-end gap-3 flex-wrap mb-6">
        <SortToggle value={sortBy} onChange={setSortBy} />
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
            className="h-10 pl-9 pr-3 rounded-full text-[13px] w-56 focus:outline-none focus-visible:ring-2"
            style={{
              border: `1px solid ${HAIRLINE}`,
              background: "var(--surface)",
              color: INK,
              ["--tw-ring-color" as never]: BAYERN,
            }}
          />
        </label>
      </div>

      <ul>
        {filtered.map((row, i) => {
          const rankIdx = sorted.indexOf(row);
          const medal = rankIdx < 3 ? MEDALS[rankIdx] : null;
          const pct = (row.steps / max) * 100;
          const fresh =
            row.updatedAt != null && Date.now() - row.updatedAt < 5 * 60_000;
          return (
            <li
              key={row.uid + i}
              className="grid grid-cols-12 gap-3 sm:gap-5 items-center py-5 border-b"
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
              <div className="col-span-10 sm:col-span-3 min-w-0">
                <div className="flex items-center gap-1.5 min-w-0">
                  <p
                    className="text-[14px] sm:text-[15px] font-medium tracking-tight truncate"
                    style={{ color: INK }}
                    title={row.name}
                  >
                    {row.name}
                  </p>
                  {fresh && (
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: "var(--color-success)" }}
                      aria-label="Active in the last 5 minutes"
                      title="Active in the last 5 minutes"
                    />
                  )}
                </div>
                <p
                  className="text-[12px] mt-0.5 truncate"
                  style={{ color: MUTED }}
                  title={row.team}
                >
                  {row.team || "—"}
                </p>
              </div>
              <div className="col-span-4 sm:col-span-2 text-right">
                <p
                  className="text-[10.5px] uppercase tracking-[0.14em]"
                  style={{ color: MUTED }}
                >
                  Today
                </p>
                <p
                  className="text-[14px] sm:text-[15px] font-medium tracking-tight tabular-nums"
                  style={{ color: row.today > 0 ? INK : MUTED }}
                >
                  {formatNumber(row.today)}
                </p>
              </div>
              <div className="col-span-4 sm:col-span-2 text-right">
                <p
                  className="text-[10.5px] uppercase tracking-[0.14em]"
                  style={{ color: MUTED }}
                >
                  Last update
                </p>
                <p
                  className="text-[12.5px] tracking-tight tabular-nums"
                  style={{ color: fresh ? "var(--color-success)" : MUTED }}
                  title={
                    row.updatedAt
                      ? new Date(row.updatedAt).toLocaleString()
                      : "Never"
                  }
                >
                  {row.updatedAt ? relativeTime(row.updatedAt) : "—"}
                </p>
              </div>
              <div className="hidden sm:block sm:col-span-2">
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
                  className="text-[10.5px] uppercase tracking-[0.14em]"
                  style={{ color: MUTED }}
                >
                  7-day
                </p>
                <p
                  className="text-[14px] sm:text-[15px] font-semibold tracking-tight tabular-nums"
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
    </div>
  );
}


function SortToggle({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (v: SortKey) => void;
}) {
  const options: Array<{ key: SortKey; label: string }> = [
    { key: "week", label: "7-day" },
    { key: "today", label: "Today" },
    { key: "recent", label: "Recent" },
  ];
  return (
    <div
      role="radiogroup"
      aria-label="Sort walkers"
      className="inline-flex h-10 rounded-full p-1"
      style={{ border: `1px solid ${HAIRLINE}`, background: "var(--surface)" }}
    >
      {options.map((opt) => {
        const active = value === opt.key;
        return (
          <button
            key={opt.key}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.key)}
            className="px-3 h-8 rounded-full text-[12.5px] font-medium tracking-tight transition-colors"
            style={{
              background: active ? BAYERN : "transparent",
              color: active ? "#fff" : MUTED,
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

