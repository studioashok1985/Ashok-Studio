import type { Metadata } from "next";
import { PreWeddings } from "@/components/home/PreWeddings";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Pre-Wedding Photography in Jabalpur",
  description:
    "Pre-wedding photography in Jabalpur by Ashok Studio. Romantic, cinematic couple portraits before the wedding celebrations begin.",
  alternates: { canonical: "/pre-wedding-photography" },
};

export default function PreWeddingPhotographyPage() {
  return (
    <PageShell>
      <PreWeddings />
    </PageShell>
  );
}
