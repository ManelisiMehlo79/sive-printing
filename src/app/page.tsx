import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Vision } from "@/components/Vision";
import { Testimonials } from "@/components/Testimonials";
export default function HomePage() {
  return (
    <>
      <main className="pt-[calc(4.25rem+1.25rem)] sm:pt-[calc(4.5rem+1.25rem)]">
        <Hero />
        <About />
        <Vision />
        <Testimonials />
      </main>
    </>
  );
}
