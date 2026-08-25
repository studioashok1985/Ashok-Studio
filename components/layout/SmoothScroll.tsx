"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Lightweight hash scrolling only — no Lenis / RAF loops. */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest("a");
      if (!link || event.defaultPrevented) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (link.getAttribute("target") === "_blank") return;

      const href = link.getAttribute("href");
      if (!href) return;
      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;

      const path = href.slice(0, hashIndex);
      const hash = href.slice(hashIndex + 1);
      if (!hash) return;
      const local = path === "" || path === "/" || path === pathname;
      if (!local) return;

      const target = document.getElementById(hash);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", `${pathname === "/" ? "/" : pathname}#${hash}`);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return <>{children}</>;
}
