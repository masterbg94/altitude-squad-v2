"use client";
import { useEffect, useRef } from "react";

// Fixed rope on the page edge. The climber descends as you scroll and his legs pump with the scroll distance.
export default function RopeClimber() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? Math.min(scrollY / max, 1) : 0;
      const y = 40 + p * (innerHeight - 190);
      el.style.setProperty("--y", `${y}px`);
      el.style.setProperty("--swing", `${Math.sin(scrollY / 45) * 18}`);
      el.style.opacity = String(Math.min(scrollY / (innerHeight * 0.5), 1));
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => { removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div ref={ref} className="rc" aria-hidden>
      <div className="rc-rope" /><div className="rc-fill" />
      <svg className="rc-man" viewBox="0 0 60 110" width="60" height="110">
        <circle cx="30" cy="12" r="7" fill="#f2c9a0" />
        <path d="M21 10 a9 8 0 0 1 18 0Z" fill="#ff6a1a" />
        <rect x="22" y="20" width="16" height="30" rx="5" fill="#ff6a1a" />
        <path d="M26 34 L14 26 M34 34 L30 20" stroke="#0e2a47" strokeWidth="5" strokeLinecap="round" />
        <g className="rc-leg l"><path d="M26 50 L22 80" stroke="#0e2a47" strokeWidth="6" strokeLinecap="round" /></g>
        <g className="rc-leg r"><path d="M34 50 L38 80" stroke="#0e2a47" strokeWidth="6" strokeLinecap="round" /></g>
      </svg>
    </div>
  );
}
