"use client";

import { EditableImage } from "@/components/edit/EditableImage";
import { EditableText } from "@/components/edit/EditableText";
import { ReplaceCoverButton } from "@/components/edit/ReplaceCoverButton";
import { useEdit } from "@/components/edit/EditProvider";
import { whatsappHref } from "@/lib/whatsapp";

export function FinalCta() {
  const { content, setField, isEditMode } = useEdit();
  const whatsapp = whatsappHref(content.contact.whatsapp);

  return (
    <section id="cta" className="relative overflow-hidden bg-soft lg:min-h-[88svh]">
      <div className="relative aspect-[16/9] w-full lg:absolute lg:inset-0 lg:aspect-auto lg:h-full">
        <EditableImage
          src={content.cta.image}
          onChange={(v) => setField("cta.image", v)}
          alt="Couple photographed for a wedding in Jabalpur — Ashok Studio"
          className="h-full w-full"
          imageClassName="fit-mobile-contain"
          sizes="100vw"
          quality={95}
          unoptimized
          objectPosition="center 42%"
          hint="Change cover"
          showBadge={false}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-paper via-paper/35 to-transparent lg:bg-gradient-to-r lg:from-paper/50 lg:via-paper/10 lg:to-transparent" />
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-b from-paper/40 via-transparent to-transparent lg:block" />
      </div>

      <ReplaceCoverButton onChange={(value) => setField("cta.image", value)} label="Change cover photo" />

      <div
        className={`relative z-10 mx-auto flex w-full max-w-8xl flex-col px-4 pb-10 pt-6 sm:px-5 md:px-10 lg:min-h-[88svh] lg:pb-12 lg:pt-28 ${
          isEditMode ? "pointer-events-none" : ""
        }`}
      >
        <div className="pointer-events-auto">
          <h2 className="display whitespace-pre-line max-w-3xl text-[clamp(2rem,8vw,5rem)] text-ink">
            <EditableText path="cta.title" as="span" multiline />
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/80 sm:mt-5 sm:text-lg md:text-xl">
            <EditableText path="cta.body" as="span" multiline />
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap">
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary w-full sm:w-auto">
              <EditableText path="cta.primary" as="span" />
            </a>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost w-full justify-center border border-ink/20 bg-white/70 px-5 py-3 backdrop-blur-sm sm:w-auto sm:justify-start"
            >
              <EditableText path="cta.secondary" as="span" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
