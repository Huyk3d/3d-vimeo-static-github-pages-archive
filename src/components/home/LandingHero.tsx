"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Era } from "@/types/archive";

type LandingPhase = "blank" | "greeting" | "introduction" | "eras";

type VimeoPlayerEvent = "play" | "pause" | "playing" | "bufferstart" | "bufferend" | "error";

type VimeoPlayerInstance = {
  ready: () => Promise<void>;
  play: () => Promise<void>;
  pause: () => Promise<void>;
  on: (eventName: VimeoPlayerEvent, callback: () => void) => void;
  destroy: () => Promise<void>;
};

type VimeoPlayerApi = {
  Player: new (element: HTMLIFrameElement) => VimeoPlayerInstance;
};

declare global {
  interface Window {
    Vimeo?: VimeoPlayerApi;
  }
}

let vimeoPlayerApiPromise: Promise<VimeoPlayerApi> | null = null;

function loadVimeoPlayerApi() {
  if (window.Vimeo) return Promise.resolve(window.Vimeo);
  if (vimeoPlayerApiPromise) return vimeoPlayerApiPromise;

  vimeoPlayerApiPromise = new Promise<VimeoPlayerApi>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://player.vimeo.com/api/player.js";
    script.async = true;
    script.onload = () => {
      if (window.Vimeo) {
        resolve(window.Vimeo);
        return;
      }

      vimeoPlayerApiPromise = null;
      reject(new Error("Vimeo Player API failed to load."));
    };
    script.onerror = () => {
      vimeoPlayerApiPromise = null;
      reject(new Error("Vimeo Player API could not be loaded."));
    };
    document.head.appendChild(script);
  });

  return vimeoPlayerApiPromise;
}

const landingEraLabels: Record<string, string> = {
  "when-student-01": "Student",
  "vdas-01": "VDAS_01",
  "vdas-02": "VDAS_02",
};

