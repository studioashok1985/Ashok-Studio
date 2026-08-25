import { ALBUM_IMAGES } from "./albumAssets";
import { ASSETS } from "./assets";

export type GalleryItem = {
  id: string;
  image: string;
  couple: string;
  location: string;
};

export type LegacyPerson = {
  id: string;
  name: string;
  role: string;
  label: string;
  years: string;
  image: string;
};

export type SiteContent = {
  logo: string;
  hero: {
    eyebrow: string;
    line1: string;
    line2: string;
    services: string;
    cta: string;
    image: string;
  };
  intro: {
    eyebrow: string;
    title: string;
    body: string;
  };
  featured: {
    eyebrow: string;
    place: string;
    kind: string;
    title: string;
    cta: string;
    image: string;
  };
  weddings: {
    eyebrow: string;
    title: string;
    images: string[];
  };
  prewedding: {
    eyebrow: string;
    title: string;
    body: string;
    images: string[];
  };
  events: {
    eyebrow: string;
    title: string;
    images: string[];
  };
  about: {
    eyebrow: string;
    title: string;
    body: string;
    founders: string;
    image: string;
  };
  services: {
    eyebrow: string;
    title: string;
    items: { id: string; number: string; title: string; body: string; image: string }[];
  };
  philosophy: {
    line1: string;
    line2: string;
    body: string;
    image: string;
  };
  testimonials: {
    eyebrow: string;
    title: string;
    items: { id: string; name: string; photo: string; review: string }[];
  };
  legacy: {
    eyebrow: string;
    title: string;
    subtitle: string;
    people: LegacyPerson[];
  };
  cta: {
    title: string;
    body: string;
    primary: string;
    secondary: string;
    meta: string;
    image: string;
  };
  contact: {
    phone: string;
    email: string;
    instagram: string;
    facebook: string;
    youtube: string;
    whatsapp: string;
    location: string;
  };
  footer: {
    tagline: string;
  };
  gallery: {
    items: GalleryItem[];
  };
  albums: {
    wedding: string[];
    prewedding: string[];
    events: string[];
  };
};

