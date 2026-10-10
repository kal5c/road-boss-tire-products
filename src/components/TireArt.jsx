import { useId } from "react";

// Built-in tire artwork (side view). Each tread pattern and wheel type
// looks different, so every model gets its own picture without photos.

const PATTERNS = {
  block: { n: 56, depth: 10, fill: 0.62, skew: 0, zig: false },
  lug: { n: 40, depth: 12, fill: 0.68, skew: 0.18, zig: false },
  slant: { n: 52, depth: 10, fill: 0.6, skew: 0.5, zig: false },
  zigzag: { n: 64, depth: 10, fill: 0.55, skew: 0.3, zig: true },
  fine: { n: 96, depth: 6, fill: 0.6, skew: 0.2, zig: false },
  sport: { n: 84, depth: 6, fill: 0.5, skew: 0.55, zig: false },
  allseason: { n: 72, depth: 8, fill: 0.66, skew: 0.28, zig: true },
};

const CX = 100;
const CY = 100;

function polar(r, deg) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return `${(CX + r * Math.cos(rad)).toFixed(1)},${(CY + r * Math.sin(rad)).toFixed(1)}`;
}

function treadBlocks(config) {
  const outer = 95;
  const inner = outer - config.depth;
  const step = 360 / config.n;
  const blocks = [];

  for (let i = 0; i < config.n; i += 1) {
    const start = i * step;
    const width = step * config.fill;
    const shift = (config.zig && i % 2 ? -config.skew : config.skew) * step;
    blocks.push(
      [
        polar(outer, start),
        polar(outer, start + width),
        polar(inner, start + width + shift),
        polar(inner, start + shift),
      ].join(" "),
    );
  }
  return blocks;
}

function Spokes({ count, rimR, fill }) {
  const spokes = [];
  for (let i = 0; i < count; i += 1) {
    const angle = (360 / count) * i;
    const tip = rimR - 5;
    spokes.push(
      <polygon
        key={i}
        points={`${CX - 4.5},${CY - 11} ${CX + 4.5},${CY - 11} ${CX + 9},${CY - tip} ${CX - 9},${CY - tip}`}
        fill={fill}
        stroke={fill}
        strokeWidth="3"
        strokeLinejoin="round"
        transform={`rotate(${angle} ${CX} ${CY})`}
      />,
    );
  }
  return <g>{spokes}</g>;
}

function SteelWheel({ rimR, ids }) {
  const holes = [];
  const bolts = [];
  for (let i = 0; i < 8; i += 1) {
    holes.push(
      <ellipse
        key={`h${i}`}
        cx={CX}
        cy={CY - rimR * 0.62}
        rx="6"
        ry="8.5"
        fill="#16171a"
        transform={`rotate(${i * 45} ${CX} ${CY})`}
      />,
    );
  }
  for (let i = 0; i < 10; i += 1) {
    const p = polar(rimR * 0.3, i * 36).split(",");
    bolts.push(<circle key={`b${i}`} cx={p[0]} cy={p[1]} r="1.9" fill="#5b616b" />);
  }
  return (
    <g>
      <circle cx={CX} cy={CY} r={rimR - 4} fill={`url(#${ids.steel})`} stroke="#6f7580" strokeWidth="1" />
      {holes}
      <circle cx={CX} cy={CY} r={rimR * 0.4} fill="#b9bec7" stroke="#7b818b" strokeWidth="1" />
      {bolts}
      <circle cx={CX} cy={CY} r="8" fill="#2b2e34" stroke="#8b919b" strokeWidth="1" />
      <circle cx={CX - 2} cy={CY - 2} r="2.4" fill="#ffffff" opacity="0.5" />
    </g>
  );
}

function AlloyWheel({ spokes, rimR, ids }) {
  return (
    <g>
      <circle cx={CX} cy={CY} r={rimR - 3} fill="#14151a" />
      <circle cx={CX} cy={CY} r={rimR * 0.62} fill={`url(#${ids.rotor})`} />
      <circle cx={CX} cy={CY} r={rimR * 0.62} fill="none" stroke="#3a3d44" strokeWidth="1" />
      <Spokes count={spokes} rimR={rimR} fill={`url(#${ids.rim})`} />
      <circle cx={CX} cy={CY} r="10" fill={`url(#${ids.rim})`} stroke="#8d939d" strokeWidth="1" />
      <circle cx={CX} cy={CY} r="4" fill="#2a2d33" />
      <circle cx={CX - 2.5} cy={CY - 2.5} r="2" fill="#ffffff" opacity="0.55" />
    </g>
  );
}

