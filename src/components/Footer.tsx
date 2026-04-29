import { HAIRLINE, MUTED } from "../theme";

export function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: HAIRLINE }}>
      <div
        className="max-w-[1200px] mx-auto px-6 sm:px-10 py-10 flex items-center justify-between gap-4 flex-wrap"
        style={{ color: MUTED }}
      >
        <p className="text-[12px] tracking-tight">
          CxE EMEA Offsite 2026 · Step Tracker · München
        </p>
        <p className="text-[12px] tracking-tight">
          Data stored locally in your browser.
        </p>
      </div>
    </footer>
  );
}
