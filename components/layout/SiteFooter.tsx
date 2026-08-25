"use client";

import Link from "next/link";
import { EditableText } from "@/components/edit/EditableText";
import { useEdit } from "@/components/edit/EditProvider";
import { instagramHref, socialHref, whatsappHref } from "@/lib/whatsapp";

export function SiteFooter() {
  const { content } = useEdit();

  return (
    <footer id="footer" className="border-t border-[var(--line)] bg-paper px-4 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-5 md:px-10">
      <div className="mx-auto flex max-w-8xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-ink">Ashok Studio Photography</p>
          <p className="kicker mt-3">
            <EditableText path="footer.tagline" as="span" />
          </p>
          <p className="mt-3 max-w-xs font-sans text-[11px] uppercase leading-relaxed tracking-[0.12em] text-muted">
            <EditableText path="contact.location" as="span" />
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-3 font-sans text-[11px] uppercase tracking-[0.14em] text-muted">
          <Link href="/wedding-photography" className="link-underline hover:text-ink">
            Work
          </Link>
          <Link href="/about" className="link-underline hover:text-ink">
            About
          </Link>
          <Link href="/services" className="link-underline hover:text-ink">
            Services
          </Link>
          <Link href="/pre-wedding-photography" className="link-underline hover:text-ink">
            Pre-wedding
          </Link>
          <Link href="/event-photography" className="link-underline hover:text-ink">
            Events
          </Link>
          <Link href="/contact" className="link-underline hover:text-ink">
            Contact
          </Link>
          <a href={whatsappHref(content.contact.whatsapp)} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-ink">
            WhatsApp
          </a>
          <a href={instagramHref(content.contact.instagram)} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-ink">
            Instagram
          </a>
          <a href={socialHref(content.contact.facebook)} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-ink">
            Facebook
          </a>
          <a href={socialHref(content.contact.youtube)} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-ink">
            YouTube
          </a>
          <Link href="/login" className="link-underline hover:text-ink">
            Login
          </Link>
        </nav>
      </div>
    </footer>
  );
}
