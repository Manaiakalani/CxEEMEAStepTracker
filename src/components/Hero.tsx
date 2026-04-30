import { CalendarDays, Cloud } from "lucide-react";
import { MountainSilhouette } from "./MountainSilhouette";
import { useStore } from "../store";
import { BAYERN, HAIRLINE, INK, MEADOW, MEADOW_SOFT, MUTED } from "../theme";
import { formatGreetingDate, formatNumber } from "../lib/format";

export function Hero() {
  const { profile, todaySteps } = useStore();
  const remaining = Math.max(0, profile.goal - todaySteps);
  const subtitle =
    remaining === 0
      ? "You've hit today's goal. Bonus steps build your team's lead."
      : remaining <= 1500
        ? `You're ${formatNumber(remaining)} steps from today's goal. A loop around the Marienplatz should do it.`
        : `${formatNumber(remaining)} steps to today's goal. Try the riverside path along the Isar.`;

  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 hero-glow" aria-hidden="true" />
      <MountainSilhouette />
      <div className="relative max-w-[1200px] mx-auto px-6 sm:px-10 pt-12 sm:pt-16 pb-20 sm:pb-24">
        <div className="flex items-start justify-between gap-8 sm:gap-12 flex-col sm:flex-row">
          <div>
            <p
              className="text-[12px] uppercase tracking-[0.18em] mb-3"
              style={{ color: MUTED }}
            >
              {formatGreetingDate(new Date())}
            </p>
            <h1
              className="text-[36px] sm:text-[44px] leading-[1.05] font-semibold tracking-tight"
              style={{ color: INK }}
            >
              Guten Tag, {profile.name}.
            </h1>
            <p
              className="text-[15px] mt-3 max-w-md"
              style={{ color: MUTED }}
            >
              {subtitle}
            </p>
          </div>
          <div className="flex items-center gap-2 pt-2 flex-wrap">
            <span
              className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full text-[12.5px] font-medium tracking-tight"
              style={{
                background: MEADOW_SOFT,
                color: MEADOW,
              }}
            >
              <CalendarDays className="w-3.5 h-3.5" strokeWidth={1.75} />
              11–14 May · Microsoft München
            </span>
            <div
              className="flex items-center gap-2 h-9 px-3 rounded-full border surface-translucent-soft"
              style={{ borderColor: HAIRLINE }}
            >
              <Cloud
                className="w-4 h-4"
                strokeWidth={1.5}
                style={{ color: BAYERN }}
              />
              <span
                className="text-[12.5px] font-medium tracking-tight"
                style={{ color: INK }}
              >
                München · 18°C
              </span>
              <span className="text-[12.5px]" style={{ color: MUTED }}>
                · light layers ideal
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
