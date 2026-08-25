import { PageShell } from "@/components/layout/PageShell";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { FeaturedStory } from "@/components/home/FeaturedStory";
import { Weddings } from "@/components/home/Weddings";
import { About } from "@/components/home/About";
import { Services } from "@/components/home/Services";
import { Philosophy } from "@/components/home/Philosophy";
import { Testimonials } from "@/components/home/Testimonials";
import { Legacy } from "@/components/home/Legacy";
import { FinalCta } from "@/components/home/FinalCta";

export default function HomePage() {
  return (
    <PageShell home>
      <Hero />
      <Intro />
      <FeaturedStory />
      <Weddings />
      <About />
      <Services />
      <Philosophy />
      <Testimonials />
      <Legacy />
      <FinalCta />
    </PageShell>
  );
}
