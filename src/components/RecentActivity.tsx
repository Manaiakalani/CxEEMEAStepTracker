import { Footprints } from "lucide-react";
import { useStore } from "../store";
import { BAYERN_SOFT, HAIRLINE, INK, MUTED, BAYERN } from "../theme";
import { formatNumber, relativeTime } from "../lib/format";

export function RecentActivity() {
  const { activity } = useStore();
  return (
    <section className="border-b" style={{ borderColor: HAIRLINE }}>
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-14 sm:py-16">
        <p
          className="text-[12px] uppercase tracking-[0.18em] mb-3"
          style={{ color: MUTED }}
        >
          Recent Activity
        </p>
        <h2
          className="text-[22px] sm:text-[26px] font-medium tracking-tight mb-8"
          style={{ color: INK }}
        >
          Today's log.
        </h2>
        {activity.length === 0 ? (
          <p className="text-[14px]" style={{ color: MUTED }}>
            No entries yet today. Use the form above to log your first walk.
          </p>
        ) : (
          <ul>
            {activity.map((a) => (
              <li
                key={a.id}
                className="flex items-center gap-4 py-4 border-b"
                style={{ borderColor: HAIRLINE }}
              >
                <span
                  className="w-9 h-9 rounded-full inline-flex items-center justify-center"
                  style={{ background: BAYERN_SOFT, color: BAYERN }}
                >
                  <Footprints className="w-4 h-4" strokeWidth={1.75} />
                </span>
                <div className="flex-1">
                  <p
                    className="text-[14px] font-medium tabular-nums"
                    style={{ color: INK }}
                  >
                    +{formatNumber(a.amount)} steps
                  </p>
                  <p className="text-[12px]" style={{ color: MUTED }}>
                    {a.source === "quick" ? "Quick add" : "Manual entry"} ·{" "}
                    {relativeTime(a.ts)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
