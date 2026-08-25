/**
 * Asset map — every path points at a real file in public/images.
 * Replace individual paths after adding Ganesh / Ashok / Deepanshu portraits.
 */
export const ASSETS = {
  logo: "/images/logo.png",
  hero: "/images/hero-cover.jpg",
  featured: "/albums/wedding/wedding-002.webp",
  about: "/albums/wedding/wedding-003.webp",
  philosophy: "/albums/wedding/wedding-004.webp",
  cta: "/images/cta-cover.jpg",
  weddings: [
    "/albums/wedding/wedding-006.webp",
    "/albums/wedding/wedding-007.webp",
    "/albums/wedding/wedding-008.webp",
    "/albums/wedding/wedding-009.webp",
    "/albums/wedding/wedding-010.webp",
    "/albums/wedding/wedding-011.webp",
  ],
  prewedding: ["/albums/prewedding/prewedding-001.webp", "/albums/prewedding/prewedding-002.webp", "/albums/prewedding/prewedding-003.webp"],
  events: ["/albums/events/events-001.webp", "/albums/events/events-002.webp", "/albums/wedding/wedding-012.webp"],
  legacy: {
    ganesh: "/images/legacy/ganesh-agrawal.webp",
    ashok: "/images/legacy/ashok-agrawal.webp",
    deepanshu: "/images/legacy/deepanshu-agrawal.webp",
  },
  services: {
    wedding: "/albums/wedding/wedding-001.webp",
    prewedding: "/albums/prewedding/prewedding-001.webp",
    events: "/albums/events/events-001.webp",
  },
  testimonials: [
    { name: "Anamika & Rajeev", photo: "/images/testimonials/photos/anamika-rajeev.webp", review: "/images/testimonials/reviews/anamika-rajeev.webp" },
    { name: "Ankit & Shivangi", photo: "/images/testimonials/photos/ankit-shivangi.webp", review: "/images/testimonials/reviews/ankit-shivangi.webp" },
    { name: "Ankit & Soumya", photo: "/images/testimonials/photos/ankit-soumya.webp", review: "/images/testimonials/reviews/ankit-soumya.webp" },
    { name: "Anmol & Ishita", photo: "/images/testimonials/photos/anmol-ishita.webp", review: "/images/testimonials/reviews/anmol-ishita.webp" },
    { name: "Garima & Rahul", photo: "/images/testimonials/photos/garima-rahul.webp", review: "/images/testimonials/reviews/garima-rahul.webp" },
    { name: "Jyoti & Parth", photo: "/images/testimonials/photos/jyoti-parth.webp", review: "/images/testimonials/reviews/jyoti-parth.webp" },
    { name: "Kalpit & Anuradha", photo: "/images/testimonials/photos/anuradha-kalpit.webp", review: "/images/testimonials/reviews/anuradha-kalpit.webp" },
    { name: "Kushagra & Prerana", photo: "/images/testimonials/photos/kushagra-prerana.webp", review: "/images/testimonials/reviews/kushagra-prerana.webp" },
    { name: "Mayuresh & Riddhi", photo: "/images/testimonials/photos/mayuresh-riddhi.webp", review: "/images/testimonials/reviews/mayuresh-riddhi.webp" },
    { name: "Palash & Keertika", photo: "/images/testimonials/photos/keertika-palash.webp", review: "/images/testimonials/reviews/keertika-palash.webp" },
    { name: "Prachi & Sarthak", photo: "/images/testimonials/photos/prachi-sarthak.webp", review: "/images/testimonials/reviews/prachi-sarthak.webp" },
    { name: "Rohan & Ritika", photo: "/images/testimonials/photos/ritika-rohan.webp", review: "/images/testimonials/reviews/ritika-rohan.webp" },
    { name: "Shreya & Siddharth", photo: "/images/testimonials/photos/shreya-siddharth.webp", review: "/images/testimonials/reviews/shreya-siddharth.webp" },
    { name: "Sudeep & Minakshi", photo: "/images/testimonials/photos/minakshi-sudeep.webp", review: "/images/testimonials/reviews/minakshi-sudeep.webp" },
    { name: "Tanya & Milan", photo: "/images/testimonials/photos/milan-tanya.webp", review: "/images/testimonials/reviews/milan-tanya.webp" },
  ],
} as const;
