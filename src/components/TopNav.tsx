import {
  LayoutDashboard,
  Trophy,
  User as UserIcon,
  Info,
  Sun,
  Moon,
} from "lucide-react";
import { useStore, type TabKey } from "../store";
import {
  ALPENGLOW,
  BAYERN,
  GOLD,
  HAIRLINE,
  INK,
  MEADOW,
  MUTED,
} from "../theme";

const ITEMS: {
  key: TabKey;
  label: string;
  icon: typeof LayoutDashboard;
  color: string;
}[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard, color: BAYERN },
  { key: "leaderboard", label: "Leaderboard", icon: Trophy, color: GOLD },
  { key: "profile", label: "Profile", icon: UserIcon, color: MEADOW },
  { key: "about", label: "About", icon: Info, color: ALPENGLOW },
];

export function TopNav() {
  const { tab, setTab, theme, toggleTheme } = useStore();
  return (
    <nav
      className="border-b surface-translucent backdrop-blur-sm sticky top-0 z-20"
      style={{ borderColor: HAIRLINE }}
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 flex items-center justify-between h-14">
        <button
          onClick={() => setTab("dashboard")}
          className="brand-ridge-trigger group flex items-center gap-2 h-11 -ml-1 pl-1 pr-2 rounded-md focus:outline-none focus-visible:ring-2"
          style={{ color: INK, ["--tw-ring-color" as any]: BAYERN }}
          aria-label="Step Tracker home"
        >
          <span
            className="w-7 h-7 rounded-md flex items-center justify-center overflow-hidden shadow-sm transition-transform duration-200 ease-out motion-safe:group-hover:-translate-y-px motion-safe:group-active:translate-y-0"
            style={{
              background:
                "linear-gradient(160deg, #1F75B8 0%, #114F84 100%)",
              boxShadow:
                "0 1px 0 rgba(255,255,255,0.18) inset, 0 1px 2px rgba(17,79,132,0.35)",
            }}
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 28 28"
              width="28"
              height="28"
              fill="none"
              stroke="none"
            >
              <defs>
                <linearGradient id="nav-snow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#E8F0F8" />
                </linearGradient>
              </defs>
              {/*
                Two identical 28-wide ridge copies tiled side by side. CSS
                keyframe `brand-ridge-pan` translates the inner <g> from 0
                to -28px on hover/focus, so when copy 2 lands where copy 1
                was the loop is seam-free. Animation play-state is paused
                until the brand-ridge-trigger element is hovered.
              */}
              <g className="brand-ridge">
                {[0, 28].map((dx) => (
                  <g key={dx} transform={`translate(${dx} 0)`}>
                    {/* Alpine ridge — three peaks, asymmetric */}
                    <path
                      d="M0,22 L5,16 L9,12 L13,17 L18,8 L22,15 L25,18 L28,22 Z"
                      fill="url(#nav-snow)"
                    />
                    {/* Snowy shoulder shadow on the small peak */}
                    <path
                      d="M9,12 L8,14 L9,14.5 L10,14 Z"
                      fill="#114F84"
                      opacity="0.22"
                    />
                    {/* Alpenglow tint on the tallest peak's right face */}
                    <path
                      d="M18,8 L22,15 L25,18 L28,22 L18,11 Z"
                      fill="#F4A45C"
                      opacity="0.32"
                    />
                    {/* Snow cap highlight on the tallest peak */}
                    <path
                      d="M18,8 L17,10 L18,10.5 L19,10 Z"
                      fill="#114F84"
                      opacity="0.22"
                    />
                  </g>
                ))}
              </g>
            </svg>
          </span>
          <span className="text-[13px] font-medium tracking-tight hidden sm:inline">
            CxE EMEA Offsite 2026 · Step Tracker
          </span>
          <span className="text-[13px] font-medium tracking-tight sm:hidden">
            Step Tracker
          </span>
        </button>
        <ul className="flex items-center gap-0">
          {ITEMS.map((it) => {
            const Icon = it.icon;
            const active = tab === it.key;
            return (
              <li key={it.key}>
                <button
                  onClick={() => setTab(it.key)}
                  className="relative h-14 min-w-11 px-3 sm:px-4 inline-flex items-center justify-center gap-2 text-[13px] font-medium tracking-tight transition-colors focus:outline-none focus-surface"
                  style={{ color: active ? INK : MUTED }}
                  aria-label={it.label}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon
                    className="w-4 h-4"
                    strokeWidth={1.75}
                    style={{ color: it.color }}
                  />
                  <span className="hidden sm:inline">{it.label}</span>
                  {active && (
                    <span
                      className="absolute left-3 right-3 bottom-0 h-[2px]"
                      style={{ background: it.color }}
                    />
                  )}
                </button>
              </li>
            );
          })}
          <li className="ml-1 sm:ml-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
              }
              title={
                theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
              }
              className="h-9 w-9 rounded-full border inline-flex items-center justify-center hover-surface focus:outline-none focus-visible:ring-2"
              style={{
                borderColor: HAIRLINE,
                color: MUTED,
                ["--tw-ring-color" as any]: BAYERN,
              }}
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" strokeWidth={1.75} />
              ) : (
                <Moon className="w-4 h-4" strokeWidth={1.75} />
              )}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
