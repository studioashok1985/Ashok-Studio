import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export function PageShell({
  children,
  home = false,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  return (
    <>
      <SiteHeader />
      <main id="main" className={home ? undefined : "pt-20"}>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
