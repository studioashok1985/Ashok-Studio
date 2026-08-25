"use client";

import { AlbumGallery } from "@/components/gallery/AlbumGallery";
import { useEdit } from "@/components/edit/EditProvider";
import { Reveal } from "@/components/ui/Reveal";
import { EditableImage } from "@/components/edit/EditableImage";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

const ALBUMS = [
  {
    key: "wedding",
    number: "01",
    title: "Wedding Album",
    description: "Ceremonies, celebrations, portraits, and every quiet moment in between.",
  },
  {
    key: "prewedding",
    number: "02",
    title: "Pre-wedding Album",
    description: "Romantic stories photographed before the wedding celebrations begin.",
  },
] as const;

type AlbumKey = (typeof ALBUMS)[number]["key"];

export function Albums() {
  const { content, setField } = useEdit();
  const [openAlbum, setOpenAlbum] = useState<AlbumKey | null>(null);
  const selectedAlbum = ALBUMS.find((album) => album.key === openAlbum);

  return (
    <section id="albums" className="bg-paper px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-8xl">
        <Reveal>
          <p className="kicker mb-5">Full photography albums</p>
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <h2 className="display max-w-3xl text-[clamp(2.2rem,5vw,4rem)] text-ink">
              Explore every photograph.
            </h2>
            <p className="max-w-md text-base leading-relaxed text-muted">
              Open a collection and select any photograph to view it full size.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-2 md:gap-10">
          {ALBUMS.map((album, index) => {
            const photos = content.albums[album.key];
            return (
              <Reveal key={album.key} variant="clip" delayMs={index * 100}>
                <button
                  type="button"
                  onClick={() => setOpenAlbum(album.key)}
                  className="group block w-full text-left"
                  aria-label={`Open ${album.title}`}
                >
                  <span className="photo-zoom relative block aspect-[4/3] overflow-hidden bg-soft md:aspect-[5/4]">
                    <EditableImage
                      src={photos[0] || content.featured.image}
                      onChange={(value) => {
                        if (photos[0]) setField(`albums.${album.key}.0`, value);
                      }}
                      alt={`${album.title} cover`}
                      className="h-full w-full"
                      sizes="(min-width: 768px) 50vw, 100vw"
                      hint="Replace cover"
                    />
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    <span className="pointer-events-none absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white md:bottom-7 md:left-7 md:right-7">
                      <span>
                        <span className="block font-sans text-[10px] uppercase tracking-[0.18em] text-white/80">
                          {photos.length} photographs
                        </span>
                        <span className="mt-2 block font-display text-3xl md:text-4xl">{album.title}</span>
                      </span>
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-ink transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
                        <ArrowUpRight size={20} />
                      </span>
                    </span>
                  </span>
                  <span className="grid gap-3 border-b border-[var(--line)] py-5 md:grid-cols-12">
                    <span className="kicker text-accent md:col-span-2">{album.number}</span>
                    <span className="text-sm leading-relaxed text-muted md:col-span-7">{album.description}</span>
                    <span className="link-underline justify-self-start font-sans text-[10px] font-medium uppercase tracking-[0.16em] text-ink md:col-span-3 md:justify-self-end">
                      View full album
                    </span>
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>

      {openAlbum && selectedAlbum && (
        <AlbumGallery title={selectedAlbum.title} albumKey={openAlbum} onClose={() => setOpenAlbum(null)} />
      )}
    </section>
  );
}
