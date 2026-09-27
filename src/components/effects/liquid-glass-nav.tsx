import LiquidGlass from "liquid-glass-react";
import type { ReactNode } from "react";
import { ClientOnly } from "./client-only";

/**
 * Wraps the header bar in a true liquid-glass refraction effect once mounted
 * client-side. Falls back to a plain wrapper (the header keeps its own
 * bg-background/95 + backdrop-blur-sm as a CSS fallback) on the server and
 * before hydration.
 */
export function LiquidGlassNav({ children }: { children: ReactNode }) {
  return (
    <ClientOnly fallback={<>{children}</>}>
      <LiquidGlass
        cornerRadius={0}
        blurAmount={0.08}
        saturation={130}
        aberrationIntensity={1.2}
        elasticity={0}
        displacementScale={28}
        className="!block !w-full"
        padding="0"
      >
        {children}
      </LiquidGlass>
    </ClientOnly>
  );
}
