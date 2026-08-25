"use client";

import { EditableImage } from "@/components/edit/EditableImage";
import { useEdit } from "@/components/edit/EditProvider";
import { fileToEditableUrl } from "@/lib/imageFile";
import { ChevronLeft, ChevronRight, Plus, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type AlbumKey = "wedding" | "prewedding" | "events";

type Props = {
  title: string;
  albumKey: AlbumKey;
  onClose: () => void;
};

export function AlbumGallery({ title, albumKey, onClose }: Props) {
  const { content, isEditMode, setField, updateContent, persistMedia } = useEdit();
  const photos = content.albums[albumKey];
  const [selected, setSelected] = useState<number | null>(null);
  const [direction, setDirection] = useState<"next" | "previous">("next");
  const addInputRef = useRef<HTMLInputElement>(null);

  function showPrevious() {
    if (selected === null || !photos.length) return;
    setDirection("previous");
    setSelected((selected - 1 + photos.length) % photos.length);
  }

  function showNext() {
    if (selected === null || !photos.length) return;
    setDirection("next");
    setSelected((selected + 1) % photos.length);
  }

  function replacePhoto(index: number, src: string) {
    void setField(`albums.${albumKey}.${index}`, src);
  }

  function removePhoto(index: number) {
    updateContent((prev) => {
      const next = structuredClone(prev);
      next.albums[albumKey].splice(index, 1);
      return next;
    });
    setSelected((current) => {
      if (current === null) return current;
      if (photos.length <= 1) return null;
      if (current > index) return current - 1;
      if (current === index) return Math.min(current, photos.length - 2);
      return current;
    });
  }

  async function addPhotos(files: FileList | null) {
    if (!files?.length) return;
    const urls: string[] = [];
    for (const file of Array.from(files)) {
      try {
        urls.push(await persistMedia(await fileToEditableUrl(file), `${albumKey}-new`));
      } catch {
        // skip unread files
      }
    }
    if (!urls.length) return;
    updateContent((prev) => {
      const next = structuredClone(prev);
      next.albums[albumKey].push(...urls);
      return next;
    });
    if (addInputRef.current) addInputRef.current.value = "";
  }

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (selected !== null) setSelected(null);
        else onClose();
      }
      if (selected !== null && event.key === "ArrowLeft") {
        setDirection("previous");
        setSelected((current) => (current === null || !photos.length ? current : (current - 1 + photos.length) % photos.length));
      }
      if (selected !== null && event.key === "ArrowRight") {
        setDirection("next");
        setSelected((current) => (current === null || !photos.length ? current : (current + 1) % photos.length));
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, photos.length, selected]);

  return (
    <div
      className="fixed inset-0 z-[220] overflow-y-auto bg-paper"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} album`}
    >
      <header className="sticky top-0 z-20 border-b border-[var(--line)] bg-paper/95 px-4 py-4 backdrop-blur-md sm:px-5 sm:py-5 md:px-10">
        <div className="mx-auto flex max-w-8xl items-center justify-between gap-3 sm:gap-5">
          <div>
            <p className="kicker text-accent">Ashok Studio · Full album</p>
            <h2 className="mt-1 font-display text-2xl text-ink sm:text-3xl md:text-4xl">{title}</h2>
            {isEditMode && (
              <p className="mt-2 font-sans text-[11px] uppercase tracking-[0.14em] text-muted">
                Hover a photo to replace it · Use + to add · Save from the bottom bar
              </p>
            )}
          </div>
          <div className="flex items-center gap-5">
            <p className="hidden font-sans text-[10px] uppercase tracking-[0.16em] text-muted sm:block">
              {photos.length} photographs
            </p>
            <button
              type="button"
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] text-ink transition-colors duration-200 hover:bg-ink hover:text-paper"
              aria-label={`Close ${title} album`}
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-8xl px-4 py-8 sm:px-5 md:px-10 md:py-10">
        <p className="mx-auto mb-8 max-w-lg text-center font-display text-2xl leading-snug text-ink md:mb-10 md:text-3xl">
          {isEditMode ? "Replace, add, or remove photographs in this album." : "Select a photograph to view it full size."}
        </p>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:gap-5 lg:grid-cols-5">
          {photos.map((photo, index) => (
            <div key={`${photo.slice(0, 48)}-${index}`} className="group text-left">
              <div
                className="relative w-full cursor-pointer"
                onClick={() => {
                  setDirection("next");
                  setSelected(index);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelected(index);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Open ${title} photograph ${index + 1} full size`}
              >
                <span className="photo-zoom block aspect-square overflow-hidden rounded-[1.25rem] bg-soft">
                  <EditableImage
                    src={photo}
                    onChange={(value) => replacePhoto(index, value)}
                    alt={`${title} photograph ${index + 1}`}
                    className="h-full w-full"
                    sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 46vw"
                  />
                </span>
              </div>
              <div className="mt-3 flex items-center justify-center gap-2">
                <span className="kicker text-muted">{String(index + 1).padStart(2, "0")}</span>
                {isEditMode && (
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-muted transition-colors hover:bg-ink hover:text-paper"
                    aria-label={`Remove photograph ${index + 1}`}
                  >
                    <Trash2 size={13} />
                  </button>
                )}
              </div>
            </div>
          ))}

          {isEditMode && (
            <button
              type="button"
              onClick={() => addInputRef.current?.click()}
              className="flex aspect-square flex-col items-center justify-center gap-3 rounded-[1.25rem] border border-dashed border-[var(--line)] bg-soft text-muted transition-colors hover:border-ink hover:text-ink"
              aria-label="Add photographs to album"
            >
              <Plus size={22} />
              <span className="font-sans text-[10px] uppercase tracking-[0.16em]">Add photos</span>
            </button>
          )}
        </div>
        <input
          ref={addInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => addPhotos(e.target.files)}
        />
      </div>

      {selected !== null && photos[selected] && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-black/95 p-3 pb-28 md:p-8 md:pb-24"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} full size photograph ${selected + 1}`}
        >
          <div
            key={`${selected}-${direction}`}
            className={`relative z-10 h-full w-full ${direction === "next" ? "album-image-next" : "album-image-previous"}`}
          >
            <EditableImage
              src={photos[selected]}
              onChange={(value) => replacePhoto(selected, value)}
              alt={`${title} full size photograph ${selected + 1}`}
              className="h-full w-full bg-transparent"
              sizes="100vw"
              fit="contain"
              priority
            />
          </div>

          <button
            type="button"
            onClick={() => setSelected(null)}
            className="absolute right-4 top-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink shadow-xl ring-1 ring-black/10 transition-transform hover:scale-105 md:right-8 md:top-8"
            aria-label="Close full size photograph"
          >
            <X size={20} />
          </button>
          <div className="absolute bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white p-1.5 text-ink shadow-2xl ring-1 ring-black/10 md:bottom-7">
            <button
              type="button"
              onClick={showPrevious}
              className="flex h-12 w-12 items-center justify-center rounded-full transition-colors hover:bg-soft"
              aria-label="Previous photograph"
            >
              <ChevronLeft size={24} strokeWidth={1.8} />
            </button>
            <p className="min-w-[5.5rem] text-center font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-ink">
              {String(selected + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
            </p>
            <button
              type="button"
              onClick={showNext}
              className="flex h-12 w-12 items-center justify-center rounded-full transition-colors hover:bg-soft"
              aria-label="Next photograph"
            >
              <ChevronRight size={24} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
