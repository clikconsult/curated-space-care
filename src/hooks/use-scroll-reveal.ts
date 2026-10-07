import { useEffect } from "react";

const PENDING = "[data-reveal]:not([data-in])";

/** Elements that collapse to zero size while hidden (drawn lines) are measured through their parent instead. */
const measured = (el: HTMLElement) => (el.dataset["reveal"]?.startsWith("line") ? el.parentElement ?? el : el);

/**
 * Reveals [data-reveal] elements as they scroll into view. Mount once (SiteShell).
 * - Looks at the live page on every check, so content that mounts later (client-side navigation) is never missed.
 * - Uses layout rects, so clipped or scaled-down elements can never get stuck hidden.
 * - Does nothing when the visitor prefers reduced motion, so content is never hidden for them.
 */
export function useScrollReveal() {
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

    // First run after hydration: whatever is already on screen stays as rendered (no flash of hidden content).
    if (!root.classList.contains("motion-ok")) {
      for (const el of document.querySelectorAll<HTMLElement>(PENDING)) if (onScreen(el, 1)) el.setAttribute("data-in", "");
      root.classList.add("motion-ok");
    }

    const reveal = () => {
      for (const el of document.querySelectorAll<HTMLElement>(PENDING)) if (onScreen(el, 0.92)) el.setAttribute("data-in", "");
    };

    let raf = 0;
    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => { raf = 0; reveal(); });
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("load", schedule);
    // New page content mounting (route changes, lazy sections) triggers a check too.
    const mo = new MutationObserver(schedule);
    mo.observe(document.body, { childList: true, subtree: true });

    const onPrefChange = () => { if (mq.matches) root.classList.remove("motion-ok"); };
    mq.addEventListener("change", onPrefChange);

    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("load", schedule);
      mq.removeEventListener("change", onPrefChange);
    };
  }, []);
}
