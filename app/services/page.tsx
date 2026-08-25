import type { Metadata } from "next";
import { Services } from "@/components/home/Services";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Photography Services in Jabalpur",
  description:
    "Wedding photography, pre-wedding photography, and event photography in Jabalpur by Ashok Studio. Book a date for ceremonies, portraits, and celebrations.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <PageShell>
      <Services />
    </PageShell>
  );
}
