// Client-side "admin gate" for the manual editing mode.
//
// IMPORTANT: this is a demo-grade gate suitable for a single trusted editor
// (the studio owner) on their own device. The password lives in an env
// var and the session flag lives in localStorage — there is no server,
// so anyone who reads the shipped JS can find the password. Before
// giving this to a client, swap this file for real auth (NextAuth.js,
// Clerk, Supabase Auth, etc.) backed by a database.

const AUTH_KEY = "ashokstudio:auth";

// Change this before deploying, or better, replace this whole check
// with a real backend call.
const ADMIN_PASSWORD =
  process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "ashokstudio2026";

export function checkPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function setAuthed(value: boolean) {
  if (typeof window === "undefined") return;
  if (value) {
    window.localStorage.setItem(AUTH_KEY, "true");
  } else {
    window.localStorage.removeItem(AUTH_KEY);
  }
}

export function isAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(AUTH_KEY) === "true";
}
