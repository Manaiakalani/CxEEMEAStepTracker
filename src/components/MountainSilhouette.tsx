import { useEffect, useState } from "react";
import { BAYERN } from "../theme";

const REDUCED = "(prefers-reduced-motion: reduce)";

export function MountainSilhouette() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia(REDUCED).matches) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      // Progress = 0 at the top of the page, 1 after the user has scrolled a
      // full viewport down — by which point the hero is well off-screen and
      // any further parallax would just be wasted layout work.
      const y = window.scrollY || 0;
      const vh = window.innerHeight || 1;
      const p = Math.max(0, Math.min(1, y / vh));
      setOffset(p);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Back ridge drifts right + lifts a hair; front ridge drifts left + sinks
  // a hair. Magnitudes are intentionally small (≤ 18px) so the effect reads
  // as depth, not motion-as-decoration.
  const backX = offset * 18;
  const backY = offset * -4;
  const frontX = offset * -10;
  const frontY = offset * 3;

  return (
    <div
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
            transform: `translate3d(${backX}px, ${backY}px, 0)`,
            transition: "transform 120ms linear",
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
            transform: `translate3d(${frontX}px, ${frontY}px, 0)`,
            transition: "transform 120ms linear",
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
