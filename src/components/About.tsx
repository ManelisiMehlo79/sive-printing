import { cn } from "@/lib/utils";
import ProfileCard from "@/components/ProfileCard";
import { SITE_LOGO_SRC } from "@/components/CircularBrandLogo";
import { SITE_EMAIL } from "@/lib/site-brand";
import GlitchText from "@/components/GlitchText";
import DecryptedText from "@/components/DecryptedText";

const PROFILE_IMAGE_SRC = "/sive.jpeg";

const ABOUT_BODY =
  "Printing, scanning, and document help—with delivery—for anyone in South Africa who needs crisp pages without the runaround.";

const SIVE_STORY_PARAGRAPHS = [
  "BySive Printing Services is the vision and creation of Sive Mehlo, a young entrepreneur from the rural community of eMgababa in Peddie. At just 21 years old in 2025, Sive recognized a pressing challenge within his community—limited access to essential printing and document services. For many residents, something as simple as printing a CV, school assignment, or important form required walking long distances or traveling to the nearest town. This not only delayed opportunities but often discouraged people from pursuing them altogether.",
  "Determined to change this reality, Sive Mehlo took the initiative to build a solution that would bring convenience, quality, and professionalism directly to his community. In 2025, he founded BySive Printing Services with a clear mission: to make essential digital and printing services accessible, reliable, and efficient for everyone—regardless of their location. What began as a response to a local need has since grown into a trusted service known for its commitment to excellence and customer care.",
  "What sets the business apart is its strong focus on accessibility and convenience. In addition to offering high-quality printing, scanning, and professional document formatting, Sive introduced a delivery service designed to eliminate the burden of travel. This ensures that clients can receive their completed documents efficiently, saving time and removing barriers that once stood in the way of opportunity.",
  "Beyond his entrepreneurial journey, Sive Mehlo is a graduate of Tshwane University of Technology (TUT), where he obtained a National Diploma in Building. His academic background has instilled in him discipline, precision, and a problem-solving mindset—qualities that are reflected in every aspect of the business, from the accuracy of document layouts to the consistency of service delivery.",
  "At its core, BySive Printing Services is more than just a business—it is a purpose-driven initiative rooted in community impact. Sive Mehlo’s vision is to empower individuals, support small businesses, and ensure that no one is limited by lack of access to essential services. With a growing focus on strong branding, operational efficiency, and customer satisfaction, he continues to expand the business while staying true to the values that inspired its creation.",
  "Through resilience, vision, and a deep understanding of his community’s needs, Sive is not only building a successful enterprise but also creating meaningful change—one document at a time.",
];

function AboutCurveTop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-10 block w-full -translate-y-[calc(100%-2px)] text-ink"
    >
      <svg
        viewBox="0 0 1200 112"
        preserveAspectRatio="none"
        role="presentation"
        className="aspect-[1200/112] min-h-[3.75rem] w-full md:min-h-[4.5rem]"
      >
        <path fill="currentColor" d="M0 112L0 56Q600 -8 1200 56L1200 112L0 112z" />
      </svg>
    </div>
  );
}

/** Wavy divide — in-flow so Vision sits beneath this stripe (was absolute/overlapped by Vision’s backdrop blur). */
function AboutCurveBottom() {
  return (
    <div
      aria-hidden
      className="pointer-events-none relative z-10 -mt-px block w-full leading-none text-walnut"
    >
      <svg
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        role="presentation"
        className="block aspect-[1200/200] min-h-[4rem] w-full md:min-h-[5rem]"
      >
        {/* Left/right both y=82 so seam is level at edges; troughs dip toward Vision */}
        <path
          fill="currentColor"
          d="M0 82 Q300 148 600 82 T1200 82 L1200 200 L0 200 Z"
        />
      </svg>
    </div>
  );
}

