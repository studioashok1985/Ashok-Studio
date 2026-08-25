"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { defaultContent, SiteContent } from "@/lib/content";
import { isAuthed, setAuthed } from "@/lib/auth";
import { dataUrlToBlob } from "@/lib/imageFile";

type EditContextValue = {
  content: SiteContent;
  isAuthenticated: boolean;
  isEditMode: boolean;
  dirty: boolean;
  setField: (path: string, value: string) => Promise<void>;
  persistMedia: (dataUrl: string, name: string) => Promise<string>;
  setGalleryItem: (id: string, field: "image" | "couple" | "location", value: string) => void;
  updateContent: (updater: (prev: SiteContent) => SiteContent) => void;
  save: () => Promise<void>;
  discard: () => void;
  resetToDefault: () => Promise<void>;
  enterEditMode: () => void;
  exitEditMode: () => void;
  logout: () => void;
};

const EditContext = createContext<EditContextValue | null>(null);

function getPath(obj: any, path: string) {
  return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), obj);
}

function setPath(obj: any, path: string, value: string) {
  const keys = path.split(".");
  const next = structuredClone(obj);
  let cursor = next;
  for (let i = 0; i < keys.length - 1; i++) {
    cursor = cursor[keys[i]];
  }
  cursor[keys[keys.length - 1]] = value;
  return next;
}

async function readError(response: Response) {
  const data = (await response.json().catch(() => null)) as { error?: string } | null;
  return data?.error || `Save failed (${response.status})`;
}

async function uploadDataUrl(dataUrl: string, name: string) {
  const blob = dataUrlToBlob(dataUrl);
  const form = new FormData();
  form.append("file", blob, `${name.replace(/[^a-z0-9]+/gi, "-") || "photo"}.jpg`);
  const response = await fetch("/api/upload", { method: "POST", body: form, credentials: "include" });
  const data = (await response.json().catch(() => null)) as { url?: string; error?: string } | null;
  if (!response.ok || !data?.url) {
    throw new Error(data?.error || "Could not upload this photo to the hosted website.");
  }
  return data.url;
}

async function persistValue(value: string, name: string) {
  if (!value.startsWith("data:")) return value;
  return uploadDataUrl(value, name);
}

export function EditProvider({
  children,
  initialContent,
}: {
  children: React.ReactNode;
  initialContent?: SiteContent;
}) {
  const start = initialContent || defaultContent;
  const [content, setContent] = useState<SiteContent>(start);
  const [savedContent, setSavedContent] = useState<SiteContent>(start);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [contentRes, sessionRes] = await Promise.all([
          fetch("/api/content", { cache: "no-store", credentials: "include" }),
          fetch("/api/session", { cache: "no-store", credentials: "include" }),
        ]);
        if (cancelled) return;
        if (contentRes.ok) {
          const published = (await contentRes.json()) as SiteContent;
          setSavedContent(published);
          setContent(published);
        }
        if (sessionRes.ok) {
          const session = (await sessionRes.json()) as { authenticated?: boolean };
          const ok = Boolean(session.authenticated);
          setIsAuthenticated(ok);
          setAuthed(ok);
        } else {
          setIsAuthenticated(isAuthed());
        }
      } catch {
        if (!cancelled) setIsAuthenticated(isAuthed());
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const persistMedia = useCallback((dataUrl: string, name: string) => persistValue(dataUrl, name), []);

  const setField = useCallback(async (path: string, value: string) => {
    const stored = await persistValue(value, path);
    setContent((prev) => setPath(prev, path, stored));
    setDirty(true);
  }, []);

  const updateContent = useCallback((updater: (prev: SiteContent) => SiteContent) => {
    setContent((prev) => updater(prev));
    setDirty(true);
  }, []);

  const setGalleryItem = useCallback(
    (id: string, field: "image" | "couple" | "location", value: string) => {
      void (async () => {
        const stored = field === "image" ? await persistValue(value, `gallery-${id}`) : value;
        setContent((prev) => {
          const next = structuredClone(prev);
          const item = next.gallery.items.find((g) => g.id === id);
          if (item) (item as any)[field] = stored;
          return next;
        });
        setDirty(true);
      })();
    },
    []
  );

  const save = useCallback(async () => {
    const response = await fetch("/api/content", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    if (!response.ok) throw new Error(await readError(response));
    const saved = (await response.json()) as SiteContent;
    setContent(saved);
    setSavedContent(saved);
    setDirty(false);
  }, [content]);

  const discard = useCallback(() => {
    setContent(savedContent);
    setDirty(false);
  }, [savedContent]);

  const resetToDefault = useCallback(async () => {
    const response = await fetch("/api/content", { method: "DELETE", credentials: "include" });
    if (!response.ok) throw new Error(await readError(response));
    const saved = (await response.json()) as SiteContent;
    setContent(saved);
    setSavedContent(saved);
    setDirty(false);
  }, []);

  const enterEditMode = useCallback(() => setIsEditMode(true), []);
  const exitEditMode = useCallback(() => {
    if (dirty) discard();
    setIsEditMode(false);
  }, [dirty, discard]);

  const logout = useCallback(() => {
    void fetch("/api/logout", { method: "POST", credentials: "include" });
    setAuthed(false);
    setIsAuthenticated(false);
    setIsEditMode(false);
  }, []);

  const value = useMemo(
    () => ({
      content,
      isAuthenticated,
      isEditMode,
      dirty,
      persistMedia,
      setField,
      setGalleryItem,
      updateContent,
      save,
      discard,
      resetToDefault,
      enterEditMode,
      exitEditMode,
      logout,
    }),
    [content, isAuthenticated, isEditMode, dirty, persistMedia, setField, setGalleryItem, updateContent, save, discard, resetToDefault, enterEditMode, exitEditMode, logout]
  );

  return <EditContext.Provider value={value}>{children}</EditContext.Provider>;
}

export function useEdit() {
  const ctx = useContext(EditContext);
  if (!ctx) throw new Error("useEdit must be used within EditProvider");
  return ctx;
}

export function useEditField(path: string) {
  const { content } = useEdit();
  return getPath(content, path) as string;
}

export function markAuthenticated() {
  setAuthed(true);
}
