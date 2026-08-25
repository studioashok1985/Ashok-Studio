import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { EditProvider } from "@/components/edit/EditProvider";
import { EditToolbar } from "@/components/edit/EditToolbar";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { JsonLd } from "@/components/seo/JsonLd";
import { SEO, SITE_NAME, SITE_URL } from "@/lib/seo";
import { loadPublishedContent } from "@/lib/siteStore";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const viewport = {
  themeColor: "#F8F6F1",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SEO.title,
    template: `%s | ${SITE_NAME}`,
  },
  description: SEO.description,
  keywords: SEO.keywords,
  applicationName: SITE_NAME,
  authors: [{ name: "Ashok Studio", url: SITE_URL }],
  creator: "Ashok Studio",
  publisher: "Ashok Studio",
  category: "Photography",
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: SEO.title,
    description: SEO.description,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: "/images/hero-cover.jpg",
        width: 1024,
        height: 625,
        alt: "Bride and groom in traditional Indian wedding attire, photographed by Ashok Studio in Jabalpur",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.title,
    description: SEO.description,
    images: ["/images/hero-cover.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const dynamic = "force-dynamic";

import { Preloader } from "@/components/layout/Preloader";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const initialContent = await loadPublishedContent();

  return (
    <html lang="en-IN" className={`${display.variable} ${sans.variable}`}>
      <head>
        <link rel="preload" as="image" href="/images/hero-cover.jpg" fetchPriority="high" />
      </head>
      <body className="min-w-0">
        <Preloader />
        <JsonLd />
        <EditProvider initialContent={initialContent}>
          <SmoothScroll>
            {children}
            <EditToolbar />
          </SmoothScroll>
        </EditProvider>
      </body>
    </html>
  );
}
