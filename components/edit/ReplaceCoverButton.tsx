"use client";

import { useRef, useState } from "react";
import { Pencil } from "lucide-react";
import { useEdit } from "./EditProvider";
import { fileToEditableUrl } from "@/lib/imageFile";

type Props = {
  onChange: (dataUrl: string) => void | Promise<void>;
  label?: string;
};

export function ReplaceCoverButton({ onChange, label = "Change cover photo" }: Props) {
  const { isEditMode } = useEdit();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");

  if (!isEditMode) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="absolute right-4 top-[calc(5.25rem+env(safe-area-inset-top,0px))] z-30 flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.14em] text-paper shadow-xl lg:right-8 lg:top-24"
      >
        <Pencil size={14} className="text-accent" />
        {busy ? "Updating…" : status || label}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/heic,image/heif,image/*"
        className="hidden"
        onChange={async (event) => {
          const file = event.target.files?.[0];
          if (!file) return;
          setBusy(true);
          setStatus("");
          try {
            await onChange(await fileToEditableUrl(file, 1600));
            setStatus("Cover updated");
            window.setTimeout(() => setStatus(""), 2500);
          } catch (error) {
            alert(error instanceof Error ? error.message : "Could not use this photo. Please choose a JPG or PNG.");
          } finally {
            setBusy(false);
            if (inputRef.current) inputRef.current.value = "";
          }
        }}
      />
    </>
  );
}
