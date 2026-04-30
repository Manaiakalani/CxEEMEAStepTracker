import {
  LayoutDashboard,
  Trophy,
  User as UserIcon,
  Info,
  Sun,
  Moon,
} from "lucide-react";
import { useStore, type TabKey } from "../store";
import { BAYERN, HAIRLINE, INK, MUTED } from "../theme";

const ITEMS: { key: TabKey; label: string; icon: typeof LayoutDashboard }[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "leaderboard", label: "Leaderboard", icon: Trophy },
  { key: "profile", label: "Profile", icon: UserIcon },
  { key: "about", label: "About", icon: Info },
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
          className="group flex items-center gap-2 h-11 -ml-1 pl-1 pr-2 rounded-md focus:outline-none focus-visible:ring-2"
          style={{ color: INK, ["--tw-ring-color" as any]: BAYERN }}
          aria-label="Step Tracker home"
        >
          <span
            className="w-7 h-7 rounded-md flex items-center justify-center shadow-sm transition-transform duration-200 ease-out motion-safe:group-hover:-translate-y-px motion-safe:group-active:translate-y-0"
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
              width="20"
              height="20"
              fill="none"
              stroke="none"
            >
              <defs>
                <linearGradient id="nav-snow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#E8F0F8" />
                </linearGradient>
              </defs>
              {/* Alpine ridge — three peaks, asymmetric, echoing the favicon */}
              <path
                d="M2 22 L9 14 L13 18 L18 9 L26 22 Z"
                fill="url(#nav-snow)"
              />
              {/* Snowy shoulder shadow on the smaller peak */}
              <path
                d="M9 14 L7.4 16 L9 16.5 L10.6 16 Z"
                fill="#114F84"
                opacity="0.22"
              />
              {/* Alpenglow tint on the tallest peak's right face */}
              <path
                d="M18 9 L22 15.6 L26 22 L18 12 Z"
                fill="#F4A45C"
                opacity="0.32"
              />
              {/* Tiny snow cap highlight */}
              <path
                d="M18 9 L16.6 11 L18 11.5 L19.4 11 Z"
                fill="#114F84"
                opacity="0.22"
              />
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
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                  <span className="hidden sm:inline">{it.label}</span>
                  {active && (
                    <span
                      className="absolute left-3 right-3 bottom-0 h-[2px]"
                      style={{ background: BAYERN }}
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