export default function TireArt({ kind = "truck", pattern = "block", brand = "", model = "", size = "", title }) {
  const raw = useId();
  const uid = raw.replace(/[^a-zA-Z0-9]/g, "");
  const ids = {
    tire: `tire${uid}`,
    side: `side${uid}`,
    rim: `rim${uid}`,
    steel: `steel${uid}`,
    rotor: `rotor${uid}`,
    shine: `shine${uid}`,
    top: `top${uid}`,
    bottom: `bottom${uid}`,
  };

  const config = PATTERNS[pattern] || PATTERNS.block;
  const blocks = treadBlocks(config);
  const isTruck = kind === "truck";
  const rimR = isTruck ? 47 : kind === "suv" ? 53 : 58;
  const sideR = 95 - config.depth - 1;
  const label = `${brand} ${model}`.trim();

  return (
    <svg
      className="tire-art"
      viewBox="0 0 200 200"
      role="img"
      aria-label={title || `${label} tire`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={ids.tire} cx="50%" cy="50%" r="50%">
          <stop offset="70%" stopColor="#101012" />
          <stop offset="100%" stopColor="#060607" />
        </radialGradient>
        <radialGradient id={ids.side} cx="42%" cy="38%" r="75%">
          <stop offset="0%" stopColor="#2a2b2f" />
          <stop offset="100%" stopColor="#111214" />
        </radialGradient>
        <linearGradient id={ids.rim} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f2f4f7" />
          <stop offset="50%" stopColor="#b7bdc7" />
          <stop offset="100%" stopColor="#7d838e" />
        </linearGradient>
        <radialGradient id={ids.steel} cx="40%" cy="35%" r="80%">
          <stop offset="0%" stopColor="#e7eaee" />
          <stop offset="100%" stopColor="#8b919b" />
        </radialGradient>
        <radialGradient id={ids.rotor} cx="50%" cy="50%" r="50%">
          <stop offset="55%" stopColor="#7f848d" />
          <stop offset="100%" stopColor="#4a4e56" />
        </radialGradient>
        <radialGradient id={ids.shine} cx="30%" cy="25%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <path id={ids.top} d={`M ${CX - 70},${CY} A 70,70 0 0,1 ${CX + 70},${CY}`} />
        <path id={ids.bottom} d={`M ${CX - 72},${CY} A 72,72 0 0,0 ${CX + 72},${CY}`} />
      </defs>

      {/* tread + body */}
      <circle cx={CX} cy={CY} r="96" fill={`url(#${ids.tire})`} />
      {blocks.map((points, i) => (
        <polygon key={i} points={points} fill="#2a2b2f" stroke="#3c3d42" strokeWidth="0.4" />
      ))}

      {/* sidewall */}
      <circle cx={CX} cy={CY} r={sideR} fill={`url(#${ids.side})`} />
      <circle cx={CX} cy={CY} r={sideR - 4} fill="none" stroke="#3a3b40" strokeWidth="0.7" />
      <circle cx={CX} cy={CY} r={rimR + 12} fill="none" stroke="#323338" strokeWidth="0.6" />

      {/* sidewall lettering */}
      {label && (
        <text fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="9.5" letterSpacing="2" fill="#e9eaee" fillOpacity="0.78">
          <textPath href={`#${ids.top}`} startOffset="50%" textAnchor="middle">
            {label.toUpperCase()}
          </textPath>
        </text>
      )}
      {size && (
        <text fontFamily="Arial, Helvetica, sans-serif" fontWeight="600" fontSize="7.5" letterSpacing="1.2" fill="#e9eaee" fillOpacity="0.55">
          <textPath href={`#${ids.bottom}`} startOffset="50%" textAnchor="middle">
            {size}
          </textPath>
        </text>
      )}

      {/* bead + wheel */}
      <circle cx={CX} cy={CY} r={rimR + 4} fill="#08090a" />
      <circle cx={CX} cy={CY} r={rimR} fill={`url(#${ids.rim})`} />
      {isTruck ? (
        <SteelWheel rimR={rimR} ids={ids} />
      ) : (
        <AlloyWheel spokes={kind === "suv" ? 6 : 5} rimR={rimR} ids={ids} />
      )}

      {/* glossy highlight */}
      <circle cx={CX} cy={CY} r="96" fill={`url(#${ids.shine})`} />
    </svg>
  );
}
