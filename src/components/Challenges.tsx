import { ArrowUpRight, Check } from "lucide-react";
import { useState } from "react";
import { useStore, weekTotalFor } from "../store";
import { CHALLENGES } from "../data";
import {
  ALPENGLOW,
  ALPENGLOW_SOFT,
  BAR_REST,
  BAYERN,
  HAIRLINE,
  INK,
  MUTED,
} from "../theme";
import { formatNumber } from "../lib/format";

const PREVIEW_COUNT = 4;

export function Challenges() {
  const { entries } = useStore();
  const week = weekTotalFor(entries);
  const [showAll, setShowAll] = useState(false);
  const list = showAll ? CHALLENGES : CHALLENGES.slice(0, PREVIEW_COUNT);

  return (
    <section className="border-b" style={{ borderColor: HAIRLINE }}>
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-14 sm:py-16">
        <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
          <div>
            <p
              className="text-[12px] uppercase tracking-[0.18em] mb-3"
              style={{ color: MUTED }}
            >
              Munich Challenges
            </p>
            <h2
              className="text-[22px] sm:text-[26px] font-medium tracking-tight"
              style={{ color: INK }}
            >
              Walk the city, one landmark at a time.
            </h2>
          </div>
          <button
            onClick={() => setShowAll((v) => !v)}
            className="h-11 px-4 -mr-4 rounded-full text-[13px] font-medium tracking-tight inline-flex items-center gap-1 hover-surface transition-colors"
            style={{ color: BAYERN }}
          >
            {showAll ? "Show fewer" : `View all ${CHALLENGES.length}`}
            <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} />
          </button>
        </div>
        <ul className="border-t" style={{ borderColor: HAIRLINE }}>
          {list.map((c, i) => {
            const current = Math.min(c.target, week);
            const pct = Math.min(100, Math.round((current / c.target) * 100));
            const done = current >= c.target;
            // Progress hue tells the story: cool at rest, brand mid-stride,
            // alpenglow at the summit. Picked at thresholds so transitions
            // feel earned rather than gradient-y.
            const barColor = done ? ALPENGLOW : pct >= 50 ? BAYERN : BAR_REST;
            return (
              <li
                key={c.id}
                className="grid grid-cols-12 gap-4 sm:gap-8 items-center py-6 sm:py-7 border-b"
                style={{ borderColor: HAIRLINE }}
              >
                <div className="col-span-1 hidden sm:block">
                  <span
                    className="text-[12px] tabular-nums"
                    style={{ color: MUTED }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="col-span-12 sm:col-span-5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3
                      className="text-[15px] sm:text-[16px] font-medium tracking-tight"
                      style={{ color: INK }}
                    >
                      {c.name}
                    </h3>
                    {done && (
                      <span
                        className="inline-flex items-center gap-1 text-[11px] px-2 h-5 rounded-full transition-colors"
                        style={{ background: ALPENGLOW_SOFT, color: ALPENGLOW }}
                      >
                        <Check className="w-3 h-3" strokeWidth={2} />
                        done
                      </span>
                    )}
                  </div>
                  <p
                    className="text-[13px] mt-1 leading-relaxed"
                    style={{ color: MUTED }}
                  >
                    {c.story}
                  </p>
                </div>
                <div className="col-span-8 sm:col-span-4">
                  <div
                    className="h-[3px] w-full rounded-full overflow-hidden"
                    style={{ background: HAIRLINE }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${pct}%`,
                        background: barColor,
                        transition:
                          "width 500ms ease, background-color 300ms ease",
                      }}
                    />
                  </div>
                </div>
                <div className="col-span-4 sm:col-span-2 text-right">
                  <p
                    className="text-[14px] sm:text-[15px] font-medium tracking-tight tabular-nums"
                    style={{ color: INK }}
                  >
                    {formatNumber(current)}
                    <span className="font-normal" style={{ color: MUTED }}>
                      {" "}/{" "}
                      {formatNumber(c.target)}
                    </span>
                  </p>
                  <p
                    className="text-[11px] uppercase tracking-[0.14em] mt-1 tabular-nums"
                    style={{ color: MUTED }}
                  >
                    {pct}%
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
