"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: "fade" | "clip";
  delayMs?: number;
};

export function Reveal({ children, className, variant = "fade", delayMs = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      node.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        window.setTimeout(() => node.classList.add("is-visible"), delayMs);
        observer.unobserve(node);
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delayMs]);

  return (
    <div ref={ref} className={clsx(variant === "clip" ? "reveal-clip" : "reveal", className)}>
      {children}
    </div>
  );
}