export function LandingHero({ eras }: { eras: Era[] }) {
  const [phase, setPhase] = useState<LandingPhase>("blank");
  const [isPlayButtonVisible, setIsPlayButtonVisible] = useState(false);
  const [isReelVisible, setIsReelVisible] = useState(false);
  const [isReelPlaying, setIsReelPlaying] = useState(false);
  const [isReelFrameVisible, setIsReelFrameVisible] = useState(false);
  const introTimers = useRef<number[]>([]);
  const reelIframeRef = useRef<HTMLIFrameElement>(null);
  const reelPlayerRef = useRef<VimeoPlayerInstance | null>(null);
  const isPlayerReadyRef = useRef(false);
  const shouldPlayReelRef = useRef(false);
  const isReelPlayingRef = useRef(false);
  const isPlayRequestInFlightRef = useRef(false);
  const playRequestIdRef = useRef(0);
  const playTimeoutRef = useRef<number | null>(null);

  const clearIntroTimers = () => {
    introTimers.current.forEach((timer) => window.clearTimeout(timer));
    introTimers.current = [];
  };

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    window.scrollTo(0, 0);
    const resetScrollFrame = window.requestAnimationFrame(() => window.scrollTo(0, 0));

    return () => {
      window.cancelAnimationFrame(resetScrollFrame);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    introTimers.current = [
      window.setTimeout(() => setPhase("greeting"), 700),
      window.setTimeout(() => setPhase("introduction"), 2900),
      window.setTimeout(() => setPhase("eras"), 5100),
    ];

    return clearIntroTimers;
  }, []);

  useEffect(() => {
    if (phase === "eras") return;

    const skipIntro = () => {
      clearIntroTimers();
      setPhase("eras");
    };
    window.addEventListener("pointerdown", skipIntro, { passive: true });
    window.addEventListener("wheel", skipIntro, { passive: true });
    window.addEventListener("touchstart", skipIntro, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", skipIntro);
      window.removeEventListener("wheel", skipIntro);
      window.removeEventListener("touchstart", skipIntro);
    };
  }, [phase]);

  const clearPlayTimeout = () => {
    if (playTimeoutRef.current === null) return;

    window.clearTimeout(playTimeoutRef.current);
    playTimeoutRef.current = null;
  };

  const resetPlaybackRequest = () => {
    playRequestIdRef.current += 1;
    shouldPlayReelRef.current = false;
    isPlayRequestInFlightRef.current = false;
    clearPlayTimeout();
    isReelPlayingRef.current = false;
    setIsReelPlaying(false);
  };

  const requestReelPlayback = () => {
    const player = reelPlayerRef.current;
    if (!shouldPlayReelRef.current || !isPlayerReadyRef.current || !player || isPlayRequestInFlightRef.current) return;

    const requestId = playRequestIdRef.current + 1;
    playRequestIdRef.current = requestId;
    isPlayRequestInFlightRef.current = true;
    clearPlayTimeout();

    playTimeoutRef.current = window.setTimeout(() => {
      if (requestId !== playRequestIdRef.current || !shouldPlayReelRef.current) return;
      resetPlaybackRequest();
    }, 8000);

    void player.play()
      .catch(() => {
        if (requestId !== playRequestIdRef.current || !shouldPlayReelRef.current) return;
        resetPlaybackRequest();
      })
      .finally(() => {
        if (requestId === playRequestIdRef.current) {
          isPlayRequestInFlightRef.current = false;
        }
      });
  };

  useEffect(() => {
    let isDisposed = false;
    let player: VimeoPlayerInstance | null = null;

    const createPlayer = (Vimeo: VimeoPlayerApi) => {
      const iframe = reelIframeRef.current;
      if (!iframe || isDisposed || reelPlayerRef.current) return;

      player = new Vimeo.Player(iframe);
      reelPlayerRef.current = player;

      player.on("playing", () => {
        if (!shouldPlayReelRef.current) {
          void player?.pause().catch(() => undefined);
          return;
        }

        clearPlayTimeout();
        isPlayRequestInFlightRef.current = false;
        isReelPlayingRef.current = true;
        setIsReelPlaying(true);
        setIsReelFrameVisible(true);
      });

      player.on("pause", () => {
        clearPlayTimeout();
        isPlayRequestInFlightRef.current = false;
        isReelPlayingRef.current = false;
        setIsReelPlaying(false);

        if (shouldPlayReelRef.current) {
          shouldPlayReelRef.current = false;
        }
      });

      player.on("bufferstart", () => undefined);
      player.on("bufferend", () => undefined);
      player.on("error", () => resetPlaybackRequest());

      void player.ready()
        .then(() => {
          if (isDisposed) return;
          isPlayerReadyRef.current = true;

          if (shouldPlayReelRef.current) {
            requestReelPlayback();
            return;
          }

          void player?.pause().catch(() => undefined);
        })
        .catch(() => {
          if (!isDisposed) resetPlaybackRequest();
        });
    };

    void loadVimeoPlayerApi()
      .then(createPlayer)
      .catch(() => {
        if (!isDisposed) resetPlaybackRequest();
      });

    return () => {
      isDisposed = true;
      clearPlayTimeout();
      reelPlayerRef.current = null;
      isPlayerReadyRef.current = false;
      if (player) void player.destroy().catch(() => undefined);
    };
  }, []);

  const toggleReelPlayback = () => {
    setIsReelVisible(true);

    if (isReelPlayingRef.current || shouldPlayReelRef.current) {
      resetPlaybackRequest();
      void reelPlayerRef.current?.pause().catch(() => undefined);
      return;
    }

    shouldPlayReelRef.current = true;
    requestReelPlayback();
  };

  useEffect(() => {
    if (phase !== "eras") {
      setIsPlayButtonVisible(false);
      return;
    }

    const playButtonTimer = window.setTimeout(() => setIsPlayButtonVisible(true), 250);

    return () => window.clearTimeout(playButtonTimer);
  }, [phase]);

  return (
    <section className="landing-page relative flex min-h-[100svh] flex-col overflow-visible bg-[#EDEDED] px-6 pb-16 pt-16 md:px-10 md:pb-20 md:pt-24">
      <style jsx global>{`
        body:has(.landing-page) > footer {
          display: none;
        }
      `}</style>
      <div className={`pointer-events-none absolute inset-0 overflow-hidden bg-[#EDEDED] transition-opacity duration-300 ${isReelFrameVisible ? "opacity-100" : "opacity-0"}`}>
        <iframe
          ref={reelIframeRef}
          src="https://player.vimeo.com/video/1233663036?autoplay=0&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0&badge=0&vimeo_logo=0"
          title="Landing reel"
          className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-[100svh] w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center text-center">
        {phase !== "eras" && <div className="relative flex min-h-28 w-full translate-y-[4.25rem] items-center justify-center md:min-h-36">
          {phase === "greeting" && <p className="animate-landing-message text-[15px] font-medium tracking-tight md:text-[18px]">Hello, Hyuk!</p>}
          {phase === "introduction" && (
            <div className="animate-landing-message">
              <h1 className="text-[15px] font-medium leading-[1.05] tracking-tight md:text-[22px]">Welcome to<br />A personal archive.</h1>
            </div>
          )}
        </div>}

        <div className="relative -top-7">
          <nav aria-label="Archive eras" className={`grid justify-items-center gap-2 text-sm transition-opacity duration-700 md:text-base ${phase === "eras" ? "opacity-100" : "pointer-events-none mt-10 opacity-0 md:mt-14"}`}>
            {eras.map((era) => (
              <Link key={era.slug} href={`/era/${era.slug}`} className={`group cursor-pointer py-1 transition-colors duration-[600ms] ${isReelVisible ? "mix-blend-difference text-white hover:text-white" : "text-archive-text hover:text-archive-text"}`}>
                <span>{landingEraLabels[era.slug] ?? era.title}</span>
              </Link>
            ))}
            <Link href="/contact" className={`group cursor-pointer py-1 transition-colors duration-[600ms] ${isReelVisible ? "mix-blend-difference text-white hover:text-white" : "text-archive-text hover:text-archive-text"}`}>Contact</Link>
          </nav>

          <button
            type="button"
            aria-label={isReelPlaying ? "Pause landing reel" : "Play landing reel"}
            onClick={toggleReelPlayback}
            className={`mx-auto mt-4 flex h-9 w-9 cursor-pointer items-center justify-center text-[12px] transition-[transform,color,opacity] duration-300 hover:scale-[1.08] ${isReelVisible ? "mix-blend-difference text-white" : "text-archive-text"} ${isPlayButtonVisible ? "opacity-100" : "pointer-events-none opacity-0"}`}
          >
            <span className={isReelPlaying ? "" : "translate-x-px"}>{isReelPlaying ? "Ⅱ" : "▶"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
