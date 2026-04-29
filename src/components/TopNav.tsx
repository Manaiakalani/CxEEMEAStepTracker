import {
  LayoutDashboard,
  Trophy,
  Users,
  User as UserIcon,
  Sun,
  Moon,
} from "lucide-react";
import { useStore, type TabKey } from "../store";
import { BAYERN, HAIRLINE, INK, MUTED } from "../theme";

const ITEMS: { key: TabKey; label: string; icon: typeof LayoutDashboard }[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "leaderboard", label: "Leaderboard", icon: Trophy },
  { key: "teams", label: "Teams", icon: Users },
  { key: "profile", label: "Profile", icon: UserIcon },
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
          className="flex items-center gap-2 h-11 -ml-1 pl-1 pr-2 rounded-md focus:outline-none focus-visible:ring-2"
          style={{ color: INK, ["--tw-ring-color" as any]: BAYERN }}
          aria-label="Step Tracker home"
        >
          <span
            className="w-6 h-6 rounded-sm flex items-center justify-center"
            style={{ background: BAYERN }}
          >
            <span className="text-white text-[11px] font-semibold tracking-tight">
              S
            </span>
          </span>
          <span className="text-[13px] font-medium tracking-tight hidden sm:inline">
            CxE EMEA Offsite 2026 — Step Tracker
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
                  className="relative h-14 px-3 sm:px-4 inline-flex items-center gap-2 text-[13px] font-medium tracking-tight transition-colors focus:outline-none focus-surface"
                  style={{ color: active ? INK : MUTED }}
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
