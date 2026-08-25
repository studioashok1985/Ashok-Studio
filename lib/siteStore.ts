import { put } from "@vercel/blob";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { defaultContent, mergeContent, SiteContent } from "./content";

const CONTENT_BLOB = "site-content.json";
const LOCAL_CONTENT = path.join(process.cwd(), "data", "content.json");
const LOCAL_UPLOADS = path.join(process.cwd(), "public", "uploads");

function blobToken() {
  return process.env.BLOB_READ_WRITE_TOKEN || "";
}

export function hasBlobStorage() {
  return Boolean(blobToken());
}

export function storageReady() {
  return hasBlobStorage() || !process.env.VERCEL;
}

async function persistBuffer(fileName: string, body: Buffer, contentType: string) {
  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, "-");

  if (hasBlobStorage()) {
    const uploaded = await put(`uploads/${Date.now()}-${safeName}`, body, {
      access: "public",
      token: blobToken(),
      contentType,
      addRandomSuffix: true,
    });
    return uploaded.url;
  }

  await mkdir(LOCAL_UPLOADS, { recursive: true });
  const localName = `${Date.now()}-${safeName}`;
  await writeFile(path.join(LOCAL_UPLOADS, localName), body);
  return `/uploads/${localName}`;
}

export async function persistUploadFile(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const type = file.type || "image/jpeg";
  const name = file.name || "photo.jpg";
  return persistBuffer(name, buffer, type);
}

async function persistDataUrl(dataUrl: string, name: string) {
  const match = dataUrl.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/);
  if (!match) return dataUrl;
  const buffer = Buffer.from(match[2], "base64");
  const ext = match[1].includes("png") ? "png" : "jpg";
  return persistBuffer(`${name}.${ext}`, buffer, match[1]);
}

async function replaceInlineImages(value: unknown, prefix: string): Promise<unknown> {
  if (typeof value === "string") {
    if (value.startsWith("data:image")) return persistDataUrl(value, prefix);
    return value;
  }
  if (Array.isArray(value)) {
    return Promise.all(value.map((item, index) => replaceInlineImages(item, `${prefix}-${index}`)));
  }
  if (value && typeof value === "object") {
    const next: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
      next[key] = await replaceInlineImages(child, `${prefix}-${key}`);
    }
    return next;
  }
  return value;
}

export async function loadPublishedContent(): Promise<SiteContent> {
  if (hasBlobStorage()) {
    try {
      const { list } = await import("@vercel/blob");
      const listed = await list({ prefix: CONTENT_BLOB, token: blobToken() });
      const file = listed.blobs.find((item) => item.pathname === CONTENT_BLOB) || listed.blobs[0];
      if (file?.url) {
        const response = await fetch(file.url, { cache: "no-store" });
        if (response.ok) return mergeContent(await response.json());
      }
    } catch {
      // fall through to local / defaults
    }
  }

  try {
    const raw = await readFile(LOCAL_CONTENT, "utf8");
    return mergeContent(JSON.parse(raw));
  } catch {
    return defaultContent;
  }
}

export async function savePublishedContent(content: SiteContent): Promise<SiteContent> {
  if (!storageReady()) {
    throw new Error(
      "Photo storage is not set up on Vercel. Create a Blob store in the Vercel dashboard (Storage → Blob), connect it to this project, then redeploy."
    );
  }

  const prepared = (await replaceInlineImages(content, "site")) as SiteContent;

  if (hasBlobStorage()) {
    await put(CONTENT_BLOB, JSON.stringify(prepared), {
      access: "public",
      token: blobToken(),
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
    return prepared;
  }

  await mkdir(path.dirname(LOCAL_CONTENT), { recursive: true });
  await writeFile(LOCAL_CONTENT, JSON.stringify(prepared, null, 2), "utf8");
  return prepared;
}

export async function resetPublishedContent() {
  return savePublishedContent(defaultContent);
}
