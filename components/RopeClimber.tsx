"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function RopeClimber() {
  const ref = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

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
    <div ref={ref} className="rc" aria-hidden="true" role="img" aria-label="Animirani alpinista koji spušta uz stranicu prilikom skrolovanja">
      <div className="rc-rope" aria-hidden="true" />
      <div className="rc-fill" aria-hidden="true" />
      <Image
        className="rc-man"
        src="/altitude-worker2.png"
        alt="Tehničar visinskih radova na užetu - animacija skrolovanja"
        width={375}
        height={666}
        priority={false}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
        sizes="(max-width: 820px) 60px, 60px"
        style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.3s ease" }}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}
