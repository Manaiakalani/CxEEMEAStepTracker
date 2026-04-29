import { ProgressRing } from "./ProgressRing";
import { useStore } from "../store";
import { BAYERN, HAIRLINE, INK, MUTED } from "../theme";
import { formatNumber } from "../lib/format";

export function TodayFocus() {
  const { todaySteps, profile } = useStore();
  const goal = profile.goal;
  const pct = Math.min(100, Math.round((todaySteps / goal) * 100));
  const remaining = Math.max(0, goal - todaySteps);
  return (
    <section className="border-b" style={{ borderColor: HAIRLINE }}>
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-16 sm:py-20">
        <div className="grid grid-cols-12 gap-8 sm:gap-12 items-center">
          <div className="col-span-12 md:col-span-7">
            <p
              className="text-[12px] uppercase tracking-[0.18em] mb-6"
              style={{ color: MUTED }}
            >
              Today
            </p>
            <div className="flex items-baseline gap-3 flex-wrap">
              <span
                className="text-[96px] sm:text-[140px] leading-none font-semibold tracking-[-0.04em] tabular-nums"
                style={{ color: INK }}
              >
                {formatNumber(todaySteps)}
              </span>
              <span
                className="text-[22px] sm:text-[28px] font-light tracking-tight"
                style={{ color: MUTED }}
              >
                / {formatNumber(goal)} steps
              </span>
            </div>
            <div
              className="mt-10 grid grid-cols-3 max-w-xl border-t border-b py-6 divide-x"
              style={{ borderColor: HAIRLINE, borderRightColor: HAIRLINE }}
            >
              <div className="pr-4 sm:pr-6">
                <p
                  className="text-[11px] uppercase tracking-[0.16em] mb-2"
                  style={{ color: MUTED }}
                >
                  Goal
                </p>
                <p
                  className="text-[18px] sm:text-[20px] font-medium tracking-tight tabular-nums"
                  style={{ color: INK }}
                >
                  {formatNumber(goal)}
                </p>
              </div>
              <div className="px-4 sm:px-6" style={{ borderColor: HAIRLINE }}>
                <p
                  className="text-[11px] uppercase tracking-[0.16em] mb-2"
                  style={{ color: MUTED }}
                >
                  Remaining
                </p>
                <p
                  className="text-[18px] sm:text-[20px] font-medium tracking-tight tabular-nums"
                  style={{ color: INK }}
                >
                  {formatNumber(remaining)}
                </p>
              </div>
              <div className="pl-4 sm:pl-6" style={{ borderColor: HAIRLINE }}>
                <p
                  className="text-[11px] uppercase tracking-[0.16em] mb-2"
                  style={{ color: MUTED }}
                >
                  Complete
                </p>
                <p
                  className="text-[18px] sm:text-[20px] font-medium tracking-tight tabular-nums"
                  style={{ color: BAYERN }}
                >
                  {pct}%
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 flex items-center justify-center">
            <div className="relative">
              <ProgressRing percent={pct} size={300} stroke={4} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                  className="text-[44px] sm:text-[56px] font-semibold tracking-[-0.03em] tabular-nums"
                  style={{ color: INK }}
                >
                  {pct}%
                </span>
                <span
                  className="text-[12px] uppercase tracking-[0.16em] mt-1"
                  style={{ color: MUTED }}
                >
                  of daily goal
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
