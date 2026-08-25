import { createHmac } from "crypto";

export const ADMIN_COOKIE = "ashok-admin-session";

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "ashokstudio2026";
}

export function adminSessionToken() {
  return createHmac("sha256", getAdminPassword()).update("ashok-studio-admin").digest("hex");
}

export function isAdminCookie(cookieHeader: string | null) {
  if (!cookieHeader) return false;
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${ADMIN_COOKIE}=([^;]+)`));
  return match?.[1] === adminSessionToken();
}

export function adminCookieHeader(maxAgeSeconds = 60 * 60 * 24 * 30) {
  const secure = process.env.VERCEL || process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${ADMIN_COOKIE}=${adminSessionToken()}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSeconds}${secure}`;
}

export function clearAdminCookieHeader() {
  const secure = process.env.VERCEL || process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${ADMIN_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`;
}
