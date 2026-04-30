import { useStore } from "../store";
import { BAYERN, HAIRLINE, MUTED } from "../theme";

export function Footer() {
  const { setTab } = useStore();
  return (
    <footer className="border-t" style={{ borderColor: HAIRLINE }}>
      <div
        className="max-w-[1200px] mx-auto px-6 sm:px-10 py-10 flex items-center justify-between gap-4 flex-wrap"
        style={{ color: MUTED }}
      >
        <p className="text-[12px] tracking-tight">
          CxE EMEA Offsite 2026 · Step Tracker · München
        </p>
        <div className="flex items-center gap-5 text-[12px] tracking-tight">
          <button
            onClick={() => setTab("about")}
            className="hover:underline"
            style={{ color: BAYERN }}
          >
            About &amp; FAQ
          </button>
          <span>Always-on cloud sync · works offline.</span>
        </div>
      </div>
    </footer>
  );
}
