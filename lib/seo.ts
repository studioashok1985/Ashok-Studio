export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://ashokstudiophotography.com").replace(/\/$/, "");
export const SITE_NAME = "Ashok Studio";

export const PUBLIC_PAGES = [
  { path: "/", title: "Home", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/about", title: "About", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/services", title: "Services", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/wedding-photography", title: "Wedding Photography", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/pre-wedding-photography", title: "Pre-Wedding Photography", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/event-photography", title: "Event Photography", changeFrequency: "weekly" as const, priority: 0.7 },
  { path: "/contact", title: "Contact", changeFrequency: "monthly" as const, priority: 0.8 },
];

export const SEO = {
  title: "Wedding Photographer in Jabalpur | Ashok Studio Photography",
  description:
    "Ashok Studio is a photography studio in Jabalpur, Madhya Pradesh, since 1985. Wedding photography, pre-wedding photography, and event photography for families across Jabalpur.",
  keywords: [
    "photography",
    "photography in Jabalpur",
    "wedding photography",
    "wedding photography Jabalpur",
    "wedding photographer Jabalpur",
    "photographer in Jabalpur",
    "pre wedding photography Jabalpur",
    "pre-wedding photographer Jabalpur",
    "event photography Jabalpur",
    "Indian wedding photography",
    "Ashok Studio",
    "Ashok Studio Photography",
    "wedding photographer Madhya Pradesh",
  ],
};

export function studioJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "PhotographBusiness"],
        "@id": `${SITE_URL}/#studio`,
        name: "Ashok Studio",
        alternateName: ["Ashok Studio Photography", "Ashok Studio Wedding"],
        url: SITE_URL,
        image: `${SITE_URL}/images/hero-cover.jpg`,
        logo: `${SITE_URL}/images/logo.png`,
        description: SEO.description,
        foundingDate: "1985",
        priceRange: "₹₹",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Jabalpur",
          addressRegion: "Madhya Pradesh",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Jabalpur" },
          { "@type": "State", name: "Madhya Pradesh" },
        ],
        knowsAbout: [
          "Photography",
          "Wedding photography",
          "Photography in Jabalpur",
          "Pre-wedding photography",
          "Event photography",
        ],
        sameAs: [
          "https://www.instagram.com/ashokstudiowedding",
          "https://www.facebook.com/share/1cyrX78Vnt/?mibextid=wwXIfr",
          "https://youtube.com/@ashokstudiophotography7047",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Photography services in Jabalpur",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Wedding photography in Jabalpur",
                areaServed: "Jabalpur",
                url: `${SITE_URL}/wedding-photography`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Pre-wedding photography in Jabalpur",
                areaServed: "Jabalpur",
                url: `${SITE_URL}/pre-wedding-photography`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Event photography in Jabalpur",
                areaServed: "Jabalpur",
                url: `${SITE_URL}/event-photography`,
              },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: "en-IN",
        publisher: { "@id": `${SITE_URL}/#studio` },
      },
    ],
  };
}
