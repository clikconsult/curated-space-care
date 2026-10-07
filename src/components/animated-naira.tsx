import { useEffect, useRef, useState } from "react";
import { formatNaira } from "@/lib/quote";

/** Shows a naira amount that rolls to its new value when it changes. Screen readers get the final figure only. */
export function AnimatedNaira({ value }: { value: number }) {
  const [shown, setShown] = useState(value);
  const current = useRef(value);

  useEffect(() => {
    if (current.current === value) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      current.current = value;
      setShown(value);
      return;
    }
    const from = current.current;
    const t0 = performance.now();
    const duration = 550;
    let raf = 0;
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const next = p === 1 ? value : Math.round(from + (value - from) * eased);
      current.current = next;
      setShown(next);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <>
      <span aria-hidden="true" className="tabular-nums">{formatNaira(shown)}</span>
      <span className="sr-only">{formatNaira(value)}</span>
    </>
  );
}
