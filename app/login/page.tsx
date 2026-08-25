"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { markAuthenticated, useEdit } from "@/components/edit/EditProvider";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const { content } = useEdit();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error || "That password isn't right. Try again.");
        return;
      }
      markAuthenticated();
      window.location.href = "/";
    } catch {
      setError("Could not sign in. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-6 py-20">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-10 inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
          <ArrowLeft size={15} /> Back to site
        </Link>

        <div className="mb-10 flex flex-col items-center text-center">
          <Image
            src={content.logo}
            alt="Ashok Studio"
            width={56}
            height={84}
            className="mb-6 h-14 w-auto"
            unoptimized={content.logo.startsWith("data:")}
          />
          <h1 className="font-display text-3xl text-ink">Studio Login</h1>
          <p className="mt-3 max-w-xs text-sm text-muted">
            For the Ashok Studio team — sign in to edit photos and copy. Saved changes go live on the hosted website.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label htmlFor="password" className="kicker mb-2 block">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-[var(--line)] bg-transparent py-2 text-ink outline-none transition-colors focus:border-ink"
            />
            {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
          </div>
          <button type="submit" className="btn-primary mt-2" disabled={busy}>
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
