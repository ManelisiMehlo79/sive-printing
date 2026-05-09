/**
 * Full-viewport loop — file: `public/bg7.mp4`
 */
export function SiteBackgroundVideo() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 min-h-[100dvh] overflow-hidden"
    >
      <video
        className="absolute inset-0 h-full w-full min-w-full object-cover [transform:translateZ(0)]"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/bg7.mp4" type="video/mp4" />
      </video>
      <div
        className="absolute inset-0 bg-black/82"
        aria-hidden
      />
    </div>
  );
}
