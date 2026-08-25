import type { Metadata } from "next";
import { FeaturedStory } from "@/components/home/FeaturedStory";
import { Weddings } from "@/components/home/Weddings";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Wedding Photography in Jabalpur",
  description:
    "Wedding photographer in Jabalpur for pheras, baraat, portraits, and the quiet in-between. View Ashok Studio wedding photography from Madhya Pradesh.",
  alternates: { canonical: "/wedding-photography" },
};

export default function WeddingPhotographyPage() {
  return (
    <PageShell>
      <Weddings />
      <FeaturedStory />
    </PageShell>
  );
}
