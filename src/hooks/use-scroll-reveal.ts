import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

const PENDING = "[data-reveal]:not([data-in])";

/**
 * Reveals [data-reveal] elements as they scroll into view. Mount once (SiteShell).
 * Skips everything when the visitor prefers reduced motion, so content is never hidden for them.
 */
export function useScrollReveal() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const root = document.documentElement;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches || typeof IntersectionObserver === "undefined") {
      root.classList.remove("motion-ok");
      return;
    }

    // First run after hydration: whatever is already on screen stays as rendered (no flash of hidden content).
    if (!root.classList.contains("motion-ok")) {
      const vh = window.innerHeight;
      for (const el of document.querySelectorAll<HTMLElement>(PENDING)) {
        const r = el.getBoundingClientRect();
        if (r.top < vh && r.bottom > 0) el.setAttribute("data-in", "");
      }
      root.classList.add("motion-ok");
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute("data-in", "");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    for (const el of document.querySelectorAll<HTMLElement>(PENDING)) io.observe(el);

    const onPrefChange = () => { if (mq.matches) root.classList.remove("motion-ok"); };
    mq.addEventListener("change", onPrefChange);
    return () => { io.disconnect(); mq.removeEventListener("change", onPrefChange); };
  }, [pathname]);
}
