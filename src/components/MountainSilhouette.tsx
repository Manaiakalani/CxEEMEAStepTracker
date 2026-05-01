import { useEffect, useRef } from "react";
import { BAYERN } from "../theme";

const REDUCED = "(prefers-reduced-motion: reduce)";
const FINE = "(hover: hover) and (pointer: fine)";

/**
 * Two ridge layers driven by a parallax signal stored in CSS custom
 * properties (`--mx`, `--my` ranging roughly [-1, 1]) on a parent element.
 *
 * On a fine-pointer device the parent listens to `pointermove` and writes
 * the cursor's position relative to the hero. On touch devices (no hover),
 * a slow sine-wave ambient drift is written instead so the silhouette
 * still feels alive without permission prompts or heavy battery cost.
 *
 * `prefers-reduced-motion: reduce` skips both paths — the variables are
 * never written and `var(--mx, 0)` falls back to a static silhouette.
 */
export function MountainSilhouette() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia(REDUCED).matches) return;

    const root = wrapperRef.current?.closest<HTMLElement>("[data-parallax-root]");
    if (!root) return;

    const setVars = (x: number, y: number) => {
      root.style.setProperty("--mx", x.toFixed(3));
      root.style.setProperty("--my", y.toFixed(3));
    };

    const fine = window.matchMedia(FINE).matches;

    if (fine) {
      let raf = 0;
      let target = { x: 0, y: 0 };
      let current = { x: 0, y: 0 };

      const tick = () => {
        // Ease towards target so the mountains glide instead of snapping.
        current.x += (target.x - current.x) * 0.12;
        current.y += (target.y - current.y) * 0.12;
        setVars(current.x, current.y);
        if (
          Math.abs(target.x - current.x) > 0.001 ||
          Math.abs(target.y - current.y) > 0.001
        ) {
          raf = requestAnimationFrame(tick);
        } else {
          raf = 0;
        }
      };
      const schedule = () => {
        if (!raf) raf = requestAnimationFrame(tick);
      };

      const onMove = (e: PointerEvent) => {
        const r = root.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 2 - 1;
        const y = ((e.clientY - r.top) / r.height) * 2 - 1;
        target = {
          x: Math.max(-1, Math.min(1, x)),
          y: Math.max(-1, Math.min(1, y)),
        };
        schedule();
      };
      const onLeave = () => {
        target = { x: 0, y: 0 };
        schedule();
      };

      root.addEventListener("pointermove", onMove);
      root.addEventListener("pointerleave", onLeave);
      return () => {
        if (raf) cancelAnimationFrame(raf);
        root.removeEventListener("pointermove", onMove);
        root.removeEventListener("pointerleave", onLeave);
        root.style.removeProperty("--mx");
        root.style.removeProperty("--my");
      };
    }

    // Touch / no-hover devices: gentle ambient drift, ~14s loop. Pauses
    // when the tab is hidden so backgrounded tabs don't burn battery.
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = (now - start) / 1000;
      const x = Math.sin(t * 0.45) * 0.6;
      const y = Math.cos(t * 0.32) * 0.35;
      setVars(x, y);
      raf = requestAnimationFrame(tick);
    };
    const onVisibility = () => {
      if (document.hidden) {
        if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      } else if (!raf) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
      root.style.removeProperty("--mx");
      root.style.removeProperty("--my");
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="absolute inset-x-0 bottom-0 w-full h-[180px] pointer-events-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 180"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <g
          style={{
            transform:
              "translate3d(calc(var(--mx, 0) * 18px), calc(var(--my, 0) * 6px), 0)",
            willChange: "transform",
          }}
        >
          <path
            d="M0,180 L0,140 L90,90 L160,120 L240,60 L330,110 L420,70 L520,130 L600,80 L690,120 L780,50 L880,110 L970,85 L1080,130 L1200,95 L1200,180 Z"
            fill={BAYERN}
            opacity="0.06"
          />
        </g>
        <g
          style={{
            transform:
              "translate3d(calc(var(--mx, 0) * -10px), calc(var(--my, 0) * -3px), 0)",
            willChange: "transform",
          }}
        >
          <path
            d="M0,180 L0,160 L80,130 L170,150 L260,115 L360,145 L450,125 L560,155 L640,130 L740,150 L830,120 L930,150 L1020,135 L1120,160 L1200,140 L1200,180 Z"
            fill={BAYERN}
            opacity="0.09"
          />
        </g>
      </svg>
    </div>
  );
}
