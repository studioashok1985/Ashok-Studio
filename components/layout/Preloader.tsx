"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "ashok_intro_seen";
const FALLBACK_TIMEOUT = 20000;

type Phase = "idle" | "showing" | "fading" | "done";

export function Preloader() {
  const [phase, setPhase] = useState<Phase>("idle");
  const videoRef = useRef<HTMLVideoElement>(null);

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
    const video = videoRef.current;
    if (video) {
      video.play().catch(finish);
    }
    return () => {
      window.clearTimeout(fallback);
      document.documentElement.classList.remove("preloader-lock");
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
        autoPlay
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        onEnded={finish}
        onError={finish}
      />
      <span className="intro-preloader-skip">Skip intro</span>
    </div>
  );
}
