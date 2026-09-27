import { useEffect, useState, type ReactNode } from "react";

/** Renders children only after client mount — avoids SSR/hydration issues for canvas & DOM-effect libraries. */
export function ClientOnly({ children, fallback = null }: { children: ReactNode; fallback?: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  return mounted ? <>{children}</> : <>{fallback}</>;
}

/** True once we know the visitor hasn't asked for reduced motion. Defaults to false (safe) until checked. */
export function usePrefersMotion() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setOk(!mq.matches);
    const handler = () => setOk(!mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return ok;
}
