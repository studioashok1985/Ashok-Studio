"use client";

import { EditableImage } from "@/components/edit/EditableImage";
import { useEdit } from "@/components/edit/EditProvider";
import { Reveal } from "@/components/ui/Reveal";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export function FeaturedStory() {
  const { content, setField } = useEdit();
  const [active, setActive] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const slides = useMemo(
    () => Array.from(new Set([content.featured.image, ...content.weddings.images])),
    [content.featured.image, content.weddings.images]
  );
  const activeSrc = slides[active] || content.featured.image;

  function previous() {
    setActive((current) => (current - 1 + slides.length) % slides.length);
  }

  function next() {
    setActive((current) => (current + 1) % slides.length);
  }

  useEffect(() => {
    if (!fullscreen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFullscreen(false);
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [fullscreen, slides.length]);

  return (
    <section id="featured" className="bg-paper px-4 py-6 sm:px-5 md:px-10 md:py-8">
      <div className="mx-auto max-w-8xl">
        <Reveal variant="clip">
          <div className="group photo-zoom relative aspect-[4/5] w-full sm:aspect-auto sm:h-[58svh] sm:min-h-[360px] md:h-[72svh] md:min-h-[560px]">
              <EditableImage
                src={activeSrc}
                onChange={(value) => {
                  if (activeSrc === content.featured.image) {
                    setField("featured.image", value);
                    return;
                  }
                  const weddingIndex = content.weddings.images.indexOf(activeSrc);
                  if (weddingIndex >= 0) setField(`weddings.images.${weddingIndex}`, value);
                }}
                alt="Featured wedding photograph"
                className="h-full w-full"
                sizes="100vw"
              />

              <div className="media-nav absolute bottom-3 left-1/2 z-20 max-w-[calc(100%-1.5rem)] -translate-x-1/2 md:bottom-6">
                <button
                  type="button"
                  onClick={previous}
                  className="flex h-12 w-12 items-center justify-center rounded-full transition-colors hover:bg-soft"
                  aria-label="Previous photograph"
                >
                  <ChevronLeft size={24} strokeWidth={1.8} />
                </button>
                <p className="min-w-[5.5rem] text-center font-sans text-[11px] font-medium uppercase tracking-[0.14em]">
                  {String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                </p>
                <button
                  type="button"
                  onClick={next}
                  className="flex h-12 w-12 items-center justify-center rounded-full transition-colors hover:bg-soft"
                  aria-label="Next photograph"
                >
                  <ChevronRight size={24} strokeWidth={1.8} />
                </button>
                <button
                  type="button"
                  onClick={() => setFullscreen(true)}
                  className="ml-1 flex h-12 items-center gap-2 rounded-full px-4 font-sans text-[10px] font-medium uppercase tracking-[0.14em] transition-colors hover:bg-soft"
                  aria-label="Open full size photograph"
                >
                  <Maximize2 size={14} />
                  <span className="hidden sm:inline">Full size</span>
                </button>
              </div>
            </div>
        </Reveal>
      </div>

      {fullscreen && (
        <div
          className="fixed inset-0 z-[250] flex items-center justify-center bg-black/95 p-3 pb-28 md:p-8 md:pb-24"
          role="dialog"
          aria-modal="true"
          aria-label="Full size photograph"
        >
          <EditableImage
            src={activeSrc}
            onChange={(value) => {
              if (activeSrc === content.featured.image) {
                setField("featured.image", value);
                return;
              }
              const weddingIndex = content.weddings.images.indexOf(activeSrc);
              if (weddingIndex >= 0) setField(`weddings.images.${weddingIndex}`, value);
            }}
            alt="Full size photograph"
            className="h-full w-full bg-transparent"
            sizes="100vw"
            fit="contain"
            priority
          />
          <button
            type="button"
            onClick={() => setFullscreen(false)}
            className="absolute right-4 top-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink shadow-xl md:right-8 md:top-8"
            aria-label="Close full size photograph"
          >
            <X size={20} />
          </button>
          <div className="media-nav absolute bottom-5 left-1/2 z-50 -translate-x-1/2 md:bottom-7">
            <button
              type="button"
              onClick={previous}
              className="flex h-12 w-12 items-center justify-center rounded-full transition-colors hover:bg-soft"
              aria-label="Previous photograph"
            >
              <ChevronLeft size={24} strokeWidth={1.8} />
            </button>
            <p className="min-w-[5.5rem] text-center font-sans text-[11px] font-medium uppercase tracking-[0.14em]">
              {String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </p>
            <button
              type="button"
              onClick={next}
              className="flex h-12 w-12 items-center justify-center rounded-full transition-colors hover:bg-soft"
              aria-label="Next photograph"
            >
              <ChevronRight size={24} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
