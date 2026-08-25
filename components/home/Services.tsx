"use client";

import { useState } from "react";
import { EditableImage } from "@/components/edit/EditableImage";
import { EditableText } from "@/components/edit/EditableText";
import { useEdit } from "@/components/edit/EditProvider";
import { AlbumGallery } from "@/components/gallery/AlbumGallery";
import { Reveal } from "@/components/ui/Reveal";

const ALBUM_KEYS = ["wedding", "prewedding", "events"] as const;

export function Services() {
  const { content, setField, isEditMode } = useEdit();
  const [openAlbum, setOpenAlbum] = useState<(typeof ALBUM_KEYS)[number] | null>(null);

  return (
    <section id="services" className="bg-paper px-4 py-10 sm:px-5 md:px-10 md:py-14">
      <div className="mx-auto max-w-8xl">
        <Reveal>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="kicker mb-3">
                <EditableText path="services.eyebrow" />
              </p>
              <h2 className="display text-[clamp(1.9rem,7vw,4rem)] text-ink">
                <EditableText path="services.title" />
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted md:text-right md:text-base">
              Weddings, pre-weddings, and event photography in Jabalpur.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {content.services.items.map((item, i) => (
            <Reveal key={item.id} delayMs={i * 80}>
              <article
                className="group cursor-pointer"
                tabIndex={isEditMode ? -1 : 0}
                role="button"
                aria-label={`Open ${item.title} album`}
                onClick={() => {
                  if (isEditMode) return;
                  setOpenAlbum(ALBUM_KEYS[i]);
                }}
                onKeyDown={(event) => {
                  if (isEditMode) return;
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setOpenAlbum(ALBUM_KEYS[i]);
                  }
                }}
              >
                <div className="photo-zoom relative aspect-[3/4] w-full">
                  <EditableImage
                    src={item.image}
                    onChange={(value) => setField(`services.items.${i}.image`, value)}
                    alt={`${item.title} cover`}
                    className="h-full w-full"
                    sizes="(min-width:1024px) 30vw, (min-width:640px) 50vw, 100vw"
                    hint="Replace cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-100 transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100" />
                  <span className="pointer-events-none absolute bottom-5 left-5 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-white opacity-100 transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100">
                    View album →
                  </span>
                </div>
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="kicker shrink-0">{item.number}</span>
                  <h3 className="display text-[1.75rem] uppercase tracking-[0.04em] text-ink md:text-[2rem]">
                    <EditableText path={`services.items.${i}.title`} />
                  </h3>
                </div>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted md:text-base">
                  <EditableText path={`services.items.${i}.body`} />
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {openAlbum && (
        <AlbumGallery
          title={content.services.items[ALBUM_KEYS.indexOf(openAlbum)]?.title || "Album"}
          albumKey={openAlbum}
          onClose={() => setOpenAlbum(null)}
        />
      )}
    </section>
  );
}