export const defaultContent: SiteContent = {
  logo: ASSETS.logo,
  hero: {
    eyebrow: "Wedding Photography in Jabalpur · Est. 1985",
    line1: "We don't just capture moments.",
    line2: "We preserve them.",
    services: "Wedding · Pre-wedding · Events",
    cta: "Explore the work →",
    image: ASSETS.hero,
  },
  intro: {
    eyebrow: "Photography in Jabalpur since 1985",
    title: "Some moments\ndeserve more\nthan a memory.",
    body: "Ashok Studio is a photography studio in Jabalpur. Since 1985 we have photographed weddings, pre-weddings, and family life across Madhya Pradesh — with patience, craft, and a quiet eye for what lasts.",
  },
  featured: {
    eyebrow: "Featured story",
    place: "Jabalpur",
    kind: "Wedding",
    title: "A story worth\nremembering.",
    cta: "View story →",
    image: ASSETS.featured,
  },
  weddings: {
    eyebrow: "Weddings",
    title: "The day, held in light.",
    images: [...ASSETS.weddings],
  },
  prewedding: {
    eyebrow: "Pre-weddings",
    title: "Before the beginning.",
    body: "Two people. One story. A thousand moments before the beginning.",
    images: [...ASSETS.prewedding],
  },
  events: {
    eyebrow: "Events",
    title: "Every celebration\ndeserves a story.",
    images: [...ASSETS.events],
  },
  about: {
    eyebrow: "About Ashok Studio",
    title: "A legacy of\ncapturing love\nsince 1985.",
    body: "Ashok Studio Photography is a wedding photography company based in Jabalpur, Madhya Pradesh. For photography in Jabalpur since 1985, families have trusted three generations of Ashok Studio — from traditional portraits and wedding albums to contemporary cinematic wedding photography. Today, Deepanshu carries that legacy forward with a modern approach to wedding photography, pre-wedding photography, and events.",
    founders: "Ashok Agrawal, Ganesh Agrawal & Deepanshu Agrawal · Jabalpur",
    image: ASSETS.about,
  },
  services: {
    eyebrow: "Services",
    title: "What we photograph",
    items: [
      {
        id: "s1",
        number: "01",
        title: "Wedding",
        body: "Wedding photography in Jabalpur — pheras, baraat, and the quiet in-between, documented with patience.",
        image: ASSETS.services.wedding,
      },
      {
        id: "s2",
        number: "02",
        title: "Pre-wedding",
        body: "Pre-wedding photography in Jabalpur — soft light and real chemistry before the ceremonies begin.",
        image: ASSETS.services.prewedding,
      },
      {
        id: "s3",
        number: "03",
        title: "Events",
        body: "Event photography in Jabalpur for family celebrations and evenings that deserve a lasting record.",
        image: ASSETS.services.events,
      },
    ],
  },
  philosophy: {
    line1: "The best photographs\naren't posed.",
    line2: "They are felt.",
    body: "We look beyond the frame to capture the moments you may not notice — the glance, the laugh, the tear, the hand held tightly, and the people standing quietly behind you.",
    image: ASSETS.philosophy,
  },
  testimonials: {
    eyebrow: "Testimonials",
    title: "Words that remind us why we do this.",
    items: ASSETS.testimonials.map((item, index) => ({
      id: `t${index + 1}`,
      name: item.name,
      photo: item.photo,
      review: item.review,
    })),
  },
  legacy: {
    eyebrow: "Behind every frame is a story.",
    title: "Three generations.\nOne legacy.",
    subtitle: "The people who built Ashok Studio.",
    people: [
      {
        id: "ashok",
        name: "Ashok Agrawal",
        role: "",
        label: "Where it all began.",
        years: "1985",
        image: ASSETS.legacy.ganesh,
      },
      {
        id: "ganesh",
        name: "Ganesh Agrawal",
        role: "",
        label: "The next chapter.",
        years: "",
        image: ASSETS.legacy.ashok,
      },
      {
        id: "deepanshu",
        name: "Deepanshu Agrawal",
        role: "Current photographer",
        label: "The legacy continues.",
        years: "Today",
        image: ASSETS.legacy.deepanshu,
      },
    ],
  },
  cta: {
    title: "Your story\ndeserves to be\nremembered.",
    body: "Let's create photographs you'll want to return to for the rest of your life.",
    primary: "Book your date",
    secondary: "WhatsApp us",
    meta: "Jabalpur · India · Est. 1985",
    image: ASSETS.cta,
  },
  contact: {
    phone: "+91 98765 43210",
    email: "hello@ashokstudio.com",
    instagram: "https://www.instagram.com/ashokstudiowedding",
    facebook: "https://www.facebook.com/share/1cyrX78Vnt/?mibextid=wwXIfr",
    youtube: "https://youtube.com/@ashokstudiophotography7047?si=4mm22BqX7C4Jd-eB",
    whatsapp: "https://wa.me/message/2AVC72BNXQPXC1",
    location: "Jabalpur, Madhya Pradesh, India",
  },
  footer: {
    tagline: "Wedding photography in Jabalpur · Est. 1985",
  },
  gallery: {
    items: [
      { id: "g1", image: "/images/gallery-02.jpg", couple: "Wedding", location: "Jabalpur" },
      { id: "g2", image: "/images/gallery-03.jpg", couple: "Wedding", location: "Jabalpur" },
      { id: "g3", image: "/images/gallery-04.jpg", couple: "Wedding", location: "Jabalpur" },
      { id: "g4", image: "/images/gallery-06.jpg", couple: "Ceremony", location: "Jabalpur" },
      { id: "g5", image: "/images/gallery-07.jpg", couple: "Wedding", location: "Jabalpur" },
      { id: "g6", image: "/images/gallery-08.jpg", couple: "Celebration", location: "Jabalpur" },
    ],
  },
  albums: {
    wedding: [...ALBUM_IMAGES.wedding],
    prewedding: [...ALBUM_IMAGES.prewedding],
    events: [...ALBUM_IMAGES.events],
  },
};

export function mergeContent(stored: unknown, defaults: SiteContent = defaultContent): SiteContent {
  const merge = (current: unknown, fallback: unknown): unknown => {
    if (Array.isArray(fallback)) {
      if (!Array.isArray(current)) return fallback;
      if (fallback[0] && typeof fallback[0] === "object" && !Array.isArray(fallback[0])) {
        return fallback.map((item, index) => merge(current[index], item));
      }
      return current;
    }
    if (fallback && typeof fallback === "object") {
      const source = current && typeof current === "object" ? (current as Record<string, unknown>) : {};
      const next: Record<string, unknown> = {};
      for (const key of Object.keys(fallback as object)) {
        next[key] = merge(source[key], (fallback as Record<string, unknown>)[key]);
      }
      return next;
    }
    return current === undefined ? fallback : current;
  };

  return merge(stored, defaults) as SiteContent;
}
