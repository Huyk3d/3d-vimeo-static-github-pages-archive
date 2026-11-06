"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { landingExhibition, type LandingExhibitionPreview } from "@/data/landingExhibition";
import { D2CodingFontSource } from "@/components/layout/Header";

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
  "2023": "2023",
  "2024": "2024",
  "2025": "2025",
  "2026": "2026",
};

const landingHistoryPhaseKey = "__huykLandingPhase";
const landingHierarchyReturnKey = "__huykLandingHierarchyReturn";

function ExhibitionPreview({ preview, className }: { preview: LandingExhibitionPreview; className: string }) {
  return (
    <Link
      href={preview.href}
      className={`landing-exhibit-image group block shrink-0 overflow-hidden ${className}`}
      data-exhibit-image="true"
    >
      <img src={preview.src} alt={preview.alt} className="block size-full object-cover transition-transform duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025] group-hover:duration-[2000ms]" />
    </Link>
  );
}

export function LandingHero({ eras }: { eras: readonly { slug: string; title: string }[] }) {
  const [phase, setPhase] = useState<LandingPhase>("blank");
  const [isLandingStateResolved, setIsLandingStateResolved] = useState(false);
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
  const exhibitionScrollRef = useRef<HTMLDivElement>(null);

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
    const navigationEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const currentHistoryState = (window.history.state ?? {}) as Record<string, unknown>;
    const isReloadNavigation = navigationEntry?.type === "reload"
      || window.performance.navigation.type === window.performance.navigation.TYPE_RELOAD;
    const isHierarchyReturn = window.sessionStorage.getItem(landingHierarchyReturnKey) === "eras";

    if (isReloadNavigation) {
      window.sessionStorage.removeItem(landingHierarchyReturnKey);
      if (landingHistoryPhaseKey in currentHistoryState) {
        const { [landingHistoryPhaseKey]: _landingPhase, ...nextHistoryState } = currentHistoryState;
        window.history.replaceState(nextHistoryState, "", window.location.href);
      }
      setIsLandingStateResolved(true);
      return;
    }

    if (isHierarchyReturn) {
      window.sessionStorage.removeItem(landingHierarchyReturnKey);
      setPhase("eras");
      setIsPlayButtonVisible(true);
      setIsLandingStateResolved(true);
      return;
    }

    if (currentHistoryState[landingHistoryPhaseKey] === "eras") {
      setPhase("eras");
      setIsPlayButtonVisible(true);
    }

    setIsLandingStateResolved(true);
  }, []);

  useEffect(() => {
    if (!isLandingStateResolved || phase === "eras") return;

    introTimers.current = [
      window.setTimeout(() => setPhase("greeting"), 700),
      window.setTimeout(() => setPhase("introduction"), 2900),
      window.setTimeout(() => setPhase("eras"), 5100),
    ];

    return clearIntroTimers;
  }, [isLandingStateResolved]);

  useEffect(() => {
    if (!isLandingStateResolved || phase !== "eras") return;

    const currentHistoryState = (window.history.state ?? {}) as Record<string, unknown>;
    if (currentHistoryState[landingHistoryPhaseKey] === "eras") return;

    window.history.replaceState(
      { ...currentHistoryState, [landingHistoryPhaseKey]: "eras" },
      "",
      window.location.href,
    );
  }, [isLandingStateResolved, phase]);

  useEffect(() => {
    if (phase === "eras") return;

    const skipIntro = () => {
      clearIntroTimers();
      setPhase("eras");
    };
    window.addEventListener("pointerdown", skipIntro, { passive: true });
    window.addEventListener("touchstart", skipIntro, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", skipIntro);
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

  useEffect(() => {
    const scrollContainer = exhibitionScrollRef.current;
    if (!scrollContainer) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (phase !== "eras") return;

      const delta = event.deltaX !== 0 ? event.deltaX : event.deltaY;
      if (delta === 0) return;

      scrollContainer.scrollLeft += delta;
    };

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      scrollContainer.removeEventListener("wheel", handleWheel);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "eras") return;

    const scrollContainer = exhibitionScrollRef.current;
    if (!scrollContainer) return;
    let isDisposed = false;
    const animationFrames = new Set<number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const frame = window.requestAnimationFrame(() => {
            animationFrames.delete(frame);
            if (isDisposed) return;

            entry.target.classList.add("is-entered");
            entry.target
              .closest<HTMLElement>("[data-exhibit-section]")
              ?.querySelector<HTMLElement>("[data-exhibit-year]")
              ?.classList.add("is-entered");
          });
          animationFrames.add(frame);
          observer.unobserve(entry.target);
        });
      },
      { root: scrollContainer, threshold: 0.25 },
    );

    scrollContainer.querySelectorAll<HTMLElement>("[data-exhibit-image]").forEach((image) => observer.observe(image));
    return () => {
      isDisposed = true;
      animationFrames.forEach((frame) => window.cancelAnimationFrame(frame));
      observer.disconnect();
    };
  }, [phase]);

  return (
    <section className="landing-page relative h-[100svh] overflow-hidden bg-[#EDEDED]">
      <D2CodingFontSource />
      <style jsx global>{`
        body:has(.landing-page) > footer {
          display: none;
        }

        body:has(.landing-page) {
          overflow: hidden;
        }

        .landing-exhibition-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .landing-exhibition-scroll::-webkit-scrollbar {
          display: none;
        }

        .landing-exhibit-year,
        .landing-exhibit-image {
          opacity: 0;
          transform: translateX(6px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .landing-exhibit-year.is-entered,
        .landing-exhibit-image.is-entered {
          opacity: 1;
          transform: translateX(0);
        }

      `}</style>
      <div ref={exhibitionScrollRef} className="landing-exhibition-scroll h-full overflow-x-auto overflow-y-hidden">
        <div className="flex h-full min-w-max">
          <section className="relative h-full w-[100vw] shrink-0 overflow-hidden bg-[#EDEDED]">
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

            <header className="absolute inset-x-0 top-0 z-10 translate-y-[6px] px-6 py-5 md:px-10">
              <div className="flex items-start justify-between">
                <nav aria-label="Archive home" className="inline-flex -translate-x-[6px] -translate-y-4 items-center text-xs tracking-tight">
                  <Link href="/" className="font-bold transition-opacity hover:opacity-60" style={{ fontWeight: 700 }}>huyk</Link>
                </nav>
                <nav aria-label="Archive eras" className={`grid -translate-x-[2px] -translate-y-4 justify-items-end gap-[6px] text-[15px] font-bold leading-[1.25] transition-opacity duration-700 md:text-[17px] ${phase === "eras" ? "opacity-100" : "pointer-events-none opacity-0"}`}>
                  {eras.map((era) => (
                    <Link key={era.slug} href={`/era/${era.slug}`} className={`landing-era-link group cursor-pointer py-0.5 transition-colors duration-[600ms] ${isReelVisible ? "mix-blend-difference text-white hover:text-white" : "text-archive-text hover:text-archive-text"}`}>
                      <span className="landing-era-label">{landingEraLabels[era.slug] ?? era.title}</span>
                    </Link>
                  ))}
                  <Link href="/about" className={`landing-era-link group cursor-pointer py-0.5 transition-colors duration-[600ms] ${isReelVisible ? "mix-blend-difference text-white hover:text-white" : "text-archive-text hover:text-archive-text"}`}><span className="landing-era-label">about</span></Link>
                  <Link href="/contact" className={`landing-era-link group cursor-pointer py-0.5 transition-colors duration-[600ms] ${isReelVisible ? "mix-blend-difference text-white hover:text-white" : "text-archive-text hover:text-archive-text"}`}><span className="landing-era-label">contact</span></Link>
                </nav>
              </div>
            </header>

            {phase !== "eras" && <div className="absolute left-1/2 top-1/2 flex min-h-28 w-full -translate-x-1/2 -translate-y-[calc(50%+8px)] items-center justify-center text-center md:min-h-36">
              {phase === "greeting" && <p className="animate-landing-message text-[15px] font-medium tracking-tight md:text-[18px]">Hello, Hyuk!</p>}
              {phase === "introduction" && (
                <div className="animate-landing-message">
                  <h1 className="text-[15px] font-medium leading-[1.05] tracking-tight md:text-[22px]">Welcome to<br />A personal archive.</h1>
                </div>
              )}
            </div>}

            <button
              type="button"
              aria-label={isReelPlaying ? "Pause landing reel" : "Play landing reel"}
              onClick={toggleReelPlayback}
              className={`group absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[6px] cursor-pointer transition-[opacity,transform,color] duration-300 ease-out hover:scale-[1.08] ${isReelVisible ? "mix-blend-difference text-white" : "text-archive-text"} ${isPlayButtonVisible ? "opacity-100" : "pointer-events-none translate-y-1 opacity-0"}`}
            >
              <span className={`${isReelPlaying ? "" : "translate-x-px"} text-[16px] leading-none`}>{isReelPlaying ? "Ⅱ" : "▶"}</span>
              <span className="pointer-events-none text-[13px] leading-none tracking-[0.08em]" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                {isReelPlaying ? "PAUSE" : "PLAY"}
              </span>
            </button>
          </section>

          <section className="relative flex h-full min-w-[100vw] shrink-0 items-center gap-[10vw] bg-[#EDEDED] px-[10vw]">
            <img src={landingExhibition.introduceImage.src} alt={landingExhibition.introduceImage.alt} className="block h-[calc(100svh-10rem)] w-auto max-w-[42vw] object-contain" />
            <div className="w-[32vw] min-w-[24rem] max-w-[34rem] text-left text-[15px] leading-[1.55] tracking-[-0.025em] [word-break:keep-all] [overflow-wrap:break-word]">
              <p>이 사이트에 방문 하신 것을 진심으로 환영합니다!</p>
              <p className="mt-6">단순한 포트폴리오 사이트처럼 작업물을 단순히 나열하지 않고 제가 이 분야를 작업하면서 보낸 시간의 흐름으로 성장 과정을 기록합니다.</p>
              <p className="mt-10">전체적인 방향은 전시(Gallery)와 회고록(Archive)의 중간 지점으로 기획해 제작했으며 방문자분들은 “이 사람이 어떤 과정을 거쳐 성장해왔는지”를 자연스럽게 봐주시면 감사하겠습니다.</p>
            </div>
          </section>

          <section className="relative flex h-full w-max shrink-0 items-center bg-[#EDEDED] px-[6vw]">
            <div data-exhibit-section className="landing-exhibit-section relative flex h-full items-center">
              <span data-exhibit-year className="landing-exhibit-year absolute left-0 top-6 text-[19px] font-bold leading-none">2023</span>
              <div className="mt-[calc(5svh+1.35rem)] shrink-0 self-start">
                <div className="flex items-center gap-[3vw]">
                  <ExhibitionPreview preview={landingExhibition.preview2023.imac} className="h-[calc(65svh-2rem)] aspect-video" />
                  <ExhibitionPreview preview={landingExhibition.preview2023.toyWorld} className="h-[calc(65svh-2rem)] aspect-[3/4]" />
                </div>
              </div>
            </div>
          </section>

          <section className="relative flex h-full w-max shrink-0 items-center bg-[#EDEDED] px-[6vw]">
            <div data-exhibit-section className="landing-exhibit-section relative flex h-full items-center">
              <span data-exhibit-year className="landing-exhibit-year absolute left-0 top-6 text-[19px] font-bold leading-none">2024</span>
              <div className="mt-[calc(5svh+1.35rem)] shrink-0 self-start">
                <div className="grid h-[calc(65svh-2rem)] w-[calc((65svh-2rem)*1.78)] shrink-0 grid-cols-2 grid-rows-2 gap-3 md:gap-[1.5vw]">
                  {landingExhibition.preview2024.map((preview, index) => <ExhibitionPreview key={`${preview.href}-${index}`} preview={preview} className="aspect-video" />)}
                </div>
              </div>
            </div>
          </section>

          <section className="relative flex h-full w-max shrink-0 items-center bg-[#EDEDED] px-[6vw]">
            <div data-exhibit-section className="landing-exhibit-section relative flex h-full items-center">
              <span data-exhibit-year className="landing-exhibit-year absolute left-0 top-6 text-[19px] font-bold leading-none">2025</span>
              <div className="mt-[calc(5svh+1.35rem)] shrink-0 self-start">
                <div className="flex items-center gap-[3vw]">
                  <ExhibitionPreview preview={landingExhibition.preview2025.gameboy} className="h-[calc(65svh-2rem)] aspect-video" />
                  <ExhibitionPreview preview={landingExhibition.preview2025.angel} className="h-[calc(65svh-2rem)] aspect-[3/4]" />
                </div>
              </div>
            </div>
          </section>

          <section className="relative flex h-full w-max shrink-0 items-center bg-[#EDEDED] px-[6vw]">
            <div data-exhibit-section className="landing-exhibit-section relative flex h-full items-center">
              <span data-exhibit-year className="landing-exhibit-year absolute left-0 top-6 text-[19px] font-bold leading-none">2026</span>
              <div className="mt-[calc(5svh+1.35rem)] shrink-0 self-start">
                <div className="flex items-center gap-[3vw]">
                  <ExhibitionPreview preview={landingExhibition.preview2026.artworks} className="h-[calc(65svh-2rem)] aspect-[4/5]" />
                  <ExhibitionPreview preview={landingExhibition.preview2026.aiVideo} className="h-[calc(65svh-2rem)] aspect-[3712/4608]" />
                  <ExhibitionPreview preview={landingExhibition.preview2026.galaxy} className="h-[calc(65svh-2rem)] aspect-video" />
                </div>
              </div>
            </div>
          </section>

          <section className="grid h-full min-w-[100vw] shrink-0 grid-cols-[0.55fr_1.45fr] items-center gap-[8vw] bg-[#111111] px-[10vw] text-[#F2F2F2]">
            <div className="space-y-7 text-[15px] leading-[1.45]">
              <div><p className="font-bold">Insta</p><p className="mt-1">huyk_3d</p></div>
              <div><p className="font-bold">Discord</p><p className="mt-1">kkkkkkh</p></div>
              <div><p className="font-bold">Email</p><p className="mt-1">kwonhy5300@naver.com</p></div>
            </div>
            <div className="text-left font-bold tracking-[-0.04em]">
              <p className="text-[clamp(70px,7.6vw,136px)] leading-none">HUYK</p>
              <div className="mt-[0.28em] text-[clamp(42px,5.2vw,92px)] leading-[1.08]">
                <p>THANK FOR VISIT</p>
                <p>MY Gallery</p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <style jsx global>{`
        .landing-page .landing-era-label {
          display: inline-block;
          transform: scale(1);
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        }

        @media (hover: hover) {
          .landing-page .landing-era-link:hover .landing-era-label {
            transform: scale(1.025);
            transition-duration: 0.6s;
          }
        }
      `}</style>
    </section>
  );
}
