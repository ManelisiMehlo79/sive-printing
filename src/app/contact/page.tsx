import type { Metadata } from "next";
import Image from "next/image";
import DecryptedText from "@/components/DecryptedText";
import GlitchText from "@/components/GlitchText";
import {
  SITE_CONTACT_MAILTO,
  SITE_EMAIL,
  SITE_LOGO_SRC,
} from "@/lib/site-brand";
import { ContactMapEmbed } from "@/components/ContactMapEmbed";

const CONTACT_PHONE_DISPLAY = "064 963 7110";
const CONTACT_PHONE_TEL = "tel:+27649637110";
const CONTACT_ADDRESS = "By Sive Printing Services, Bani street, Peddie, 5640";
const CONTACT_MAP_EMBED_SRC =
  "https://maps.google.com/maps?q=-33.4006771,27.0878357&t=k&z=17&hl=en&output=embed";
/** Same place in the full Google Maps app (new tab); embed UIs often hide Google’s own fullscreen control */
const CONTACT_MAP_EXTERNAL_HREF =
  "https://www.google.com/maps?q=-33.4006771,27.0878357&t=k&z=17&hl=en";
const WORKING_HOURS = [
  { day: "Monday - Friday", hours: "07:00 - 18:00" },
  { day: "Saturday - Sunday", hours: "09:00 - 17:00" },
];
const CONTACT_INTRO_TEXT =
  "Drop us a mail for quotes or file checks, ring if you prefer a voice conversation, or start with one message describing what you need scanned, printed, or laid out-we will arrange delivery toward you when it helps.";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Email or call BySive Printing Services for document printing and scanning—we deliver locally and assist with polished CV layouts.",
};