export function About() {
  return (
    <section
      id="about"
      data-nav-bysive="white"
      className="relative z-[2] bg-ink scroll-mt-24"
    >
      <AboutCurveTop />
      {/* Curve is a sibling of this wrapper so overflow-x does not clip the translated SVG */}
      <div className="min-w-0 overflow-x-hidden">
        <div className="relative z-[1] mx-auto max-w-6xl min-w-0 px-4 pb-8 pt-6 sm:px-6 sm:pb-20 sm:pt-7 lg:px-8 lg:pb-6 lg:pt-8">
          <div className="mx-auto max-w-3xl -translate-y-4 text-center sm:-translate-y-5 lg:-translate-y-6">
            <h2 className="font-display tracking-tight text-white">
              <GlitchText
                enableOnHover={false}
                speed={0.9}
                className="glitch-about-heading text-white"
              >
                About BySive Printing Services
              </GlitchText>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl break-words text-center text-lg leading-relaxed [overflow-wrap:anywhere]">
              <DecryptedText
                text={ABOUT_BODY}
                animateOn="view"
                repeatOnView
                sequential
                revealDirection="start"
                speed={32}
                className="text-walnut font-semibold italic"
                encryptedClassName="font-mono text-walnut/45 font-semibold italic"
                parentClassName="leading-relaxed"
              />
            </p>
          </div>

          <div className="mt-10 flow-root max-w-full sm:mt-12">
            {/* lg: float wraps body copy beside the card, then fills full row width beneath the card */}
            <div className="origin-top mx-auto mb-0 max-w-fit scale-[0.82] sm:scale-90 md:mx-auto md:scale-[0.94] lg:origin-top-left lg:float-left lg:mb-8 lg:ml-0 lg:mr-10 xl:mr-14">
              <ProfileCard
                name="BySive Printing"
                title="Document printing & finishing"
                contactPhone="064 963 7110"
                contactEmail={SITE_EMAIL}
                contactText="Get in touch"
                contactHref="/contact"
                avatarUrl={PROFILE_IMAGE_SRC}
                miniAvatarUrl={SITE_LOGO_SRC}
                innerGradient="linear-gradient(145deg, rgba(130,102,51,0.42) 0%, rgba(15,23,42,0.72) 100%)"
                behindGlowColor="rgba(130, 102, 51, 0.45)"
                behindGlowSize="55%"
              />
            </div>
            <p
              className={cn(
                "-mt-4 max-w-none break-words text-left text-[0.983rem] leading-[1.7] text-slate-300 [overflow-wrap:anywhere] sm:mt-0 md:text-[1.015rem]"
              )}
            >
              {SIVE_STORY_PARAGRAPHS[0]}
            </p>

            <div className="hidden md:block">
              {SIVE_STORY_PARAGRAPHS.slice(1).map((chunk, i) => (
                <p
                  key={`about-desktop-${i + 1}`}
                  className={cn(
                    "max-w-none break-words text-left text-[0.983rem] leading-[1.7] text-slate-300 [overflow-wrap:anywhere] md:text-[1.015rem]",
                    "mt-5"
                  )}
                >
                  {chunk}
                </p>
              ))}
            </div>

            <details className="group mt-2 md:hidden">
              <summary className="inline-flex cursor-pointer list-none items-center justify-center rounded-full bg-walnut px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-walnut-dark">
                <span className="group-open:hidden">Read more</span>
                <span className="hidden group-open:inline">Read less</span>
              </summary>
              <div className="mt-2">
                {SIVE_STORY_PARAGRAPHS.slice(1).map((chunk, i) => (
                  <p
                    key={`about-mobile-${i + 1}`}
                    className={cn(
                      "max-w-none break-words text-left text-[0.983rem] leading-[1.7] text-slate-300 [overflow-wrap:anywhere] md:text-[1.015rem]",
                      i > 0 && "mt-5"
                    )}
                  >
                    {chunk}
                  </p>
                ))}
              </div>
            </details>
          </div>
        </div>
      </div>
      <AboutCurveBottom />
    </section>
  );
}
