import { useMemo } from "react";
import { Footprints, Users } from "lucide-react";
import {
  totalStomp,
  useStore,
  walkerLeaderboard,
  type WalkerRow,
} from "../store";
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
import { formatNumber } from "../lib/format";

const PODIUM: Array<{ label: string; fg: string; bg: string }> = [
  { label: "1st", fg: GOLD, bg: GOLD_SOFT },
  { label: "2nd", fg: SILVER, bg: SILVER_SOFT },
  { label: "3rd", fg: BRONZE, bg: BRONZE_SOFT },
];

export function TopStomp() {
  const { walkers, cloudUid, profile, entries } = useStore();
  const rows = useMemo(
    () =>
      walkerLeaderboard(
        walkers,
        cloudUid,
        profile.name,
        profile.team,
        entries,
      ),
    [walkers, cloudUid, profile.name, profile.team, entries],
  );
  const total = useMemo(() => totalStomp(rows), [rows]);
  const top3 = rows.slice(0, 3);
  const teamCount = useMemo(
    () => new Set(rows.map((r) => r.team).filter(Boolean)).size,
    [rows],
  );

  return (
    <section className="border-b" style={{ borderColor: HAIRLINE }}>
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-12 sm:py-14">
        <div className="grid grid-cols-12 gap-6 sm:gap-10 items-end">
          <div className="col-span-12 sm:col-span-5">
            <p
              className="text-[12px] uppercase tracking-[0.18em] mb-3 inline-flex items-center gap-2"
              style={{ color: MUTED }}
            >
              <Footprints
                className="w-3.5 h-3.5"
                strokeWidth={1.75}
                style={{ color: ALPENGLOW }}
              />
              Total Stomp
            </p>
            <p
              className="text-[44px] sm:text-[56px] leading-[1] font-semibold tracking-tight tabular-nums"
              style={{ color: INK }}
            >
              {formatNumber(total)}
            </p>
            <p
              className="text-[13.5px] mt-3 inline-flex items-center gap-2"
              style={{ color: MUTED }}
            >
              <Users className="w-3.5 h-3.5" strokeWidth={1.75} />
              Collective steps from {rows.length}{" "}
              {rows.length === 1 ? "walker" : "walkers"}
              {teamCount > 0 && (
                <>
                  {" "}across {teamCount}{" "}
                  {teamCount === 1 ? "team" : "teams"}
                </>
              )}
              .
            </p>
          </div>
          <div className="col-span-12 sm:col-span-7">
            <p
              className="text-[12px] uppercase tracking-[0.18em] mb-4"
              style={{ color: MUTED }}
            >
              Top Walkers
            </p>
            {top3.length === 0 ? (
              <div
                className="rounded-lg p-5 text-[13.5px]"
                style={{ border: `1px solid ${HAIRLINE}`, color: MUTED }}
              >
                No walkers logged yet — be the first to add some steps.
              </div>
            ) : (
              <ol className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {top3.map((w, i) => (
                  <PodiumTile key={w.uid} row={w} place={i} />
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function PodiumTile({ row, place }: { row: WalkerRow; place: number }) {
  const medal = PODIUM[place];
  return (
    <li
      className="rounded-lg p-4 transition-colors"
      style={{
        border: `1px solid ${row.mine ? BAYERN : HAIRLINE}`,
        background: row.mine ? BAYERN_SOFT : "transparent",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="inline-flex items-center justify-center w-7 h-7 rounded-full text-[11.5px] font-semibold tracking-tight"
          style={{ background: medal.bg, color: medal.fg }}
          aria-label={`${["First", "Second", "Third"][place]} place`}
        >
          {medal.label}
        </span>
        {row.mine && (
          <span
            className="text-[10.5px] uppercase tracking-[0.14em] px-1.5 h-4 inline-flex items-center rounded"
            style={{ background: BAYERN, color: "#fff" }}
          >
            You
          </span>
        )}
      </div>
      <p
        className="text-[15px] font-medium tracking-tight mt-3 truncate"
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
      <p
        className="text-[20px] font-medium tracking-tight tabular-nums mt-3"
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
}
