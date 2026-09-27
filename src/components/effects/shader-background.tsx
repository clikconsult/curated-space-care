import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import { ClientOnly, usePrefersMotion } from "./client-only";

/**
 * Full-bleed, slow-moving liquid gradient in brand colors (espresso / ember / gold).
 * Client-only: renders nothing on the server and nothing under reduced-motion —
 * the section behind it always has its own solid background color as a fallback,
 * so layout and contrast never depend on this mounting.
 */
export function ShaderBackground({ className = "" }: { className?: string }) {
  return (
    <ClientOnly>
      <ShaderMotionGate className={className} />
    </ClientOnly>
  );
}

function ShaderMotionGate({ className }: { className: string }) {
  const canAnimate = usePrefersMotion();
  if (!canAnimate) return null;
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <ShaderGradientCanvas style={{ width: "100%", height: "100%" }} pixelDensity={1} fov={45}>
        <ShaderGradient
          type="waterPlane"
          animate="on"
          uSpeed={0.12}
          uStrength={2.2}
          uDensity={1.1}
          uFrequency={5.5}
          color1="#462E2C"
          color2="#D26638"
          color3="#E8C930"
          brightness={1}
          grain="off"
          reflection={0.05}
          cAzimuthAngle={180}
          cPolarAngle={90}
          cDistance={3.6}
          cameraZoom={1}
          positionX={0}
          positionY={0}
          positionZ={0}
          rotationX={0}
          rotationY={0}
          rotationZ={0}
          lightType="3d"
          envPreset="city"
        />
      </ShaderGradientCanvas>
    </div>
  );
}
