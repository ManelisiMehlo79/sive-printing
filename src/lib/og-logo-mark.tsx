/**
 * Matches `CircularBrandLogo`: white circular ground, subtle ink ring, slightly zoomed logo.
 * For `next/og` ImageResponse (Satori subset).
 */

type LogoMarkCircleProps = {
  outerPx: number;
  logoSrc: string;
};

export function LogoMarkCircle({ outerPx, logoSrc }: LogoMarkCircleProps) {
  const ring = Math.max(1, Math.round(outerPx * 0.028));
  return (
    <div
      style={{
        width: outerPx,
        height: outerPx,
        borderRadius: outerPx / 2,
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        boxShadow: `0 0 0 ${ring}px rgb(15 23 42 / 0.1), 0 1px 2px rgb(0 0 0 / 0.06)`,
      }}
    >
      <img
        src={logoSrc}
        alt=""
        width={outerPx}
        height={outerPx}
        style={{
          objectFit: "cover",
          objectPosition: "50% 50%",
          borderRadius: outerPx / 2,
          transform: "scale(1.12)",
        }}
      />
    </div>
  );
}
