import { useId } from "react";
import lesbestMark from "@/assets/lesbest-mark.png";
import { ClientOnly, usePrefersMotion } from "./client-only";

/**
 * Plays a one-shot "liquid settling into shape" distortion on the logo mark
 * when it first mounts, then freezes flat. Falls back to a plain static
 * logo on the server and under reduced-motion.
 */
export function LiquidLogo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <ClientOnly fallback={<PlainLogo light={light} className={className} />}>
      <LiquidLogoAnimated light={light} className={className} />
    </ClientOnly>
  );
}

function PlainLogo({ light, className }: { light: boolean; className: string }) {
  return <img src={lesbestMark} alt="LESBEST" className={`h-11 w-auto ${light ? "brightness-0 invert" : ""} ${className}`} />;
}

function LiquidLogoAnimated({ light, className }: { light: boolean; className: string }) {
  const canAnimate = usePrefersMotion();
  const id = useId();
  if (!canAnimate) return <PlainLogo light={light} className={className} />;
  return (
    <span className="relative inline-flex">
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <filter id={id}>
          <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="2" result="turb">
            <animate attributeName="baseFrequency" values="0.045;0.012;0.0001" dur="1.1s" begin="0s" fill="freeze" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="turb" scale="46" xChannelSelector="R" yChannelSelector="G">
            <animate attributeName="scale" values="46;58;0" dur="1.1s" begin="0s" fill="freeze" />
          </feDisplacementMap>
        </filter>
      </svg>
      <img
        src={lesbestMark}
        alt="LESBEST"
        style={{ filter: `url(#${id})` }}
        className={`h-11 w-auto animate-[liquid-fade_1.1s_ease-out_both] ${light ? "brightness-0 invert" : ""} ${className}`}
      />
    </span>
  );
}
