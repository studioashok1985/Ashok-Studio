import type { Metadata } from "next";
import { About } from "@/components/home/About";
import { Legacy } from "@/components/home/Legacy";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "About Ashok Studio",
  description:
    "Ashok Studio Photography is a wedding photography studio in Jabalpur, Madhya Pradesh, since 1985. Three generations of photographers documenting weddings and family life.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <PageShell>
      <About />
      <Legacy />
    </PageShell>
  );
}
