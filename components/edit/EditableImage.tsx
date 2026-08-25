"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useEdit } from "./EditProvider";
import { fileToEditableUrl } from "@/lib/imageFile";
import { displayImageSrc, isInlineImage, isRemoteImage } from "@/lib/media";
import { Pencil } from "lucide-react";
import clsx from "clsx";

type Props = {
  src: string;
  onChange: (dataUrl: string) => void | Promise<void>;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  unoptimized?: boolean;
  fit?: "cover" | "contain";
  objectPosition?: string;
  hint?: string;
  showBadge?: boolean;
};

export function EditableImage({
  src,
  onChange,
  alt,
  className,
  imageClassName,
  sizes,
  priority,
  quality = 90,
  unoptimized = false,
  fit = "cover",
  objectPosition,
  hint = "Replace photo",
  showBadge = true,
}: Props) {
  const { isEditMode } = useEdit();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const imageSrc = displayImageSrc(src);
  const inline = isInlineImage(imageSrc);
  const fitClass = imageClassName ? imageClassName : fit === "contain" ? "object-contain" : "object-cover";
  const imageStyle = objectPosition ? { objectPosition } : undefined;

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    try {
      await onChange(await fileToEditableUrl(file));
    } catch (error) {
      alert(error instanceof Error ? error.message : "Could not use this photo. Please choose a JPG or PNG.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className={clsx("relative overflow-hidden", isEditMode && "editable-image", className)}>
      {inline ? (
        // next/image rejects large data URLs; covers must render from the saved file.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageSrc} alt={alt} className={clsx("absolute inset-0 h-full w-full max-w-none", fitClass)} style={imageStyle} />
      ) : (
        <Image
          src={imageSrc}
          alt={alt}
          fill
          sizes={sizes || "100vw"}
          priority={priority}
          quality={quality}
          className={fitClass}
          style={imageStyle}
          unoptimized={unoptimized || isRemoteImage(imageSrc)}
        />
      )}
      {isEditMode && (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              inputRef.current?.click();
            }}
            className="edit-image-hint absolute inset-0 z-10 flex items-center justify-center gap-2 bg-ink/55 text-paper opacity-0 transition-opacity duration-200 hover:opacity-100"
            aria-label={`Replace image: ${alt}`}
          >
            <Pencil size={18} className="text-accent" />
            <span className="text-sm tracking-wide">{busy ? "Saving…" : hint}</span>
          </button>
          {showBadge && (
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                inputRef.current?.click();
              }}
              className="absolute right-3 top-3 z-20 flex items-center gap-1.5 rounded-full bg-ink px-3 py-2 text-[10px] font-medium uppercase tracking-[0.14em] text-paper shadow-lg"
              aria-label={`Replace image: ${alt}`}
            >
              <Pencil size={12} className="text-accent" />
              {busy ? "Saving…" : hint}
            </button>
          )}
        </>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
            onChange={async (e) => {
              try {
                await handleFile(e.target.files?.[0]);
              } catch (error) {
                alert(error instanceof Error ? error.message : "Could not use this photo. Please choose a JPG or PNG.");
              }
            }}
      />
    </div>
  );
}
