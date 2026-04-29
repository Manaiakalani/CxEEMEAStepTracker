import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { createElement } from "react";
import { isoDate, lastNDays } from "./lib/format";
import { SEED_PRIOR_DAYS, TEAMS } from "./data";

export type TabKey = "dashboard" | "leaderboard" | "teams" | "profile";
export type ThemeMode = "light" | "dark";

export type ActivityEntry = {
  id: string;
  ts: number;
  date: string; // YYYY-MM-DD
  amount: number;
  source: "manual" | "quick";
};

export type Profile = {
  name: string;
  team: string;
  goal: number;
};

type Persisted = {
  version: 1;
  profile: Profile;
  /** Step totals keyed by ISO date. */
  entries: Record<string, number>;
  activity: ActivityEntry[];
};

const STORAGE_KEY = "alpine-step-tracker:v1";
const THEME_STORAGE_KEY = "alpine-step-tracker:theme";
const DEFAULT_PROFILE: Profile = {
  name: "Anja",
  team: "Threat Protection",
  goal: 8000,
};

function buildInitial(): Persisted {
  const entries: Record<string, number> = {};
  // Seed previous 6 days (Mon–Sat if today is Sun).
  const days = lastNDays(7);
  // days has 7 entries — last is today, first is 6 days ago.
  for (let i = 0; i < days.length - 1; i++) {
    const seed = SEED_PRIOR_DAYS[i];
    if (typeof seed === "number") {
      entries[isoDate(days[i])] = seed;
    }
  }
  // Today starts at 0.
  entries[isoDate(days[days.length - 1])] = 0;
  return {
    version: 1,
    profile: { ...DEFAULT_PROFILE },
    entries,
    activity: [],
  };
}

function isValidProfile(p: unknown): p is Profile {
  if (!p || typeof p !== "object") return false;
  const o = p as Record<string, unknown>;
  return (
    typeof o.name === "string" &&
    typeof o.team === "string" &&
    typeof o.goal === "number" &&
    Number.isFinite(o.goal) &&
    o.goal > 0
  );
}

function isValidEntries(e: unknown): e is Record<string, number> {
  if (!e || typeof e !== "object" || Array.isArray(e)) return false;
  for (const v of Object.values(e as Record<string, unknown>)) {
    if (typeof v !== "number" || !Number.isFinite(v) || v < 0) return false;
  }
  return true;
}

function isValidActivity(a: unknown): a is ActivityEntry[] {
  if (!Array.isArray(a)) return false;
  return a.every((row) => {
    if (!row || typeof row !== "object") return false;
    const r = row as Record<string, unknown>;
    return (
      typeof r.id === "string" &&
      typeof r.ts === "number" &&
      typeof r.date === "string" &&
      typeof r.amount === "number" &&
      (r.source === "manual" || r.source === "quick")
    );
  });
}

function loadInitial(): Persisted {
  if (typeof window === "undefined") return buildInitial();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const fresh = buildInitial();
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
      return fresh;
    }
    const parsed = JSON.parse(raw);
    if (
      !parsed ||
      typeof parsed !== "object" ||
      parsed.version !== 1 ||
      !isValidProfile(parsed.profile) ||
      !isValidEntries(parsed.entries) ||
      !isValidActivity(parsed.activity)
    ) {
      return buildInitial();
    }
    const safe: Persisted = {
      version: 1,
      profile: parsed.profile,
      entries: { ...parsed.entries },
      activity: parsed.activity,
    };
    // Make sure today's key exists (rolls naturally each new day).
    const today = isoDate(new Date());
    if (safe.entries[today] === undefined) {
      safe.entries[today] = 0;
    }
    return safe;
  } catch {
    return buildInitial();
  }
}

function loadInitialTheme(): ThemeMode {
  if (typeof window === "undefined") return "light";
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* ignore */
  }
  if (
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "light";
}

