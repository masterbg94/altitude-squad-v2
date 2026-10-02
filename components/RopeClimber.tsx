"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import workerImage from "@/app/assets/altitude-worker2.png";

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
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div ref={ref} className="rc" aria-hidden>
      <div className="rc-rope" />
      <div className="rc-fill" />
      <Image
        className="rc-man"
        src={workerImage}
        alt=""
        width={375}
        height={666}
        unoptimized
      />
    </div>
  );
}
