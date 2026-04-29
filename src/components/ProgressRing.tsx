import { BAYERN, HAIRLINE } from "../theme";

export function ProgressRing({
  percent,
  size = 300,
  stroke = 4,
}: {
  percent: number;
  size?: number;
  stroke?: number;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const safe = Math.max(0, Math.min(100, percent));
  const offset = c - (safe / 100) * c;
  return (
    <svg width={size} height={size} className="-rotate-90 block">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={HAIRLINE}
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={BAYERN}
        strokeWidth={stroke}
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 600ms ease" }}
      />
    </svg>
  );
}
