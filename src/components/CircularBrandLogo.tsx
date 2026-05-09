import Image from "next/image";
import { cn } from "@/lib/utils";
import { SITE_LOGO_SRC } from "@/lib/site-brand";

export { SITE_LOGO_SRC };

type CircularBrandLogoProps = {
  className?: string;
  /** Set true in the header for quicker LCP when above the fold */
  priority?: boolean;
};

export function CircularBrandLogo({
  className,
  priority = false,
}: CircularBrandLogoProps) {
  return (
    <span
      className={cn(
        "relative inline-block h-9 w-9 shrink-0 overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-ink/10 sm:h-10 sm:w-10",
        className
      )}
      aria-hidden
    >
      <Image
        src={SITE_LOGO_SRC}
        alt=""
        width={160}
        height={160}
        sizes="2.75rem"
        priority={priority}
        className="h-full w-full scale-[1.12] rounded-full object-cover object-center"
      />
    </span>
  );
}
