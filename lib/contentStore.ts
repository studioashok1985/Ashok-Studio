import { defaultContent, SiteContent } from "./content";
import { dataUrlToBlob } from "./imageFile";

const DB_NAME = "ashokstudio";
const DB_VERSION = 2;
const STORE_NAME = "kv";
const MEDIA_STORE = "media";
const RECORD_KEY = "content:v31";
const LEGACY_KEYS = ["ashokstudio:content:v30", "ashokstudio:content:v29", "ashokstudio:content:v28", "ashokstudio:content:v27"];

export type CoverSlot = "hero" | "cta";

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) db.createObjectStore(STORE_NAME);
      if (!db.objectStoreNames.contains(MEDIA_STORE)) db.createObjectStore(MEDIA_STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function storeGet<T>(db: IDBDatabase, storeName: string, key: string) {
  return new Promise<T | undefined>((resolve, reject) => {
    const request = db.transaction(storeName, "readonly").objectStore(storeName).get(key);
    request.onsuccess = () => resolve(request.result as T | undefined);
    request.onerror = () => reject(request.error);
  });
}

function storePut(db: IDBDatabase, storeName: string, key: string, value: unknown) {
  return new Promise<void>((resolve, reject) => {
    const request = db.transaction(storeName, "readwrite").objectStore(storeName).put(value, key);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

function storeDelete(db: IDBDatabase, storeName: string, key: string) {
  return new Promise<void>((resolve, reject) => {
    const request = db.transaction(storeName, "readwrite").objectStore(storeName).delete(key);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

function blobToDataUrl(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject(new Error("Could not read saved photo"));
    };
    reader.onerror = () => reject(reader.error || new Error("Could not read saved photo"));
    reader.readAsDataURL(blob);
  });
}

export function mergeContent(stored: unknown, defaults: SiteContent = defaultContent): SiteContent {
  const merge = (current: unknown, fallback: unknown): unknown => {
    if (Array.isArray(fallback)) {
      if (!Array.isArray(current)) return fallback;
      if (fallback[0] && typeof fallback[0] === "object" && !Array.isArray(fallback[0])) {
        return fallback.map((item, index) => merge(current[index], item));
      }
      return current;
    }
    if (fallback && typeof fallback === "object") {
      const source = current && typeof current === "object" ? (current as Record<string, unknown>) : {};
      const next: Record<string, unknown> = {};
      for (const key of Object.keys(fallback as object)) {
        next[key] = merge(source[key], (fallback as Record<string, unknown>)[key]);
      }
      return next;
    }
    return current === undefined ? fallback : current;
  };

  return merge(stored, defaults) as SiteContent;
}

function withOfficialSocials(content: SiteContent): SiteContent {
  const instagram = content.contact.instagram || "";
  const needsUpdate =
    !content.contact.facebook ||
    !content.contact.youtube ||
    !content.contact.whatsapp ||
    instagram.startsWith("@") ||
    instagram.includes("ashokstudio.photography");

  if (!needsUpdate) return content;

  return {
    ...content,
    contact: {
      ...content.contact,
      instagram: defaultContent.contact.instagram,
      facebook: defaultContent.contact.facebook,
      youtube: defaultContent.contact.youtube,
      whatsapp: defaultContent.contact.whatsapp,
    },
  };
}

export async function saveCoverImage(slot: CoverSlot, src: string) {
  const db = await openDb();
  try {
    if (src.startsWith("data:")) {
      await storePut(db, MEDIA_STORE, slot, dataUrlToBlob(src));
      return;
    }
    if (src.startsWith("/") || src.startsWith("http")) {
      await storeDelete(db, MEDIA_STORE, slot);
    }
  } finally {
    db.close();
  }
}

async function readCoverImage(db: IDBDatabase, slot: CoverSlot) {
  const stored = await storeGet<Blob | string>(db, MEDIA_STORE, slot);
  if (!stored) return null;
  if (typeof stored === "string") {
    if (stored.startsWith("data:") || stored.startsWith("/")) return stored;
    return null;
  }
  if (stored instanceof Blob && stored.size > 0) return blobToDataUrl(stored);
  return null;
}

async function applySavedCovers(content: SiteContent) {
  try {
    const db = await openDb();
    try {
      const hero = await readCoverImage(db, "hero");
      const cta = await readCoverImage(db, "cta");
      if (hero) content.hero.image = hero;
      else if (content.hero.image === "idb:hero") content.hero.image = defaultContent.hero.image;
      if (cta) content.cta.image = cta;
      else if (content.cta.image === "idb:cta") content.cta.image = defaultContent.cta.image;
      return content;
    } finally {
      db.close();
    }
  } catch {
    if (content.hero.image === "idb:hero") content.hero.image = defaultContent.hero.image;
    if (content.cta.image === "idb:cta") content.cta.image = defaultContent.cta.image;
    return content;
  }
}

function slimContentForSave(content: SiteContent): SiteContent {
  const next = structuredClone(content);
  if (next.hero.image.startsWith("data:") || next.hero.image.startsWith("blob:")) {
    next.hero.image = "idb:hero";
  }
  if (next.cta.image.startsWith("data:") || next.cta.image.startsWith("blob:")) {
    next.cta.image = "idb:cta";
  }
  return next;
}

export async function loadContent(): Promise<SiteContent | null> {
  try {
    const db = await openDb();
    try {
      for (const key of [RECORD_KEY, "content:v30"]) {
        const stored = await storeGet<unknown>(db, STORE_NAME, key);
        if (stored) {
          const merged = withOfficialSocials(mergeContent(stored));
          if (typeof merged.hero.image === "string" && merged.hero.image.startsWith("data:")) {
            await storePut(db, MEDIA_STORE, "hero", dataUrlToBlob(merged.hero.image));
          }
          if (typeof merged.cta.image === "string" && merged.cta.image.startsWith("data:")) {
            await storePut(db, MEDIA_STORE, "cta", dataUrlToBlob(merged.cta.image));
          }
          return await applySavedCovers(merged);
        }
      }
    } finally {
      db.close();
    }
  } catch {
    // IndexedDB can fail in private mode; fall through to localStorage.
  }

  try {
    for (const key of LEGACY_KEYS) {
      const raw = window.localStorage.getItem(key);
      if (!raw) continue;
      return applySavedCovers(withOfficialSocials(mergeContent(JSON.parse(raw))));
    }
  } catch {
    // ignore corrupt storage
  }

  try {
    return applySavedCovers(structuredClone(defaultContent));
  } catch {
    return null;
  }
}

export async function saveContent(content: SiteContent): Promise<void> {
  if (content.hero.image.startsWith("data:")) await saveCoverImage("hero", content.hero.image);
  if (content.cta.image.startsWith("data:")) await saveCoverImage("cta", content.cta.image);

  const db = await openDb();
  try {
    await storePut(db, STORE_NAME, RECORD_KEY, slimContentForSave(content));
  } finally {
    db.close();
  }
  for (const key of LEGACY_KEYS) window.localStorage.removeItem(key);
}

export async function clearContent(): Promise<void> {
  try {
    const db = await openDb();
    try {
      await storeDelete(db, STORE_NAME, RECORD_KEY);
      await storeDelete(db, MEDIA_STORE, "hero");
      await storeDelete(db, MEDIA_STORE, "cta");
    } finally {
      db.close();
    }
  } catch {
    // ignore
  }
  for (const key of LEGACY_KEYS) window.localStorage.removeItem(key);
}
