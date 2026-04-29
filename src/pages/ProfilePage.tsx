import { useState } from "react";
import { useStore, weekTotalFor } from "../store";
import { TEAMS } from "../data";
import { BAYERN, HAIRLINE, INK, MUTED } from "../theme";
import { formatNumber } from "../lib/format";

export function ProfilePage() {
  const { profile, entries, setProfile, resetWeek, resetAll } = useStore();
  const [name, setName] = useState(profile.name);
  const [goal, setGoal] = useState(String(profile.goal));
  const [team, setTeam] = useState(profile.team);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [confirmReset, setConfirmReset] = useState<"none" | "week" | "all">(
    "none",
  );

  function save() {
    const goalNum = Math.max(1000, Number(goal.replace(/[^\d]/g, "")) || 8000);
    setProfile({ name: name.trim() || "Anja", goal: goalNum, team });
    setGoal(String(goalNum));
    setSavedAt(Date.now());
    window.setTimeout(() => setSavedAt(null), 2000);
  }

  const weekTotal = weekTotalFor(entries);

  return (
    <>
      <header className="border-b" style={{ borderColor: HAIRLINE }}>
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 pt-12 pb-10">
          <p
            className="text-[12px] uppercase tracking-[0.18em] mb-3"
            style={{ color: MUTED }}
          >
            Profile
          </p>
          <h1
            className="text-[36px] sm:text-[44px] leading-[1.05] font-semibold tracking-tight"
            style={{ color: INK }}
          >
            Your settings.
          </h1>
        </div>
      </header>

      <section className="border-b" style={{ borderColor: HAIRLINE }}>
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-12 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-4">
            <p
              className="text-[12px] uppercase tracking-[0.18em] mb-3"
              style={{ color: MUTED }}
            >
              Account
            </p>
            <h2
              className="text-[22px] font-medium tracking-tight"
              style={{ color: INK }}
            >
              Identify yourself.
            </h2>
            <p className="text-[13.5px] mt-1" style={{ color: MUTED }}>
              Used in greetings and leaderboards.
            </p>
          </div>
          <div className="col-span-12 md:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Field label="First name">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-11 bg-transparent border-0 border-b text-[18px] font-medium tabular-nums focus:outline-none focus:border-b-2"
                  style={{ borderColor: HAIRLINE, color: INK }}
                />
              </Field>
              <Field label="Daily goal (steps)">
                <input
                  type="text"
                  inputMode="numeric"
                  value={goal}
                  onChange={(e) =>
                    setGoal(e.target.value.replace(/[^\d]/g, ""))
                  }
                  className="w-full h-11 bg-transparent border-0 border-b text-[18px] font-medium tabular-nums focus:outline-none focus:border-b-2"
                  style={{ borderColor: HAIRLINE, color: INK }}
                />
              </Field>
              <Field label="Team" className="sm:col-span-2">
                <select
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                  className="w-full h-11 bg-transparent border-0 border-b text-[16px] font-medium focus:outline-none focus:border-b-2"
                  style={{ borderColor: HAIRLINE, color: INK }}
                >
                  {TEAMS.map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <div className="mt-8 flex items-center gap-4 flex-wrap">
              <button
                onClick={save}
                className="h-12 px-6 rounded-full inline-flex items-center gap-2 text-[14px] font-medium tracking-tight text-white hover:brightness-105 transition-all"
                style={{ background: BAYERN }}
              >
                Save changes
              </button>
              <span
                className="text-[12.5px] transition-opacity"
                style={{
                  color: MUTED,
                  opacity: savedAt ? 1 : 0,
                }}
                aria-live="polite"
              >
                Saved.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b" style={{ borderColor: HAIRLINE }}>
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-12 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-4">
            <p
              className="text-[12px] uppercase tracking-[0.18em] mb-3"
              style={{ color: MUTED }}
            >
              Your week
            </p>
            <h2
              className="text-[22px] font-medium tracking-tight"
              style={{ color: INK }}
            >
              At a glance.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-6">
            <Stat label="This week" value={formatNumber(weekTotal)} />
            <Stat label="Daily goal" value={formatNumber(profile.goal)} />
            <Stat label="Team" value={profile.team} />
          </div>
        </div>
      </section>

      <section className="border-b" style={{ borderColor: HAIRLINE }}>
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-12 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-4">
            <p
              className="text-[12px] uppercase tracking-[0.18em] mb-3"
              style={{ color: MUTED }}
            >
              Data
            </p>
            <h2
              className="text-[22px] font-medium tracking-tight"
              style={{ color: INK }}
            >
              Reset your tracker.
            </h2>
            <p className="text-[13.5px] mt-1" style={{ color: MUTED }}>
              Step data is kept on this device only.
            </p>
          </div>
          <div className="col-span-12 md:col-span-8 flex flex-col gap-3 items-start">
            {confirmReset === "week" ? (
              <ConfirmRow
                message="Clear all step entries for the past 7 days?"
                onConfirm={() => {
                  resetWeek();
                  setConfirmReset("none");
                }}
                onCancel={() => setConfirmReset("none")}
              />
            ) : (
              <button
                onClick={() => setConfirmReset("week")}
                className="h-11 px-4 rounded-full border text-[13px] font-medium tracking-tight hover-surface"
                style={{ borderColor: HAIRLINE, color: INK }}
              >
                Reset this week
              </button>
            )}
            {confirmReset === "all" ? (
              <ConfirmRow
                message="Reset everything to defaults? This re-seeds the prior week."
                onConfirm={() => {
                  resetAll();
                  setName("Anja");
                  setGoal("8000");
                  setTeam("Threat Protection");
                  setConfirmReset("none");
                }}
                onCancel={() => setConfirmReset("none")}
              />
            ) : (
              <button
                onClick={() => setConfirmReset("all")}
                className="h-11 px-4 rounded-full border text-[13px] font-medium tracking-tight hover-surface"
                style={{ borderColor: HAIRLINE, color: INK }}
              >
                Reset all data
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span
        className="text-[11px] uppercase tracking-[0.16em] block mb-2"
        style={{ color: MUTED }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p
        className="text-[11px] uppercase tracking-[0.16em] mb-2"
        style={{ color: MUTED }}
      >
        {label}
      </p>
      <p
        className="text-[20px] font-medium tracking-tight tabular-nums"
        style={{ color: INK }}
      >
        {value}
      </p>
    </div>
  );
}

function ConfirmRow({
  message,
  onConfirm,
  onCancel,
}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-[13px]" style={{ color: INK }}>
        {message}
      </span>
      <button
        onClick={onConfirm}
        className="h-11 px-4 rounded-full text-white text-[13px] font-medium"
        style={{ background: "#B23A3A" }}
      >
        Yes, reset
      </button>
      <button
        onClick={onCancel}
        className="h-11 px-4 rounded-full border text-[13px] font-medium hover-surface"
        style={{ borderColor: HAIRLINE, color: INK }}
      >
        Cancel
      </button>
    </div>
  );
}
