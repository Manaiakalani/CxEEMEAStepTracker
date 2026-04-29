import { Check, Users } from "lucide-react";
import { useStore, leaderboardWith } from "../store";
import { BAYERN, BAYERN_SOFT, HAIRLINE, INK, MUTED, SURFACE } from "../theme";
import { formatNumber } from "../lib/format";

export function TeamsPage() {
  const { entries, profile, setProfile } = useStore();
  const teams = leaderboardWith(entries, profile.team);

  return (
    <>
      <header className="border-b" style={{ borderColor: HAIRLINE }}>
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 pt-12 pb-10">
          <p
            className="text-[12px] uppercase tracking-[0.18em] mb-3"
            style={{ color: MUTED }}
          >
            Teams
          </p>
          <h1
            className="text-[36px] sm:text-[44px] leading-[1.05] font-semibold tracking-tight"
            style={{ color: INK }}
          >
            Pick your team.
          </h1>
          <p
            className="text-[15px] mt-3 max-w-md"
            style={{ color: MUTED }}
          >
            Your steps add to your team's offsite total. Switch any time —
            we'll move your contribution.
          </p>
        </div>
      </header>
      <section className="border-b" style={{ borderColor: HAIRLINE }}>
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-12">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {teams.map((t) => {
              const isMine = t.name === profile.team;
              return (
                <li key={t.id}>
                  <button
                    onClick={() => setProfile({ team: t.name })}
                    className="w-full text-left p-5 rounded-lg border transition-all hover:border-[color:var(--bayern)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                    style={{
                      borderColor: isMine ? BAYERN : HAIRLINE,
                      background: isMine ? BAYERN_SOFT : SURFACE,
                      ["--bayern" as any]: BAYERN,
                      ["--tw-ring-color" as any]: BAYERN,
                    }}
                    aria-pressed={isMine}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p
                          className="text-[16px] font-medium tracking-tight"
                          style={{ color: INK }}
                        >
                          {t.name}
                        </p>
                        <p
                          className="text-[12px] mt-1 inline-flex items-center gap-1"
                          style={{ color: MUTED }}
                        >
                          <Users className="w-3 h-3" strokeWidth={1.75} />
                          {t.members} walkers
                        </p>
                      </div>
                      {isMine && (
                        <span
                          className="w-6 h-6 rounded-full inline-flex items-center justify-center"
                          style={{ background: BAYERN, color: "#fff" }}
                          aria-hidden
                        >
                          <Check className="w-3.5 h-3.5" strokeWidth={2.25} />
                        </span>
                      )}
                    </div>
                    <div className="mt-5 flex items-baseline gap-2">
                      <span
                        className="text-[24px] font-semibold tracking-tight tabular-nums"
                        style={{ color: INK }}
                      >
                        {formatNumber(t.steps)}
                      </span>
                      <span
                        className="text-[12px]"
                        style={{ color: MUTED }}
                      >
                        steps this week
                      </span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
