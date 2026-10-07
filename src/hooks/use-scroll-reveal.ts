import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

const PENDING = "[data-reveal]:not([data-in])";

/** Elements that collapse to zero size while hidden (drawn lines) are measured through their parent instead. */
const measured = (el: HTMLElement) => (el.dataset["reveal"]?.startsWith("line") ? el.parentElement ?? el : el);

/**
 * Reveals [data-reveal] elements as they scroll into view. Mount once (SiteShell).
 * Visibility comes from layout rects on scroll, so clipped or scaled-down elements can never get stuck hidden.
 * Does nothing when the visitor prefers reduced motion, so content is never hidden for them.
 */
export function useScrollReveal() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const root = document.documentElement;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      root.classList.remove("motion-ok");
      return;
    }

    const onScreen = (el: HTMLElement, fold: number) => {
      const r = measured(el).getBoundingClientRect();
      return r.top < window.innerHeight * fold && r.bottom > 0;
    };

    let pending = Array.from(document.querySelectorAll<HTMLElement>(PENDING));

    // First run after hydration: whatever is already on screen stays as rendered (no flash of hidden content).
    if (!root.classList.contains("motion-ok")) {
      for (const el of pending) if (onScreen(el, 1)) el.setAttribute("data-in", "");
      pending = pending.filter((el) => !el.hasAttribute("data-in"));
      root.classList.add("motion-ok");
    }

    const reveal = () => {
      pending = pending.filter((el) => {
        if (!el.isConnected) return false;
        if (!onScreen(el, 0.92)) return true;
        el.setAttribute("data-in", "");
        return false;
      });
    };

    let raf = 0;
    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => { raf = 0; reveal(); });
    };

    schedule(); // page changes: elements already on screen animate in
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("load", schedule);

    const onPrefChange = () => { if (mq.matches) root.classList.remove("motion-ok"); };
    mq.addEventListener("change", onPrefChange);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("load", schedule);
      mq.removeEventListener("change", onPrefChange);
    };
  }, [pathname]);
}
