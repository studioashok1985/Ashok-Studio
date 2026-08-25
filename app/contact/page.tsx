import type { Metadata } from "next";
import { FinalCta } from "@/components/home/FinalCta";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Book a Wedding Photographer in Jabalpur",
  description:
    "Contact Ashok Studio to book wedding photography, pre-wedding photography, or event photography in Jabalpur, Madhya Pradesh.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <PageShell>
      <FinalCta />
    </PageShell>
  );
}
