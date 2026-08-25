import type { Metadata } from "next";
import { Events } from "@/components/home/Events";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Event Photography in Jabalpur",
  description:
    "Event photography in Jabalpur for family celebrations, receptions, and evenings that deserve a lasting record. Photographed by Ashok Studio.",
  alternates: { canonical: "/event-photography" },
};

export default function EventPhotographyPage() {
  return (
    <PageShell>
      <Events />
    </PageShell>
  );
}
