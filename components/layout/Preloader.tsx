"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "ashok_intro_seen";
const FALLBACK_TIMEOUT = 20000;

type Phase = "idle" | "showing" | "fading" | "done";

export function Preloader() {
  const [phase, setPhase] = useState<Phase>("idle");
  const videoRef = useRef<HTMLVideoElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      seen = false;
    }
    if (!seen) setPhase("showing");
  }, []);

  const finish = () => {
    setPhase((current) => {
      if (current === "fading" || current === "done") return current;
      try {
        window.sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {}
      return "fading";
    });
  };

  useEffect(() => {
    if (phase !== "fading") return;
    const t = window.setTimeout(() => setPhase("done"), 700);
    return () => window.clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "showing") return;

    document.documentElement.classList.add("preloader-lock");

    const fallback = window.setTimeout(finish, FALLBACK_TIMEOUT);
    cleanupRef.current = () => {
      window.clearTimeout(fallback);
      document.documentElement.classList.remove("preloader-lock");
    };

    const video = videoRef.current;
    if (!video) return;

    const onCanPlay = () => {
      video.play().catch(() => {});
    };

    const onEnded = () => finish();

    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("ended", onEnded);

    video.load();

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("ended", onEnded);
      cleanupRef.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  if (phase === "idle" || phase === "done") return null;

  return (
    <div
      aria-hidden="true"
      role="button"
      tabIndex={0}
      className={`intro-preloader${phase === "fading" ? " is-fading" : ""}`}
      onClick={finish}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") finish();
      }}
    >
      <video
        ref={videoRef}
        src="/intro-video.mp4"
        muted
        playsInline
        preload="metadata"
        disablePictureInPicture
      />
      <span className="intro-preloader-skip">Skip intro</span>
    </div>
  );
}
