import { useStore, leaderboardWith } from "../store";
import { BAYERN, BAYERN_SOFT, HAIRLINE, INK, MUTED } from "../theme";
import { formatNumber } from "../lib/format";

export function Leaderboard({
  limit = 5,
  showAllToggle = false,
  onSeeAll,
}: {
  limit?: number;
  showAllToggle?: boolean;
  onSeeAll?: () => void;
}) {
  const { entries, profile } = useStore();
  const teams = leaderboardWith(entries, profile.team);
  const max = teams[0]?.steps ?? 1;
  const list = teams.slice(0, limit);
  const leader = teams[0];
  const headline =
    leader?.name === profile.team
      ? `${profile.team} leads the offsite.`
      : `${leader?.name} leads the offsite.`;

  return (
    <section className="border-b" style={{ borderColor: HAIRLINE }}>
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-14 sm:py-16">
        <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
          <div>
            <p
              className="text-[12px] uppercase tracking-[0.18em] mb-3"
              style={{ color: MUTED }}
            >
              Team Standings
            </p>
            <h2
              className="text-[22px] sm:text-[26px] font-medium tracking-tight"
              style={{ color: INK }}
            >
              {headline}
            </h2>
          </div>
          {showAllToggle && (
            <button
              onClick={onSeeAll}
              className="h-11 px-4 -mr-4 rounded-full text-[13px] font-medium tracking-tight hover:bg-stone-50 transition-colors"
              style={{ color: BAYERN }}
            >
              See all teams
            </button>
          )}
        </div>
        <ul>
          {list.map((t, i) => {
            const pct = (t.steps / max) * 100;
            return (
              <li
                key={t.id}
                className="grid grid-cols-12 gap-4 sm:gap-6 items-center py-5 border-b"
                style={{
                  borderColor: HAIRLINE,
                  background: t.mine ? BAYERN_SOFT : "transparent",
                  marginInline: t.mine ? "-1rem" : 0,
                  paddingInline: t.mine ? "1rem" : 0,
                }}
              >
                <div className="col-span-2 sm:col-span-1 flex items-center">
                  <span
                    className="text-[16px] sm:text-[18px] font-medium tracking-tight tabular-nums"
                    style={{ color: t.mine ? BAYERN : INK }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="col-span-10 sm:col-span-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="text-[14px] sm:text-[15px] font-medium tracking-tight"
                      style={{ color: INK }}
                    >
                      {t.name}
                    </span>
                    {t.mine && (
                      <span
                        className="text-[10.5px] uppercase tracking-[0.14em] px-1.5 h-4 inline-flex items-center rounded"
                        style={{ background: BAYERN, color: "#fff" }}
                      >
                        Your team
                      </span>
                    )}
                  </div>
                  <p
                    className="text-[12px] mt-0.5"
                    style={{ color: MUTED }}
                  >
                    {t.members} walkers
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
                        background: t.mine ? BAYERN : "#9FB6CC",
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
                    {formatNumber(t.steps)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
