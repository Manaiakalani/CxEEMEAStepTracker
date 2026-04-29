import { Plus, Check } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useStore } from "../store";
import { QUICK_ADDS } from "../data";
import { BAYERN, HAIRLINE, INK, MUTED, SUCCESS } from "../theme";

export function QuickEntry() {
  const { addSteps } = useStore();
  const [raw, setRaw] = useState<string>("2400");
  const [confirmAt, setConfirmAt] = useState<number | null>(null);

  function showConfirm() {
    const at = Date.now();
    setConfirmAt(at);
    window.setTimeout(() => {
      setConfirmAt((cur) => (cur === at ? null : cur));
    }, 1800);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const n = Number(raw.replace(/[^\d]/g, ""));
    if (!Number.isFinite(n) || n <= 0) return;
    addSteps(n, "manual");
    setRaw("");
    showConfirm();
  }

  function quickAdd(n: number) {
    addSteps(n, "quick");
    showConfirm();
  }

  return (
    <section className="border-b" style={{ borderColor: HAIRLINE }}>
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-12">
        <form
          onSubmit={onSubmit}
          className="grid grid-cols-12 gap-6 sm:gap-12 items-end"
        >
          <div className="col-span-12 md:col-span-4">
            <p
              className="text-[12px] uppercase tracking-[0.18em] mb-3"
              style={{ color: MUTED }}
            >
              Log Activity
            </p>
            <h2
              className="text-[22px] font-medium tracking-tight"
              style={{ color: INK }}
            >
              Add steps
            </h2>
            <p className="text-[13.5px] mt-1" style={{ color: MUTED }}>
              Sync from your watch or enter manually.
            </p>
          </div>
          <div className="col-span-12 md:col-span-8">
            <div className="flex items-end gap-3 flex-wrap">
              <div className="flex-1 min-w-[140px]">
                <label
                  htmlFor="steps-input"
                  className="text-[11px] uppercase tracking-[0.16em] block mb-2"
                  style={{ color: MUTED }}
                >
                  Steps to add
                </label>
                <input
                  id="steps-input"
                  type="text"
                  value={raw}
                  onChange={(e) => {
                    const cleaned = e.target.value.replace(/[^\d,]/g, "");
                    setRaw(cleaned);
                  }}
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="0"
                  className="w-full h-12 bg-transparent border-0 border-b text-[28px] font-medium tracking-tight tabular-nums focus:outline-none focus:border-b-2"
                  style={{ borderColor: HAIRLINE, color: INK }}
                />
              </div>
              <div className="flex gap-2 pb-1 flex-wrap">
                {QUICK_ADDS.map((v) => (
                  <button
                    type="button"
                    key={v}
                    onClick={() => quickAdd(v)}
                    className="h-11 px-4 rounded-full border text-[12.5px] font-medium tracking-tight hover:bg-stone-50 transition-colors"
                    style={{ borderColor: HAIRLINE, color: MUTED }}
                  >
                    +{v.toLocaleString()}
                  </button>
                ))}
              </div>
              <button
                type="submit"
                className="h-12 px-6 rounded-full inline-flex items-center gap-2 text-[14px] font-medium tracking-tight text-white hover:brightness-105 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  background: BAYERN,
                  ["--tw-ring-color" as any]: BAYERN,
                }}
              >
                <Plus className="w-4 h-4" strokeWidth={2} />
                Add Steps
              </button>
            </div>
            <div
              className="h-5 mt-3 text-[12px] inline-flex items-center gap-1.5 transition-opacity"
              style={{
                color: SUCCESS,
                opacity: confirmAt ? 1 : 0,
              }}
              aria-live="polite"
            >
              <Check className="w-3.5 h-3.5" strokeWidth={2.25} />
              Logged.
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
