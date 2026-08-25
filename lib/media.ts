/** Keep Cloudinary URLs, but drop crop transforms so CSS frames control the image UI. */
export function displayImageSrc(src: string | undefined, fallback = "/images/gallery-05.jpg") {
  if (!src || src === "idb:hero" || src === "idb:cta") return fallback;

  if (!src.includes("res.cloudinary.com")) return src;

  return src.replace(/\/image\/upload\/(?!v\d)[^/]+\//, "/image/upload/");
}

export function isRemoteImage(src: string) {
  return (
    src.startsWith("data:") ||
    src.startsWith("blob:") ||
    src.includes("res.cloudinary.com") ||
    src.includes("blob.vercel-storage.com") ||
    /^https?:\/\//i.test(src)
  );
}

export function isInlineImage(src: string) {
  return src.startsWith("data:") || src.startsWith("blob:");
}
