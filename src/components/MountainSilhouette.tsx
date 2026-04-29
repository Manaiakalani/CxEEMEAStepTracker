import { BAYERN } from "../theme";

export function MountainSilhouette() {
  return (
    <svg
      viewBox="0 0 1200 180"
      className="absolute inset-x-0 bottom-0 w-full h-[180px] pointer-events-none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,180 L0,140 L90,90 L160,120 L240,60 L330,110 L420,70 L520,130 L600,80 L690,120 L780,50 L880,110 L970,85 L1080,130 L1200,95 L1200,180 Z"
        fill={BAYERN}
        opacity="0.06"
      />
      <path
        d="M0,180 L0,160 L80,130 L170,150 L260,115 L360,145 L450,125 L560,155 L640,130 L740,150 L830,120 L930,150 L1020,135 L1120,160 L1200,140 L1200,180 Z"
        fill={BAYERN}
        opacity="0.09"
      />
    </svg>
  );
}
