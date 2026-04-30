import { useStore } from "../store";
import { ALPENGLOW, BAYERN, HAIRLINE, MEADOW, MUTED } from "../theme";

export function Footer() {
  const { setTab } = useStore();
  return (
    <footer className="border-t" style={{ borderColor: HAIRLINE }}>
      <div
        className="max-w-[1200px] mx-auto px-6 sm:px-10 py-10 flex items-center justify-between gap-4 flex-wrap"
        style={{ color: MUTED }}
      >
        <p className="text-[12px] tracking-tight inline-flex items-center gap-2 flex-wrap">
          <span>CxE EMEA Offsite 2026</span>
          <span
            aria-hidden="true"
            className="inline-block w-1 h-1 rounded-full"
            style={{ background: MEADOW }}
          />
          <span>11–14 May</span>
          <span
            aria-hidden="true"
            className="inline-block w-1 h-1 rounded-full"
            style={{ background: ALPENGLOW }}
          />
          <span>Microsoft München</span>
        </p>
        <div className="flex items-center gap-5 text-[12px] tracking-tight">
          <button
            onClick={() => setTab("about")}
            className="hover:underline transition-colors"
            style={{ color: BAYERN }}
          >
            About &amp; FAQ
          </button>
        </div>
      </div>
    </footer>
  );
}
