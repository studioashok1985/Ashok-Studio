"use client";

import { EditableImage } from "@/components/edit/EditableImage";
import { EditableText } from "@/components/edit/EditableText";
import { useEdit } from "@/components/edit/EditProvider";
import { AlbumGallery } from "@/components/gallery/AlbumGallery";
import { Reveal } from "@/components/ui/Reveal";
import { useState } from "react";

const LAYOUT = [
  { column: "md:col-span-5", frame: "aspect-[4/5]" },
  { column: "md:col-span-7", frame: "aspect-[3/2]" },
  { column: "md:col-span-4", frame: "aspect-[4/5]" },
  { column: "md:col-span-8", frame: "aspect-[3/2]" },
  { column: "md:col-span-5", frame: "aspect-[4/5]" },
  { column: "md:col-span-7", frame: "aspect-[3/2]" },
];

export function Weddings() {
  const { content, setField, isEditMode } = useEdit();
  const [albumOpen, setAlbumOpen] = useState(false);
  const images = content.weddings.images;

  return (
    <section id="weddings" className="bg-soft px-4 py-10 sm:px-5 md:px-10 md:py-12">
      <div className="mx-auto max-w-8xl">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="kicker mb-3">
                <EditableText path="weddings.eyebrow" />
              </p>
              <h2 className="display max-w-3xl text-[clamp(1.9rem,7vw,4rem)] text-ink">
                <EditableText path="weddings.title" />
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

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
          {images.map((src, i) => (
            <Reveal
              key={`${src}-${i}`}
              variant="clip"
              delayMs={(i % 2) * 80}
              className={LAYOUT[i]?.column || "md:col-span-6"}
            >
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
                aria-label="Open wedding album"
              >
                <div className={`photo-zoom w-full ${LAYOUT[i]?.frame || "aspect-[3/2]"}`}>
                  <EditableImage
                    src={src}
                    onChange={(value) => setField(`weddings.images.${i}`, value)}
                    alt="Wedding photograph"
                    className="h-full w-full"
                    sizes="(min-width:768px) 58vw, 100vw"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {albumOpen && (
        <AlbumGallery title="Wedding" albumKey="wedding" onClose={() => setAlbumOpen(false)} />
      )}
    </section>
  );
}
