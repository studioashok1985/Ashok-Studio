"use client";

import { EditableImage } from "@/components/edit/EditableImage";
import { EditableText } from "@/components/edit/EditableText";
import { ReplaceCoverButton } from "@/components/edit/ReplaceCoverButton";
import { useEdit } from "@/components/edit/EditProvider";

export function Hero() {
  const { content, setField, isEditMode } = useEdit();

  return (
    <section id="hero" className="hero-safe relative bg-soft lg:min-h-[100svh] lg:overflow-hidden">
      <div className="relative aspect-[1024/625] w-full lg:absolute lg:inset-0 lg:aspect-auto lg:h-full">
        <EditableImage
          src={content.hero.image}
          onChange={(v) => setField("hero.image", v)}
          alt="Bride and groom in traditional Indian wedding attire, photographed by Ashok Studio in Jabalpur"
          className="h-full w-full"
          imageClassName="fit-mobile-contain"
          sizes="100vw"
          priority
          quality={95}
          unoptimized
          objectPosition="center"
          hint="Change cover"
          showBadge={false}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-paper via-paper/20 to-transparent lg:from-white/55 lg:via-transparent lg:to-black/5" />
      </div>

      <ReplaceCoverButton onChange={(value) => setField("hero.image", value)} />

      <div
        className={`relative z-10 mx-auto flex w-full max-w-8xl flex-col gap-8 px-4 pb-8 pt-5 sm:px-5 md:px-10 lg:min-h-[100svh] lg:justify-between lg:gap-6 lg:pb-10 lg:pt-28 ${
          isEditMode ? "pointer-events-none" : ""
        }`}
      >
        <div className="pointer-events-auto">
          <p className="kicker mb-3 text-ink/80">
            <EditableText path="hero.eyebrow" as="span" />
          </p>
          <h1 className="display max-w-5xl text-[clamp(1.85rem,7.2vw,4.4rem)] text-ink">
            <span className="block">
              <EditableText path="hero.line1" as="span" />
            </span>
            <span className="mt-1 block">
              <EditableText path="hero.line2" as="span" />
            </span>
          </h1>
        </div>

        <div className="pointer-events-auto flex flex-col items-start justify-between gap-5 border-t border-black/20 pt-5 sm:flex-row sm:items-end sm:gap-6 lg:mt-auto">
          <p className="max-w-full font-sans text-[12px] font-semibold uppercase leading-relaxed tracking-[0.16em] text-black sm:text-[16px] sm:tracking-[0.24em] md:text-[20px] md:tracking-[0.28em]">
            <EditableText path="hero.services" as="span" />
          </p>
          <div>
            <a
              href="#weddings"
              className="link-underline font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-black md:text-[15px] md:tracking-[0.2em]"
            >
              <EditableText path="hero.cta" as="span" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
