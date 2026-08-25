export function isHttpUrl(value: string) {
  return /^https?:\/\//i.test(value.trim());
}

export function whatsappHref(phoneOrUrl: string, message?: string) {
  if (isHttpUrl(phoneOrUrl)) return phoneOrUrl.trim();
  const digits = phoneOrUrl.replace(/\D/g, "");
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${text}`;
}

export function telHref(phone: string) {
  return `tel:${phone.replace(/\s/g, "")}`;
}

export function socialHref(value: string) {
  return isHttpUrl(value) ? value.trim() : value;
}

export function instagramHref(handleOrUrl: string) {
  if (isHttpUrl(handleOrUrl)) return handleOrUrl.trim();
  const user = handleOrUrl.replace(/^@/, "");
  return `https://instagram.com/${user}`;
}
