"use client";

import { EditableImage } from "@/components/edit/EditableImage";
import { EditableText } from "@/components/edit/EditableText";
import { useEdit } from "@/components/edit/EditProvider";
import { AlbumGallery } from "@/components/gallery/AlbumGallery";
import { Reveal } from "@/components/ui/Reveal";
import { useState } from "react";

const LAYOUT = [
  { column: "md:col-span-8", frame: "aspect-[3/2]" },
  { column: "md:col-span-4 md:mt-16", frame: "aspect-[4/5]" },
  { column: "md:col-span-10 md:col-start-2", frame: "aspect-[3/2]" },
];

export function Events() {
  const { content, setField, isEditMode } = useEdit();
  const [albumOpen, setAlbumOpen] = useState(false);

  return (
    <section id="events" className="bg-paper px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-8xl">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="kicker mb-5">
                <EditableText path="events.eyebrow" />
              </p>
              <h2 className="display whitespace-pre-line max-w-3xl text-[clamp(2.2rem,5vw,4rem)] text-ink">
                <EditableText path="events.title" as="span" multiline />
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setAlbumOpen(true)}
              className="link-underline w-fit font-sans text-[11px] uppercase tracking-[0.16em] text-ink"
            >
              View full album
            </button>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
          {content.events.images.map((src, i) => (
            <Reveal key={`${src}-${i}`} variant="clip" delayMs={i * 70} className={LAYOUT[i]?.column || "md:col-span-6"}>
              <div
                className="group w-full cursor-pointer text-left"
                onClick={() => {
                  if (!isEditMode) setAlbumOpen(true);
                }}
                role={isEditMode ? undefined : "button"}
                tabIndex={isEditMode ? undefined : 0}
                onKeyDown={(event) => {
                  if (isEditMode) return;
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setAlbumOpen(true);
                  }
                }}
                aria-label="Open events album"
              >
                <div className={`photo-zoom w-full ${LAYOUT[i]?.frame || "aspect-[3/2]"}`}>
                  <EditableImage
                    src={src}
                    onChange={(value) => setField(`events.images.${i}`, value)}
                    alt="Event photograph"
                    className="h-full w-full"
                    sizes="(min-width:768px) 66vw, 100vw"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {albumOpen && (
        <AlbumGallery title="Events" albumKey="events" onClose={() => setAlbumOpen(false)} />
      )}
    </section>
  );
}
