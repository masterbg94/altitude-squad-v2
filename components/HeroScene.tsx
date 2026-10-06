// Pure SVG + CSS: a technician rappels down a tall facade on page load, then sways gently.
export default function HeroScene() {
  return (
    <svg className="scene" viewBox="0 0 400 560" role="img" aria-label="Alpinistički tehničar spušta se uz zgradu - vizuelni prikaz visinskih radova bez skele">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9fd0ee" />
          <stop offset="1" stopColor="#eaf4fa" />
        </linearGradient>
      </defs>
      <rect width="400" height="560" fill="url(#sky)" />
      <g className="cloud" aria-hidden="true">
        <ellipse cx="90" cy="90" rx="50" ry="14" fill="#fff" opacity=".85" />
        <ellipse cx="125" cy="80" rx="30" ry="12" fill="#fff" opacity=".85" />
      </g>
      <path d="M0 470 L90 340 L160 420 L240 300 L400 470 V560 H0Z" fill="#b7cfe0" />
      <rect x="170" y="0" width="190" height="560" fill="#1d3b5a" />
      {Array.from({ length: 9 }).map((_, r) =>
        Array.from({ length: 4 }).map((_, c) => (
          <rect
            key={`${r}-${c}`}
            x={185 + c * 42}
            y={40 + r * 56}
            width="28"
            height="36"
            rx="3"
            fill="#3f6b94"
            opacity={(r + c) % 3 === 0 ? 1 : 0.7}
            aria-hidden="true"
          />
        ))
      )}
      <rect x="170" y="0" width="190" height="10" fill="#0e2a47" />
      <line x1="150" y1="0" x2="150" y2="560" stroke="#ff6a1a" strokeWidth="3" className="rope" aria-hidden="true" />
      <g className="climber" aria-hidden="true">
        <g className="sway">
          <circle cx="150" cy="0" r="9" fill="#f2c9a0" />
          <path d="M139 -2 a11 10 0 0 1 22 0Z" fill="#ff6a1a" />
          <rect x="141" y="9" width="18" height="30" rx="5" fill="#ff6a1a" />
          <path d="M146 39 L141 66 M154 39 L159 66" stroke="#0e2a47" strokeWidth="6" strokeLinecap="round" />
          <path d="M141 14 L128 30 M159 14 L150 4" stroke="#0e2a47" strokeWidth="5" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}
