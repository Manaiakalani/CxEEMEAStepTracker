import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Footprints, Users, ArrowRight, X } from "lucide-react";
import { useStore } from "../store";
import { TEAMS } from "../data";
import {
  ALPENGLOW,
  BAYERN,
  BAYERN_SOFT,
  HAIRLINE,
  INK,
  MUTED,
  SURFACE,
  SURFACE_RAISED,
} from "../theme";
import { formatNumber } from "../lib/format";

const QUICK_GOALS = [4000, 6000, 8000, 10000, 12000];

type Step = "name" | "team" | "goal";

/**
 * First-run welcome flow. Three steps:
 *   1. name      — and, if the typed name + team matches a walker already
 *                  in the live leaderboard, offer a "that's me" shortcut
 *                  that pre-fills team and skips ahead.
 *   2. team      — card grid with live step totals per team.
 *   3. goal      — quick picks for daily step goal.
 *
 * Dismissible at any point ("skip"). On completion or skip, calls
 * completeOnboarding() so this modal never reappears for this device.
 */
export function OnboardingModal() {
  const { onboarded, profile, walkers, completeOnboarding } = useStore();
  const [open, setOpen] = useState<boolean>(!onboarded);
  const [step, setStep] = useState<Step>("name");
  const [name, setName] = useState("");
  const [team, setTeam] = useState<string>("");
  const [goal, setGoal] = useState<number>(8000);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // If the persisted state finishes loading and the user is already
  // onboarded (existing v1 save), close the modal silently.
  useEffect(() => {
    if (onboarded) setOpen(false);
  }, [onboarded]);

  // Autofocus the name field on open.
  useEffect(() => {
    if (open && step === "name") {
      const t = window.setTimeout(() => nameInputRef.current?.focus(), 50);
      return () => window.clearTimeout(t);
    }
  }, [open, step]);

  // Lock body scroll while the modal is up so the page behind doesn't
  // scroll on touch devices.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") finish(true);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const matches = useMemo(() => {
    const trimmed = name.trim().toLowerCase();
    if (trimmed.length < 2) return [];
    return walkers
      .filter((w) => (w.name ?? "").trim().toLowerCase() === trimmed)
      .slice(0, 4);
  }, [name, walkers]);

  function finish(skipped: boolean) {
    if (skipped) {
      // User dismissed the modal without explicit Start. Only commit
      // onboarding (and start cloud sync) if the existing profile is
      // already complete from a prior session. Otherwise just close the
      // modal locally; the next mount will reopen it because `onboarded`
      // stays false. This prevents a silent default-team tag.
      if (profile.name.trim() && profile.team.trim()) {
        completeOnboarding({
          name: profile.name,
          team: profile.team,
          goal: profile.goal,
        });
      }
      setOpen(false);
      return;
    }
    completeOnboarding({
      name: name.trim() || profile.name,
      team: team || profile.team,
      goal,
    });
    setOpen(false);
  }

  function pickMatch(matchName: string, matchTeam: string) {
    setName(matchName);
    setTeam(matchTeam);
    setStep("goal");
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
    >
      <div
        className="absolute inset-0"
        style={{ background: "rgba(15, 23, 42, 0.45)" }}
        onClick={() => finish(true)}
        aria-hidden
      />
      <div
        className="relative w-full sm:max-w-[560px] sm:mx-4 rounded-t-2xl sm:rounded-2xl border shadow-xl max-h-[92vh] overflow-y-auto"
        style={{ background: SURFACE_RAISED, borderColor: HAIRLINE }}
      >
        <button
          type="button"
          onClick={() => finish(true)}
          aria-label="Skip welcome"
          className="absolute top-4 right-4 w-8 h-8 rounded-full inline-flex items-center justify-center hover-surface focus:outline-none focus-visible:ring-2"
          style={{
            color: MUTED,
            ["--tw-ring-color" as any]: BAYERN,
          }}
        >
          <X className="w-4 h-4" strokeWidth={1.75} />
        </button>

        <div className="px-6 sm:px-8 pt-8 pb-6">
          <div
            className="inline-flex items-center justify-center w-10 h-10 rounded-full mb-4"
            style={{ background: BAYERN_SOFT, color: BAYERN }}
          >
            <Footprints className="w-5 h-5" strokeWidth={1.5} />
          </div>
          <p
            className="text-[11px] uppercase tracking-[0.18em] mb-2"
            style={{ color: MUTED }}
          >
            Step {stepIndex(step)} of 3 · Welcome
          </p>
          {step === "name" && (
            <>
              <h2
                id="onboarding-title"
                className="text-[26px] sm:text-[30px] leading-[1.1] font-semibold tracking-tight"
                style={{ color: INK }}
              >
                Let's get you on the board.
              </h2>
              <p className="text-[14px] mt-2" style={{ color: MUTED }}>
                What should we call you on the leaderboard?
              </p>
              <input
                ref={nameInputRef}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && name.trim()) {
                    setStep(matches.length ? "name" : "team");
                  }
                }}
                placeholder="Your first name"
                className="w-full mt-5 h-12 bg-transparent border-0 border-b text-[20px] font-medium focus:outline-none focus:border-b-2"
                style={{ borderColor: HAIRLINE, color: INK }}
                autoComplete="given-name"
                spellCheck={false}
              />
              {matches.length > 0 && (
                <div className="mt-6">
                  <p
                    className="text-[11px] uppercase tracking-[0.16em] mb-2"
                    style={{ color: MUTED }}
                  >
                    Already on the board?
                  </p>
                  <ul className="space-y-2">
                    {matches.map((m) => (
                      <li key={m.uid}>
                        <button
                          type="button"
                          onClick={() => pickMatch(m.name, m.team)}
                          className="w-full text-left p-3 rounded-lg border inline-flex items-center justify-between gap-3 hover:border-[color:var(--bayern)] focus:outline-none focus-visible:ring-2"
                          style={{
                            borderColor: HAIRLINE,
                            background: SURFACE,
                            ["--bayern" as any]: BAYERN,
                            ["--tw-ring-color" as any]: BAYERN,
                          }}
                        >
                          <span>
                            <span
                              className="block text-[14px] font-medium"
                              style={{ color: INK }}
                            >
                              {m.name}
                            </span>
                            <span
                              className="block text-[12px] mt-0.5"
                              style={{ color: MUTED }}
                            >
                              {m.team || "no team"} · uses another device
                            </span>
                          </span>
                          <ArrowRight
                            className="w-4 h-4 flex-shrink-0"
                            style={{ color: BAYERN }}
                            strokeWidth={1.75}
                          />
                        </button>
                      </li>
                    ))}
                  </ul>
                  <p
                    className="text-[12px] mt-3"
                    style={{ color: MUTED }}
                  >
                    Pick yourself to merge this device's steps with your
                    existing row. Not you? Just continue below.
                  </p>
                </div>
              )}
              <div className="mt-7 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => finish(true)}
                  className="h-11 px-4 text-[13px] font-medium rounded-full"
                  style={{ color: MUTED }}
                >
                  Skip for now
                </button>
                <button
                  type="button"
                  onClick={() => setStep("team")}
                  disabled={!name.trim()}
                  className="h-11 px-5 rounded-full inline-flex items-center gap-2 text-[13.5px] font-medium tracking-tight text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: BAYERN }}
                >
                  Continue
                  <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
                </button>
              </div>
            </>
          )}

          {step === "team" && (
            <>
              <h2
                id="onboarding-title"
                className="text-[26px] sm:text-[30px] leading-[1.1] font-semibold tracking-tight"
                style={{ color: INK }}
              >
                Pick your CxE team.
              </h2>
              <p className="text-[14px] mt-2" style={{ color: MUTED }}>
                Your steps add to your team's offsite total. You can switch
                later from Profile.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-5">
                {TEAMS.map((t) => {
                  const isMine = t.name === team;
                  return (
                    <li key={t.id}>
                      <button
                        type="button"
                        onClick={() => setTeam(t.name)}
                        className="w-full text-left p-4 rounded-lg border transition-all hover:border-[color:var(--bayern)] focus:outline-none focus-visible:ring-2"
                        style={{
                          borderColor: isMine ? BAYERN : HAIRLINE,
                          background: isMine ? BAYERN_SOFT : SURFACE,
                          ["--bayern" as any]: BAYERN,
                          ["--tw-ring-color" as any]: BAYERN,
                        }}
                        aria-pressed={isMine}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span>
                            <span
                              className="block text-[14.5px] font-medium tracking-tight"
                              style={{ color: INK }}
                            >
                              {t.name}
                            </span>
                            <span
                              className="block text-[11.5px] mt-0.5 inline-flex items-center gap-1"
                              style={{ color: MUTED }}
                            >
                              <Users className="w-3 h-3" strokeWidth={1.75} />
                              {t.members} walkers
                            </span>
                          </span>
                          {isMine && (
                            <span
                              className="w-5 h-5 rounded-full inline-flex items-center justify-center"
                              style={{ background: BAYERN, color: "#fff" }}
                              aria-hidden
                            >
                              <Check className="w-3 h-3" strokeWidth={2.25} />
                            </span>
                          )}
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-6 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep("name")}
                  className="h-11 px-4 text-[13px] font-medium rounded-full"
                  style={{ color: MUTED }}
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep("goal")}
                  disabled={!team}
                  className="h-11 px-5 rounded-full inline-flex items-center gap-2 text-[13.5px] font-medium tracking-tight text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: BAYERN }}
                >
                  Continue
                  <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
                </button>
              </div>
            </>
          )}

          {step === "goal" && (
            <>
              <h2
                id="onboarding-title"
                className="text-[26px] sm:text-[30px] leading-[1.1] font-semibold tracking-tight"
                style={{ color: INK }}
              >
                Pick a daily goal.
              </h2>
              <p className="text-[14px] mt-2" style={{ color: MUTED }}>
                Something realistic for an offsite week. You can change it
                anytime.
              </p>
              <ul className="grid grid-cols-5 gap-2 mt-5">
                {QUICK_GOALS.map((g) => {
                  const isMine = g === goal;
                  return (
                    <li key={g}>
                      <button
                        type="button"
                        onClick={() => setGoal(g)}
                        className="w-full h-16 rounded-lg border flex flex-col items-center justify-center transition-all hover:border-[color:var(--bayern)] focus:outline-none focus-visible:ring-2"
                        style={{
                          borderColor: isMine ? BAYERN : HAIRLINE,
                          background: isMine ? BAYERN_SOFT : SURFACE,
                          ["--bayern" as any]: BAYERN,
                          ["--tw-ring-color" as any]: BAYERN,
                        }}
                        aria-pressed={isMine}
                      >
                        <span
                          className="text-[15px] font-semibold tabular-nums tracking-tight"
                          style={{ color: INK }}
                        >
                          {formatNumber(g)}
                        </span>
                        <span
                          className="text-[10.5px] uppercase tracking-[0.12em] mt-0.5"
                          style={{ color: MUTED }}
                        >
                          steps
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div
                className="mt-6 p-4 rounded-lg border"
                style={{ borderColor: HAIRLINE, background: SURFACE }}
              >
                <p
                  className="text-[11.5px] uppercase tracking-[0.16em] mb-1"
                  style={{ color: MUTED }}
                >
                  You'll join as
                </p>
                <p
                  className="text-[15px] font-medium"
                  style={{ color: INK }}
                >
                  {name.trim()}{" "}
                  <span
                    className="text-[13px] font-normal"
                    style={{ color: MUTED }}
                  >
                    · {team}
                  </span>
                </p>
                <p
                  className="text-[12.5px] mt-2 inline-flex items-center gap-1.5"
                  style={{ color: ALPENGLOW }}
                >
                  <Footprints className="w-3.5 h-3.5" strokeWidth={1.75} />
                  {formatNumber(goal)} steps a day
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep("team")}
                  className="h-11 px-4 text-[13px] font-medium rounded-full"
                  style={{ color: MUTED }}
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => finish(false)}
                  className="h-11 px-5 rounded-full inline-flex items-center gap-2 text-[13.5px] font-medium tracking-tight text-white transition-all"
                  style={{ background: BAYERN }}
                >
                  Start walking
                  <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function stepIndex(s: Step): number {
  return s === "name" ? 1 : s === "team" ? 2 : 3;
}