type StoreValue = {
  profile: Profile;
  entries: Record<string, number>;
  activity: ActivityEntry[];
  tab: TabKey;
  todayKey: string;
  todaySteps: number;
  theme: ThemeMode;
  setTab: (t: TabKey) => void;
  addSteps: (amount: number, source?: "manual" | "quick") => void;
  setProfile: (p: Partial<Profile>) => void;
  toggleTheme: () => void;
  setTheme: (t: ThemeMode) => void;
  resetWeek: () => void;
  resetAll: () => void;
};

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>(() => loadInitial());
  const [tab, setTab] = useState<TabKey>("dashboard");
  const [theme, setThemeState] = useState<ThemeMode>(() => loadInitialTheme());

  // Apply theme to <html data-theme=...> and persist.
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const setTheme = useCallback((t: ThemeMode) => setThemeState(t), []);
  const toggleTheme = useCallback(
    () => setThemeState((cur) => (cur === "dark" ? "light" : "dark")),
    [],
  );

  // Track "now" so today rolls over at midnight without a refresh. We
  // re-tick every minute, plus when the tab regains visibility.
  const [now, setNow] = useState<number>(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 60_000);
    const onVis = () => {
      if (!document.hidden) setNow(Date.now());
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);
  const todayKey = useMemo(() => isoDate(new Date(now)), [now]);

  // Persist on every state change.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* quota / private mode — ignore */
    }
  }, [state]);

  const addSteps = useCallback(
    (amount: number, source: "manual" | "quick" = "manual") => {
      if (!Number.isFinite(amount) || amount <= 0) return;
      const safe = Math.min(50000, Math.floor(amount));
      const id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      // Resolve "today" at call time so a mid-session midnight rollover
      // attributes new entries to the correct date.
      const ts = Date.now();
      const dateKey = isoDate(new Date(ts));
      setState((prev) => {
        const current = prev.entries[dateKey] ?? 0;
        const nextEntries = { ...prev.entries, [dateKey]: current + safe };
        const nextActivity: ActivityEntry[] = [
          {
            id,
            ts,
            date: dateKey,
            amount: safe,
            source,
          },
          ...prev.activity,
        ].slice(0, 20);
        return { ...prev, entries: nextEntries, activity: nextActivity };
      });
    },
    [],
  );

  const setProfile = useCallback((patch: Partial<Profile>) => {
    setState((prev) => ({ ...prev, profile: { ...prev.profile, ...patch } }));
  }, []);

  const resetWeek = useCallback(() => {
    setState((prev) => {
      const days = lastNDays(7);
      const nextEntries: Record<string, number> = { ...prev.entries };
      for (const d of days) {
        nextEntries[isoDate(d)] = 0;
      }
      return { ...prev, entries: nextEntries, activity: [] };
    });
  }, []);

  const resetAll = useCallback(() => {
    const fresh = buildInitial();
    setState(fresh);
  }, []);

  const todaySteps = state.entries[todayKey] ?? 0;

  const value = useMemo<StoreValue>(
    () => ({
      profile: state.profile,
      entries: state.entries,
      activity: state.activity,
      tab,
      todayKey,
      todaySteps,
      theme,
      setTab,
      addSteps,
      setProfile,
      toggleTheme,
      setTheme,
      resetWeek,
      resetAll,
    }),
    [
      state,
      tab,
      todayKey,
      todaySteps,
      theme,
      addSteps,
      setProfile,
      toggleTheme,
      setTheme,
      resetWeek,
      resetAll,
    ],
  );

  return createElement(StoreContext.Provider, { value }, children);
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export function weekTotalFor(entries: Record<string, number>): number {
  const days = lastNDays(7);
  return days.reduce((sum, d) => sum + (entries[isoDate(d)] ?? 0), 0);
}

export function leaderboardWith(
  entries: Record<string, number>,
  myTeamName: string,
) {
  const myWeek = weekTotalFor(entries);
  return TEAMS.map((t) => ({
    ...t,
    mine: t.name === myTeamName,
    steps: t.name === myTeamName ? t.baseSteps + myWeek : t.baseSteps,
  })).sort((a, b) => b.steps - a.steps);
}
