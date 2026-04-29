import { useStore } from "../store";
import { BAYERN, HAIRLINE, INK, MUTED } from "../theme";
import { formatNumber, isoDate, lastNDays, shortDayLabel } from "../lib/format";

export function WeeklyChart() {
  const { entries, profile, todayKey } = useStore();
  const goal = profile.goal;
  const days = lastNDays(7).map((d) => {
    const key = isoDate(d);
    return {
      key,
      label: shortDayLabel(d),
      value: entries[key] ?? 0,
      today: key === todayKey,
    };
  });
  const total = days.reduce((s, d) => s + d.value, 0);
  const metCount = days.filter((d) => d.value >= goal).length;
  const observedMax = Math.max(goal * 1.5, ...days.map((d) => d.value), 1000);
  const max = Math.ceil(observedMax / 1000) * 1000;
  return (
    <section className="border-b" style={{ borderColor: HAIRLINE }}>
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-14 sm:py-16">
        <div className="flex items-end justify-between mb-8 sm:mb-10 gap-4 flex-wrap">
          <div>
            <p
              className="text-[12px] uppercase tracking-[0.18em] mb-3"
              style={{ color: MUTED }}
            >
              This Week
            </p>
            <h2
              className="text-[22px] sm:text-[26px] font-medium tracking-tight"
              style={{ color: INK }}
            >
              {formatNumber(total)} steps · {metCount} of 7 goals met
            </h2>
          </div>
          <div
            className="flex items-center gap-4 text-[12px]"
            style={{ color: MUTED }}
          >
            <span className="inline-flex items-center gap-2">
              <span
                className="w-3 h-[2px] rounded"
                style={{ background: BAYERN }}
              />
              Steps
            </span>
            <span className="inline-flex items-center gap-2">
              <span
                className="w-3 h-[1px]"
                style={{ borderTop: `1px dashed ${MUTED}` }}
              />
              Goal {formatNumber(goal)}
            </span>
          </div>
        </div>
        <div className="relative h-[220px] sm:h-[260px]">
          <div
            className="absolute inset-x-0"
            style={{
              top: `${100 - (goal / max) * 100}%`,
              borderTop: `1px dashed ${HAIRLINE}`,
            }}
          />
          <div className="grid grid-cols-7 gap-3 sm:gap-6 h-full items-end">
            {days.map((day) => {
              const h = (day.value / max) * 100;
              const met = day.value >= goal;
              return (
                <div
                  key={day.key}
                  className="flex flex-col items-center justify-end h-full"
                >
                  <span
                    className="text-[11px] sm:text-[12px] tabular-nums mb-2"
                    style={{
                      color: day.today ? BAYERN : MUTED,
                      fontWeight: day.today ? 600 : 400,
                    }}
                  >
                    {formatNumber(day.value)}
                  </span>
                  <div
                    className="w-full rounded-t-sm relative"
                    style={{
                      height: `${Math.max(2, h)}%`,
                      background: day.today
                        ? BAYERN
                        : met
                          ? "#9FB6CC"
                          : HAIRLINE,
                      transition: "height 500ms ease",
                    }}
                  >
                    {met && !day.today && (
                      <span
                        className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                        style={{ background: BAYERN }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div
            className="grid grid-cols-7 gap-3 sm:gap-6 mt-3 border-t pt-3"
            style={{ borderColor: HAIRLINE }}
          >
            {days.map((day) => (
              <div
                key={day.key}
                className="text-center text-[11px] sm:text-[12px] uppercase tracking-[0.14em]"
                style={{
                  color: day.today ? INK : MUTED,
                  fontWeight: day.today ? 600 : 400,
                }}
              >
                {day.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
