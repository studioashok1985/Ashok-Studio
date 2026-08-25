function readAsDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject(new Error("Could not read image"));
    };
    reader.onerror = () => reject(reader.error || new Error("Could not read image"));
    reader.readAsDataURL(blob);
  });
}

function drawScaled(source: CanvasImageSource, sourceWidth: number, sourceHeight: number, maxEdge: number) {
  const scale = Math.min(1, maxEdge / Math.max(sourceWidth, sourceHeight));
  const width = Math.max(1, Math.round(sourceWidth * scale));
  const height = Math.max(1, Math.round(sourceHeight * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not process this photo");
  ctx.drawImage(source, 0, 0, width, height);
  return canvas;
}

async function decodeWithElement(file: File, maxEdge: number) {
  const objectUrl = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.decoding = "async";
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("Could not read this photo. Please use a JPG, PNG, or WebP."));
      image.src = objectUrl;
    });
    if (image.decode) await image.decode().catch(() => undefined);
    return drawScaled(image, image.naturalWidth || image.width, image.naturalHeight || image.height, maxEdge);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

async function decodeWithBitmap(file: File, maxEdge: number) {
  const bitmap = await createImageBitmap(file);
  try {
    return drawScaled(bitmap, bitmap.width, bitmap.height, maxEdge);
  } finally {
    bitmap.close();
  }
}

function canvasToJpeg(canvas: HTMLCanvasElement, maxChars: number) {
  let quality = 0.84;
  let dataUrl = canvas.toDataURL("image/jpeg", quality);
  while (dataUrl.length > maxChars && quality > 0.48) {
    quality -= 0.12;
    dataUrl = canvas.toDataURL("image/jpeg", quality);
  }
  return dataUrl;
}

/** Compress owner uploads so homepage + album edits can be saved in the browser. */
export async function fileToEditableUrl(file: File, maxEdge = 1600): Promise<string> {
  if (file.type && !file.type.startsWith("image/")) {
    throw new Error("Please choose an image file");
  }

  if ((file.type === "image/png" || file.type === "image/svg+xml") && file.size < 280_000) {
    return readAsDataUrl(file);
  }

  let canvas: HTMLCanvasElement;
  try {
    canvas = await decodeWithElement(file, maxEdge);
  } catch (first) {
    try {
      canvas = await decodeWithBitmap(file, maxEdge);
    } catch {
      throw first instanceof Error ? first : new Error("Could not read this photo. Please use a JPG or PNG.");
    }
  }

  const maxChars = 750_000;
  let dataUrl = canvasToJpeg(canvas, maxChars);
  if (dataUrl.length > maxChars && maxEdge > 900) {
    const smaller = drawScaled(canvas, canvas.width, canvas.height, Math.round(maxEdge * 0.72));
    dataUrl = canvasToJpeg(smaller, maxChars);
  }
  return dataUrl;
}

export function dataUrlToBlob(dataUrl: string) {
  const [header, data] = dataUrl.split(",");
  const mime = header.match(/:(.*?);/)?.[1] || "image/jpeg";
  const binary = atob(data);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}
