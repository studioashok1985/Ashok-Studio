# Ashok Studio — Website

A cinematic, editable Next.js site for Ashok Studio (fine art wedding photography, Ashok & Deepanshu Agrawal).

## Stack

Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · Framer Motion · GSAP · React Three Fiber / Three.js · Lenis smooth scroll · Lucide icons.

## Getting started

```bash
npm install
cp .env.local.example .env.local   # then edit the password inside
npm run dev
```

Open http://localhost:3000.

## Editing the site (no code required)

1. Go to `/login` (also linked in the nav as "Studio Login").
2. Enter the password from `.env.local` (`NEXT_PUBLIC_ADMIN_PASSWORD`).
3. You'll return to the homepage with a small **"Edit this page"** button
   bottom-center. Click it.
4. Any headline, paragraph, or caption with a dashed outline on hover is
   editable — click into it and type. Any photo shows **"Replace photo"**
   on hover — click it to upload a new one.
5. Click **Save** in the toolbar to keep your changes, or **Exit** to
   discard them. **Reset** wipes all edits back to the original content.

Edits are stored in the visitor's browser (`localStorage`), so they persist
on your device/browser across visits, but are **not** shared with other
devices or visitors automatically. That's fine for a single owner
editing from one laptop. If you want edits saved centrally so everyone
sees the same content, see "Going further" below.

## Replacing the owner photo

The father–son portrait for the About section couldn't be converted from
the original file you supplied (`IMG_2310.HEIC` — iPhone's HEIC format
isn't readable in this build environment). A wedding photo is used as a
placeholder in `lib/content.ts` (`studio.image`) — swap it for the real
portrait either by editing that file directly, or by logging in and using
"Replace photo" on the About section once the site is running locally.

## Project structure

```
app/                 Routes (home, /login), layout, global styles, metadata
components/
  home/              Hero, Studio, Process, Gallery, Contact sections
  layout/            Navbar, Footer, smooth-scroll wrapper
  edit/              The editable-CMS system (provider, editable text/image, toolbar)
  ui/                 Button, Container, scroll-reveal wrapper
lib/
  content.ts         All default site copy + the gallery list (types included)
  auth.ts             Client-side password gate for edit mode
public/images/        Optimized photos (logo + featured weddings)
```

## Going further (production hardening)

This ships as a fast, good-looking, fully client-side site so it can run
anywhere with zero backend. Two things are intentionally simplified and
worth upgrading before a real launch:

- **Auth** (`lib/auth.ts`): currently a single shared password checked in
  the browser. Swap for NextAuth.js, Clerk, or Supabase Auth if you want
  real accounts, or just keep it as a quick "family gate" if only Ashok
  and Deepanshu ever need to edit.
- **Content storage** (`components/edit/EditProvider.tsx`): currently
  `localStorage`, per browser. To make edits show up for every visitor,
  connect this to a small backend (a single database table holding the
  JSON content object is enough — Supabase, Firebase, or a couple of API
  routes backed by Postgres all work) and swap `save()`/the initial
  `useEffect` fetch for API calls.

## Performance & accessibility notes

- Images are served through `next/image` (AVIF/WebP, responsive `sizes`).
- All animation respects `prefers-reduced-motion`.
- Focus states are visible (`:focus-visible`) and interactive elements
  are real `button`/`a`/`input` elements throughout.
- Headings are in document order (`h1` → `h2` → `h3`) for screen readers
  and SEO.