export default function ContactPage() {
  return (
    <main
      id="contact"
      data-nav-brand="white"
      className="relative isolate flex min-h-0 flex-1 scroll-mt-24 flex-col pb-10 pt-[calc(4.25rem+1.25rem)] text-ink sm:pt-[calc(4.5rem+1.25rem)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-walnut"
      >
        <Image
          src={SITE_LOGO_SRC}
          alt=""
          fill
          priority
          sizes="100vw"
          className="origin-center scale-[1.28] object-contain object-center p-[min(4vw,1rem)] sm:scale-[1.35] md:scale-[1.42]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-ink/94 via-ink/88 to-walnut"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_95%_85%_at_50%_38%,transparent_12%,rgb(15_23_42/0.35)_62%,rgb(15_23_42/0.78)_100%)]"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-2.5 pb-6 pt-14 sm:px-6 lg:px-8 lg:pb-8 lg:pt-20">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-sky-200/90">
          Contact us
        </p>
        <h1 className="mt-2 text-center font-display tracking-tight text-white">
          <GlitchText
            enableOnHover={false}
            speed={0.9}
            className="glitch-vision-heading text-white"
          >
            Reach us the way that suits you
          </GlitchText>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl break-words text-center text-lg leading-relaxed [overflow-wrap:anywhere]">
          <DecryptedText
            text={CONTACT_INTRO_TEXT}
            animateOn="view"
            repeatOnView
            sequential
            revealDirection="start"
            speed={32}
            className="text-white font-semibold italic"
            encryptedClassName="font-mono text-white/45 font-semibold italic"
            parentClassName="leading-relaxed"
          />
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="space-y-5">
            <div className="contact-card-enter contact-card-enter-1 rounded-2xl border border-white/20 bg-white/10 p-6 shadow-[0_14px_32px_-8px_rgb(0_0_0/0.82),0_8px_20px_-6px_rgb(0_0_0/0.62)] backdrop-blur-xl sm:p-7">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-white/85">
                Email
              </h2>
              <a
                href={SITE_CONTACT_MAILTO}
                className="mt-2 inline-block font-medium text-ink underline decoration-white/35 underline-offset-4 transition hover:text-white hover:decoration-white"
              >
                {SITE_EMAIL}
              </a>
            </div>

            <div className="contact-card-enter contact-card-enter-2 rounded-2xl border border-white/20 bg-white/10 p-6 shadow-[0_14px_32px_-8px_rgb(0_0_0/0.82),0_8px_20px_-6px_rgb(0_0_0/0.62)] backdrop-blur-xl sm:p-7">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-white/85">
                Phone
              </h2>
              <a
                href={CONTACT_PHONE_TEL}
                className="mt-2 inline-block text-lg font-semibold text-ink underline decoration-white/35 underline-offset-4 transition hover:text-white hover:decoration-white"
              >
                {CONTACT_PHONE_DISPLAY}
              </a>
            </div>

            <div className="contact-card-enter contact-card-enter-3 rounded-2xl border border-white/20 bg-white/10 p-6 shadow-[0_14px_32px_-8px_rgb(0_0_0/0.82),0_8px_20px_-6px_rgb(0_0_0/0.62)] backdrop-blur-xl sm:p-7">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-white/85">
                Working hours
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-200">
                {WORKING_HOURS.map((item) => (
                  <li key={item.day} className="flex items-center justify-between gap-4">
                    <span>{item.day}</span>
                    <span className="font-medium text-white">{item.hours}</span>
                  </li>
                ))}
              </ul>
            </div>

          </aside>

          <section className="contact-form-enter rounded-3xl border border-white/20 bg-white/10 p-3.5 shadow-[0_14px_32px_-8px_rgb(0_0_0/0.82),0_8px_20px_-6px_rgb(0_0_0/0.62)] backdrop-blur-xl sm:p-4">
            <h2 className="text-lg font-semibold leading-tight text-white">Send us a message</h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-200">
              Share what you need printed or scanned and we will reply with timing
              and pricing.
            </p>
            <form
              action={SITE_CONTACT_MAILTO}
              method="post"
              encType="text/plain"
              className="mt-3 grid gap-2.5 rounded-3xl"
            >
              <label className="grid gap-1.5 text-sm font-medium text-slate-100">
                Full name
                <input
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  className="h-9 rounded-3xl border border-white/20 bg-gray-200 px-3.5 text-sm text-white placeholder:text-slate-400 outline-none transition focus:border-sky-300/70 focus:ring-2 focus:ring-sky-400/30"
                  required
                />
              </label>
              <label className="grid gap-1.5 text-sm font-medium text-slate-100">
                Email address
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="h-9 rounded-3xl border border-white/20 bg-gray-200 px-3.5 text-sm text-white placeholder:text-slate-400 outline-none transition focus:border-sky-300/70 focus:ring-2 focus:ring-sky-400/30"
                  required
                />
              </label>
              <label className="grid gap-1.5 text-sm font-medium text-slate-100">
                Message
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Tell us quantities, paper type, and your deadline."
                  className="rounded-3xl border border-white/20 bg-gray-200 px-3.5 py-2 text-sm text-white placeholder:text-slate-400 outline-none transition focus:border-sky-300/70 focus:ring-2 focus:ring-sky-400/30"
                  required
                />
              </label>
              <div className="mt-0.5 flex justify-center">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-full bg-ink px-6 py-2.5 text-center text-sm font-semibold text-white shadow-md transition hover:bg-slate-800"
                >
                  Send message
                </button>
              </div>
            </form>
          </section>
        </div>

        <section className="mx-auto mt-6 w-full max-w-7xl rounded-3xl border border-white/20 bg-white/10 p-3.5 shadow-[0_14px_32px_-8px_rgb(0_0_0/0.82),0_8px_20px_-6px_rgb(0_0_0/0.62)] backdrop-blur-xl sm:p-4">
          <h2 className="text-lg font-semibold leading-tight text-white">Find us on Google Maps</h2>
          <p className="mt-1 text-sm leading-relaxed text-slate-200">{CONTACT_ADDRESS}</p>
          <ContactMapEmbed
            embedSrc={CONTACT_MAP_EMBED_SRC}
            externalMapsHref={CONTACT_MAP_EXTERNAL_HREF}
          />
        </section>
      </div>
    </main>
  );
}
