import Link from "next/link";
import { CircularBrandLogo } from "@/components/CircularBrandLogo";

const links = [
  { href: "/#hero", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#vision", label: "Vision" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact us" },
];

const asideCopy =
  "We print and scan the paperwork people actually use—study packs, certificates, invoices, archives—tie every job off neatly, and deliver finished copies straight to our customers. CV work is part of the mix too: tidy layout on quality stock so yours makes the first impression you intend.";

export function Footer() {
  return (
    <footer
      data-nav-bysive="white"
      className="relative z-0 -mt-px w-full min-w-0 shrink-0 bg-ink text-slate-300"
    >
      <div className="w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-start lg:gap-6 xl:gap-8">
          <div className="justify-self-center text-center lg:justify-self-start lg:text-left">
            <Link
              href="/"
              className="inline-flex max-w-full items-center gap-2 font-display text-base font-semibold leading-tight sm:gap-3 sm:text-xl"
            >
              <CircularBrandLogo />
              <span className="min-w-0">
                <span className="text-white">BySive</span>
                <span className="text-walnut"> Printing Services</span>
              </span>
            </Link>
            <p className="mt-2 hidden max-w-sm text-sm leading-relaxed text-slate-400 sm:block">
              Professional document printing and finishing. Quality you can see
              and timelines you can plan around.
            </p>
          </div>

          <nav
            aria-label="Section links"
            className="justify-self-center lg:px-4"
          >
            <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-center sm:flex-col sm:gap-3">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="inline-block rounded-md px-1 text-sm font-medium text-slate-300 underline-offset-4 transition hover:bg-white/[0.06] hover:text-white hover:underline"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <p className="mx-auto max-w-md justify-self-center text-center text-xs leading-relaxed text-slate-400 sm:text-sm lg:mx-0 lg:max-w-none lg:justify-self-end lg:text-right">
            {asideCopy}
          </p>
        </div>
        <div className="mt-4 flex flex-col items-center gap-1.5 border-t border-slate-700/80 pt-3 text-center text-xs text-slate-500 sm:mt-6 sm:pt-4">
          <p>
            © {new Date().getFullYear()} BySive Printing Services. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
