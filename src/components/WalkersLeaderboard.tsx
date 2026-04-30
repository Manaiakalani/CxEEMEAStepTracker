import { useMemo, useState } from "react";
import {
  useStore,
  walkerLeaderboard,
  type WalkerRow,
} from "../store";
import {
  BAR_REST,
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

const MEDALS: Array<{ fg: string; bg: string }> = [
  { fg: GOLD, bg: GOLD_SOFT },
  { fg: SILVER, bg: SILVER_SOFT },
  { fg: BRONZE, bg: BRONZE_SOFT },
];

const PREVIEW = 10;

export function WalkersLeaderboard() {
  const { walkers, cloudUid, profile, entries } = useStore();
  const [showAll, setShowAll] = useState(false);

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
  const max = rows[0]?.steps || 1;
  const list = showAll ? rows : rows.slice(0, PREVIEW);
  const overflow = rows.length - list.length;

  const headline = useMemo(() => {
    if (rows.length === 0) return "Be the first walker on the board.";
    const leader = rows[0];
    if (leader.mine) return "You're leading the offsite.";
    return `${leader.name} leads the walkers.`;
  }, [rows]);

  return (
    <section className="border-b" style={{ borderColor: HAIRLINE }}>
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-14 sm:py-16">
        <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
          <div>
            <p
              className="text-[12px] uppercase tracking-[0.18em] mb-3"
              style={{ color: MUTED }}
            >
              Individual Walkers
            </p>
            <h2
              className="text-[22px] sm:text-[26px] font-medium tracking-tight"
              style={{ color: INK }}
            >
              {headline}
            </h2>
          </div>
          {rows.length > PREVIEW && (
            <button
              onClick={() => setShowAll((v) => !v)}
              className="h-11 px-4 -mr-4 rounded-full text-[13px] font-medium tracking-tight hover-surface transition-colors"
              style={{ color: BAYERN }}
            >
              {showAll
                ? "Show top 10"
                : `View all ${rows.length} walkers`}
            </button>
          )}
        </div>
        {rows.length === 0 ? (
          <div
            className="rounded-lg p-6 text-[14px]"
            style={{ border: `1px solid ${HAIRLINE}`, color: MUTED }}
          >
            No walkers have logged steps yet. Once you add some on the
            Dashboard, you'll appear here in real time.
          </div>
        ) : (
          <ul>
            {list.map((row, i) => (
              <WalkerLeaderboardRow
                key={row.uid}
                row={row}
                rank={i}
                pct={(row.steps / max) * 100}
              />
            ))}
            {!showAll && overflow > 0 && (
              <li
                className="text-[12.5px] py-3"
                style={{ color: MUTED }}
              >
                + {overflow} more {overflow === 1 ? "walker" : "walkers"}
              </li>
            )}
          </ul>
        )}
      </div>
    </section>
  );
}

function WalkerLeaderboardRow({
  row,
  rank,
  pct,
}: {
  row: WalkerRow;
  rank: number;
  pct: number;
}) {
  const medal = rank < 3 ? MEDALS[rank] : null;
  return (
    <li
      className="grid grid-cols-12 gap-4 sm:gap-6 items-center py-5 border-b transition-colors"
      style={{
        borderColor: HAIRLINE,
        background: row.mine ? BAYERN_SOFT : "transparent",
        marginInline: row.mine ? "-1rem" : 0,
        paddingInline: row.mine ? "1rem" : 0,
      }}
    >
      <div className="col-span-2 sm:col-span-1 flex items-center">
        {medal ? (
          <span
            className="inline-flex items-center justify-center w-7 h-7 rounded-full text-[12.5px] font-semibold tabular-nums"
            style={{ background: medal.bg, color: medal.fg }}
            aria-label={`${["First", "Second", "Third"][rank]} place`}
          >
            {rank + 1}
          </span>
        ) : (
          <span
            className="text-[16px] sm:text-[18px] font-medium tracking-tight tabular-nums"
            style={{ color: row.mine ? BAYERN : INK }}
          >
            {String(rank + 1).padStart(2, "0")}
          </span>
        )}
      </div>
      <div className="col-span-10 sm:col-span-4 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-[14px] sm:text-[15px] font-medium tracking-tight truncate"
            style={{ color: INK }}
            title={row.name}
          >
            {row.name}
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
              background: row.mine ? BAYERN : BAR_REST,
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
}
