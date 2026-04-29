import { Leaderboard } from "../components/Leaderboard";
import { TEAMS } from "../data";
import { HAIRLINE, INK, MUTED } from "../theme";

export function LeaderboardPage() {
  return (
    <>
      <header className="border-b" style={{ borderColor: HAIRLINE }}>
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 pt-12 pb-10">
          <p
            className="text-[12px] uppercase tracking-[0.18em] mb-3"
            style={{ color: MUTED }}
          >
            Leaderboard
          </p>
          <h1
            className="text-[36px] sm:text-[44px] leading-[1.05] font-semibold tracking-tight"
            style={{ color: INK }}
          >
            All {TEAMS.length} CxE teams.
          </h1>
          <p
            className="text-[15px] mt-3 max-w-md"
            style={{ color: MUTED }}
          >
            Step totals refresh as the offsite progresses. Your contribution
            updates your team in real time.
          </p>
        </div>
      </header>
      <Leaderboard limit={TEAMS.length} />
    </>
  );
}
