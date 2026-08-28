"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useEdit } from "@/components/edit/EditProvider";

const LINKS = [
  { href: "/wedding-photography", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/#legacy", label: "Legacy" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { isAuthenticated, isEditMode } = useEdit();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-[100] pt-[env(safe-area-inset-top)] transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open
          ? "border-b border-[var(--line)] bg-[rgba(248,246,241,0.92)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-8xl items-center justify-between gap-3 px-4 py-3 sm:gap-6 sm:px-5 sm:py-4 md:px-10">
        <Link
          href="/"
          className="flex items-center gap-2 md:gap-3"
          onClick={(event) => {
            if (isEditMode) event.preventDefault();
            setOpen(false);
          }}
        >
          <Image src="/logo.png" alt="Ashok Studio Logo" width={24} height={24} className="h-6 w-auto md:h-8" />
          <span className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-ink">
            Ashok Studio
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="link-underline font-sans text-[11px] uppercase tracking-[0.16em] text-ink/75"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-5 lg:flex">
          <Link href="/login" className="font-sans text-[10px] uppercase tracking-[0.16em] text-muted">
            {isAuthenticated ? "Edit" : "Login"}
          </Link>
          <Link href="/contact" className="font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-ink">
            Book your date
          </Link>
        </div>

        <button
          type="button"
          className="font-sans text-[11px] uppercase tracking-[0.16em] text-ink lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <div className="max-h-[calc(100svh-4.5rem)] overflow-y-auto border-t border-[var(--line)] bg-paper px-4 py-8 sm:px-5 lg:hidden">
          <div className="flex flex-col gap-4">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl text-ink"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)} className="mt-4 btn-primary w-fit">
              Book your date
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
