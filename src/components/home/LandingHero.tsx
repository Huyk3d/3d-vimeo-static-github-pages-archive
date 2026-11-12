"use client";

import Link from "next/link";
import { type MouseEvent, useEffect, useRef, useState } from "react";
import { landingExhibition, type LandingExhibitionPreview } from "@/data/landingExhibition";
import { yearEras } from "@/data/yearEras";
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
const landingYearDescriptionOverrides: Record<string, readonly string[]> = {
  "2023": [
    "대학교 2학년입니다. 당시 학교에서는 2학년부터 본격적인 3D툴(C4D)를 배웠으며",
    "1학기 배우자마자 흥미를 느껴 여름 방학때 블렌더를 독학하여 공부하였습니다.",
    "2학기 시절에는 학교 과제 외에도 따로 유튜브/유데미에서 튜토리얼 영상을 보면서",
    "사부작사부작 혼자서 블렌더 독학하고 개인 짧은 프로젝트도 진행하며 재밌게 보냈습니다.",
  ],
  "2025": [
    "대학교 4학년으로 졸업 작품을 제작한 연도입니다.",
    "졸업 작품 자체는 1월에 기획 및 모델링을 이미 시작해 5월 중순즈음 1차본을 제출하고",
    "여름방학때 개인프로젝트를 하는 일탈(?)을 저지르고 9월달즈음 마무리 하였습니다.",
    "졸업 작품을 마치고 VDAS 학원을 처음으로 다녔으며 Foundation 85-3th 과정을 밟아",
    "학교 및 독학 이외의 넓은 시야가 생겼습니다.",
  ],
};
const landingYearDescriptions = new Map(yearEras.map(({ slug, description }) => [slug, landingYearDescriptionOverrides[slug] ?? description]));
const landingExhibitMotion = {
  entryViewportInset: 0.01,
  forwardExitContentCenter: 0.35,
  backwardExitContentCenter: 0.65,
  enterDurationMs: 875,
  exitDurationMs: 350,
  rightColumnDelayMs: 100,
  maxTranslateY: 16,
  directionConfirmationDistancePx: 2,
} as const;
const landingReelTransition = {
  reelCompensationRatio: 0.3,
  compensationRangeViewportWidths: 1,
} as const;
const landingEndingTransition = {
  compensationRangeViewportWidths: 1,
  yearCompensationRatio: 0.3,
} as const;
const landingScrollInertia = {
  mouseWheelInputGain: 1,
  trackpadInputGain: 0.72,
  trackpadDeltaThresholdPx: 40,
  lineDeltaPx: 16,
  pageDeltaViewportRatio: 0.9,
  responsePerSecond: 8.11,
  stopDistancePx: 0.25,
  directionChangeThresholdPx: 0.5,
  recentWriteTolerancePx: 0.5,
} as const;

function ExhibitionPreview({ preview, className, motionGroup }: { preview: LandingExhibitionPreview; className: string; motionGroup?: string }) {
  return (
    <Link
      href={preview.href}
      className={`landing-exhibit-image group block shrink-0 overflow-hidden ${className}`}
      data-exhibit-motion="true"
      data-exhibit-motion-group={motionGroup}
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
  const reelTransitionRef = useRef<HTMLElement>(null);
  const reelLayerRef = useRef<HTMLElement>(null);
  const endingTransitionRef = useRef<HTMLElement>(null);
  const endingYearLayerRef = useRef<HTMLElement>(null);
  const endingLastMediaGroupRef = useRef<HTMLDivElement>(null);
  const endingSectionRef = useRef<HTMLElement>(null);
  const endingContentRef = useRef<HTMLDivElement>(null);
  const resetHorizontalInertiaRef = useRef<(() => void) | null>(null);

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

  const returnToReel = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const scrollContainer = exhibitionScrollRef.current;
    if (!scrollContainer) return;

    resetHorizontalInertiaRef.current?.();
    scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
  };

  const returnToEnding = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const scrollContainer = exhibitionScrollRef.current;
    const endingSection = endingSectionRef.current;
    if (!scrollContainer || !endingSection) return;

    resetHorizontalInertiaRef.current?.();
    const viewportRect = scrollContainer.getBoundingClientRect();
    const endingRect = endingSection.getBoundingClientRect();
    const endingOverflow = Math.max(0, endingSection.offsetWidth - scrollContainer.clientWidth);
    const endingScrollLeft = scrollContainer.scrollLeft + endingRect.left - viewportRect.left + endingOverflow;
    scrollContainer.scrollTo({ left: endingScrollLeft, behavior: "smooth" });
  };

  const indexEntries = [
    ...eras.map((era) => ({ href: `/era/${era.slug}`, label: landingEraLabels[era.slug] ?? era.title })),
    { href: "/contact", label: "contact" },
  ];

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

    let animationFrame: number | null = null;
    let lastFrameTime: number | null = null;
    let targetScrollLeft = scrollContainer.scrollLeft;
    let lastProgrammaticScrollLeft: number | null = null;

    const getMaxScrollLeft = () => Math.max(0, scrollContainer.scrollWidth - scrollContainer.clientWidth);
    const clampScrollLeft = (value: number) => Math.min(getMaxScrollLeft(), Math.max(0, value));

    const stopInertia = () => {
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      animationFrame = null;
      lastFrameTime = null;
    };

    const syncTargetToActualScroll = () => {
      targetScrollLeft = clampScrollLeft(scrollContainer.scrollLeft);
      lastProgrammaticScrollLeft = null;
      stopInertia();
    };

    const applyScrollLeft = (nextScrollLeft: number) => {
      lastProgrammaticScrollLeft = nextScrollLeft;
      scrollContainer.scrollLeft = nextScrollLeft;
    };

    const stepInertia = (timestamp: number) => {
      const elapsedSeconds = lastFrameTime === null
        ? 1 / 60
        : Math.min(0.05, (timestamp - lastFrameTime) / 1000);
      lastFrameTime = timestamp;

      const currentScrollLeft = scrollContainer.scrollLeft;
      targetScrollLeft = clampScrollLeft(targetScrollLeft);
      const remainingDistance = targetScrollLeft - currentScrollLeft;

      if (Math.abs(remainingDistance) <= landingScrollInertia.stopDistancePx) {
        if (currentScrollLeft !== targetScrollLeft) applyScrollLeft(targetScrollLeft);
        animationFrame = null;
        lastFrameTime = null;
        return;
      }

      const interpolation = 1 - Math.exp(-landingScrollInertia.responsePerSecond * elapsedSeconds);
      const nextScrollLeft = clampScrollLeft(currentScrollLeft + remainingDistance * interpolation);
      applyScrollLeft(nextScrollLeft);

      if (nextScrollLeft === 0 || nextScrollLeft === getMaxScrollLeft()) {
        targetScrollLeft = nextScrollLeft;
        animationFrame = null;
        lastFrameTime = null;
        return;
      }

      animationFrame = window.requestAnimationFrame(stepInertia);
    };

    const startInertia = () => {
      if (animationFrame !== null) return;
      animationFrame = window.requestAnimationFrame(stepInertia);
    };

    const normalizeWheelDelta = (event: WheelEvent, delta: number) => {
      if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) return delta * landingScrollInertia.lineDeltaPx;
      if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) return delta * scrollContainer.clientWidth * landingScrollInertia.pageDeltaViewportRatio;
      return delta;
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (phase !== "eras") return;

      const rawDelta = event.deltaX !== 0 ? event.deltaX : event.deltaY;
      if (rawDelta === 0) return;

      const delta = normalizeWheelDelta(event, rawDelta);
      const isTrackpadLike = event.deltaMode === WheelEvent.DOM_DELTA_PIXEL
        && Math.abs(delta) < landingScrollInertia.trackpadDeltaThresholdPx;
      const inputGain = isTrackpadLike
        ? landingScrollInertia.trackpadInputGain
        : landingScrollInertia.mouseWheelInputGain;
      const currentScrollLeft = scrollContainer.scrollLeft;
      const remainingDistance = targetScrollLeft - currentScrollLeft;

      if (Math.sign(delta) !== Math.sign(remainingDistance)
        && Math.abs(remainingDistance) > landingScrollInertia.directionChangeThresholdPx) {
        targetScrollLeft = currentScrollLeft;
      }

      targetScrollLeft = clampScrollLeft(targetScrollLeft + delta * inputGain);
      startInertia();
    };

    const handleScroll = () => {
      const actualScrollLeft = scrollContainer.scrollLeft;
      if (lastProgrammaticScrollLeft !== null
        && Math.abs(actualScrollLeft - lastProgrammaticScrollLeft) <= landingScrollInertia.recentWriteTolerancePx) {
        return;
      }

      syncTargetToActualScroll();
    };

    const handleResize = () => {
      const nextScrollLeft = clampScrollLeft(scrollContainer.scrollLeft);
      if (nextScrollLeft !== scrollContainer.scrollLeft) applyScrollLeft(nextScrollLeft);
      syncTargetToActualScroll();
    };

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    resetHorizontalInertiaRef.current = syncTargetToActualScroll;

    return () => {
      scrollContainer.removeEventListener("wheel", handleWheel);
      scrollContainer.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      stopInertia();
      if (resetHorizontalInertiaRef.current === syncTargetToActualScroll) {
        resetHorizontalInertiaRef.current = null;
      }
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "eras") return;

    const scrollContainer = exhibitionScrollRef.current;
    const transition = reelTransitionRef.current;
    const reelLayer = reelLayerRef.current;
    if (!scrollContainer || !transition || !reelLayer) return;

    let animationFrame: number | null = null;

    const updateReelPosition = () => {
      animationFrame = null;

      const viewportRect = scrollContainer.getBoundingClientRect();
      const transitionRect = transition.getBoundingClientRect();
      const transitionTravel = Math.min(
        viewportRect.width * landingReelTransition.compensationRangeViewportWidths,
        Math.max(0, viewportRect.left - transitionRect.left),
      );
      const compensation = transitionTravel * landingReelTransition.reelCompensationRatio;

      reelLayer.style.transform = `translate3d(${compensation}px, 0, 0)`;
    };

    const scheduleReelPositionUpdate = () => {
      if (animationFrame !== null) return;
      animationFrame = window.requestAnimationFrame(updateReelPosition);
    };

    scrollContainer.addEventListener("scroll", scheduleReelPositionUpdate, { passive: true });
    window.addEventListener("resize", scheduleReelPositionUpdate);
    scheduleReelPositionUpdate();

    return () => {
      scrollContainer.removeEventListener("scroll", scheduleReelPositionUpdate);
      window.removeEventListener("resize", scheduleReelPositionUpdate);
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      reelLayer.style.transform = "";
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "eras") return;

    const scrollContainer = exhibitionScrollRef.current;
    const transition = endingTransitionRef.current;
    const yearLayer = endingYearLayerRef.current;
    const lastMediaGroup = endingLastMediaGroupRef.current;
    const endingSection = endingSectionRef.current;
    const endingContent = endingContentRef.current;
    if (!scrollContainer || !transition || !yearLayer || !lastMediaGroup || !endingSection || !endingContent) return;

    let animationFrame: number | null = null;

    const updateEndingTransition = () => {
      animationFrame = null;

      const viewportRect = scrollContainer.getBoundingClientRect();
      const transitionRect = transition.getBoundingClientRect();
      const yearLayerRect = yearLayer.getBoundingClientRect();
      const lastMediaRect = lastMediaGroup.getBoundingClientRect();
      const endingGap = Math.max(16, viewportRect.width * 0.01);
      const contentEndWithinYearLayer = lastMediaRect.right - yearLayerRect.left;
      const endingStart = Math.min(
        transition.clientWidth - viewportRect.width,
        contentEndWithinYearLayer + endingGap,
      );

      endingSection.style.left = `${endingStart}px`;
      endingSection.style.width = `${transition.clientWidth - endingStart}px`;
      endingContent.style.transform = `translate3d(${Math.max(0, (endingSection.offsetWidth - viewportRect.width) / 2)}px, 0, 0)`;

      const wrapperTravel = Math.max(0, viewportRect.left - transitionRect.left);
      const compensationStart = Math.max(0, endingSection.offsetLeft - viewportRect.width);
      const compensationTravel = Math.min(
        viewportRect.width * landingEndingTransition.compensationRangeViewportWidths,
        Math.max(0, wrapperTravel - compensationStart),
      );
      const compensation = compensationTravel * landingEndingTransition.yearCompensationRatio;

      yearLayer.style.transform = `translate3d(${compensation}px, 0, 0)`;
    };

    const scheduleEndingTransitionUpdate = () => {
      if (animationFrame !== null) return;
      animationFrame = window.requestAnimationFrame(updateEndingTransition);
    };

    scrollContainer.addEventListener("scroll", scheduleEndingTransitionUpdate, { passive: true });
    window.addEventListener("resize", scheduleEndingTransitionUpdate);
    scheduleEndingTransitionUpdate();

    return () => {
      scrollContainer.removeEventListener("scroll", scheduleEndingTransitionUpdate);
      window.removeEventListener("resize", scheduleEndingTransitionUpdate);
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      yearLayer.style.transform = "";
      endingSection.style.left = "";
      endingSection.style.width = "";
      endingContent.style.transform = "";
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "eras") return;

    const scrollContainer = exhibitionScrollRef.current;
    if (!scrollContainer) return;

    const sections = Array.from(scrollContainer.querySelectorAll<HTMLElement>("[data-exhibit-section]"));
    const targets = Array.from(scrollContainer.querySelectorAll<HTMLElement>("[data-exhibit-motion]"));
    if (sections.length === 0 || targets.length === 0) return;

    let animationFrame: number | null = null;
    type SectionMotionState = "inactive" | "active" | "exited-left" | "exited-right";
    type ScrollDirection = "forward" | "backward";
    type ExitMetadata = { scrollLeft: number; wasFullyOffscreen: boolean };

    const sectionStates = new Map<HTMLElement, SectionMotionState>();
    const exitMetadata = new Map<HTMLElement, ExitMetadata>();
    const pendingRightColumnTimers = new Map<HTMLElement, number>();
    let previousScrollLeft = scrollContainer.scrollLeft;
    let confirmedDirection: ScrollDirection | null = null;
    let directionCandidate: ScrollDirection | null = null;
    let candidateDistance = 0;

    const getLayoutRect = (target: HTMLElement) => {
      const rect = target.getBoundingClientRect();
      const transform = window.getComputedStyle(target).transform;
      const appliedTranslateY = transform === "none" ? 0 : new DOMMatrixReadOnly(transform).m42;

      return {
        left: rect.left,
        right: rect.right,
        top: rect.top - appliedTranslateY,
        bottom: rect.bottom - appliedTranslateY,
      };
    };

    const setGroupActive = (groupTargets: HTMLElement[], isActive: boolean) => {
      groupTargets.forEach((target) => {
        if (target.classList.contains("is-exhibit-active") !== isActive) {
          target.classList.toggle("is-exhibit-active", isActive);
        }
      });
    };

    const updateMotion = () => {
      animationFrame = null;

      const viewportRect = scrollContainer.getBoundingClientRect();
      const currentScrollLeft = scrollContainer.scrollLeft;
      const scrollDelta = currentScrollLeft - previousScrollLeft;
      previousScrollLeft = currentScrollLeft;

      if (scrollDelta !== 0) {
        const measuredDirection: ScrollDirection = scrollDelta > 0 ? "forward" : "backward";

        if (measuredDirection === confirmedDirection) {
          directionCandidate = null;
          candidateDistance = 0;
        } else if (measuredDirection === directionCandidate) {
          candidateDistance += Math.abs(scrollDelta);
        } else {
          directionCandidate = measuredDirection;
          candidateDistance = Math.abs(scrollDelta);
        }

        if (candidateDistance >= landingExhibitMotion.directionConfirmationDistancePx) {
          confirmedDirection = directionCandidate;
          directionCandidate = null;
          candidateDistance = 0;
        }
      }

      const scrollDirection = confirmedDirection;
      const groupsBySection = new Map<HTMLElement, Map<string, HTMLElement[]>>();

      targets.forEach((target, index) => {
        const section = target.closest<HTMLElement>("[data-exhibit-section]");
        if (!section) return;

        const group = target.dataset.exhibitMotionGroup || `target-${index}`;
        const sectionGroups = groupsBySection.get(section) ?? new Map<string, HTMLElement[]>();
        sectionGroups.set(group, [...(sectionGroups.get(group) ?? []), target]);
        groupsBySection.set(section, sectionGroups);
      });

      sections.forEach((section) => {
        const sectionGroups = groupsBySection.get(section);
        if (!sectionGroups) return;

        const groupMeasurements = Array.from(sectionGroups.values()).map((groupTargets) => {
          const layoutRects = groupTargets.map(getLayoutRect);
          return {
            targets: groupTargets,
            left: Math.min(...layoutRects.map((rect) => rect.left)),
            right: Math.max(...layoutRects.map((rect) => rect.right)),
          };
        });
        const contentLeft = Math.min(...groupMeasurements.map((group) => group.left));
        const contentRight = Math.max(...groupMeasurements.map((group) => group.right));
        const entryLeftBoundary = viewportRect.left + viewportRect.width * landingExhibitMotion.entryViewportInset;
        const entryRightBoundary = viewportRect.right - viewportRect.width * landingExhibitMotion.entryViewportInset;
        const contentCenter = (contentLeft + contentRight) / 2;
        const forwardExitCenter = viewportRect.left + viewportRect.width * landingExhibitMotion.forwardExitContentCenter;
        const backwardExitCenter = viewportRect.left + viewportRect.width * landingExhibitMotion.backwardExitContentCenter;
        const leftGroupMeasurements = groupMeasurements.filter((group) => (group.left + group.right) / 2 <= contentCenter);
        const rightGroupMeasurements = groupMeasurements.filter((group) => (group.left + group.right) / 2 > contentCenter);
        const hasEnteredViewport = (groups: typeof groupMeasurements) => groups.some((group) => group.right >= entryLeftBoundary && group.left <= entryRightBoundary);
        const hasLeftGroupEntered = hasEnteredViewport(leftGroupMeasurements);
        const hasRightGroupEntered = hasEnteredViewport(rightGroupMeasurements);
        const hasAnyGroupEntered = hasEnteredViewport(groupMeasurements);

        const currentState = sectionStates.get(section) ?? "inactive";
        let nextState = currentState;
        const isRightGroupPending = pendingRightColumnTimers.has(section);
        const currentExitMetadata = exitMetadata.get(section);

        if (currentState === "exited-left" && contentRight < entryLeftBoundary && currentExitMetadata) {
          currentExitMetadata.wasFullyOffscreen = true;
        }

        if (currentState === "exited-right" && contentLeft > entryRightBoundary && currentExitMetadata) {
          currentExitMetadata.wasFullyOffscreen = true;
        }

        if (currentState === "inactive" && (
          (scrollDirection === "forward" && hasLeftGroupEntered)
          || (scrollDirection === "backward" && hasRightGroupEntered)
          || (scrollDirection === null && hasAnyGroupEntered)
        )) {
          nextState = "active";
        } else if (currentState === "active" && !isRightGroupPending && section.dataset.exhibitYear !== "2026" && scrollDirection === "forward" && contentCenter <= forwardExitCenter) {
          nextState = "exited-left";
        } else if (currentState === "active" && !isRightGroupPending && scrollDirection === "backward" && contentCenter >= backwardExitCenter) {
          nextState = "exited-right";
        } else if (currentState === "exited-left" && scrollDirection === "backward") {
          const hasRestoredExitPosition = !currentExitMetadata?.wasFullyOffscreen
            && currentScrollLeft <= (currentExitMetadata?.scrollLeft ?? currentScrollLeft) - landingExhibitMotion.directionConfirmationDistancePx;
          if (hasRestoredExitPosition || (currentExitMetadata?.wasFullyOffscreen && hasRightGroupEntered)) {
            nextState = "active";
          }
        } else if (currentState === "exited-right" && scrollDirection === "forward") {
          const hasRestoredExitPosition = !currentExitMetadata?.wasFullyOffscreen
            && currentScrollLeft >= (currentExitMetadata?.scrollLeft ?? currentScrollLeft) + landingExhibitMotion.directionConfirmationDistancePx;
          if (hasRestoredExitPosition || (currentExitMetadata?.wasFullyOffscreen && hasLeftGroupEntered)) {
            nextState = "active";
          }
        }

        if (currentState === nextState) return;

        sectionStates.set(section, nextState);
        if (nextState === "exited-left" || nextState === "exited-right") {
          exitMetadata.set(section, {
            scrollLeft: currentScrollLeft,
            wasFullyOffscreen: nextState === "exited-left"
              ? contentRight < entryLeftBoundary
              : contentLeft > entryRightBoundary,
          });
        } else if (nextState === "active") {
          exitMetadata.delete(section);
        }
        const pendingTimer = pendingRightColumnTimers.get(section);
        if (pendingTimer !== undefined) {
          window.clearTimeout(pendingTimer);
          pendingRightColumnTimers.delete(section);
        }

        const leftGroups: HTMLElement[][] = [];
        const rightGroups: HTMLElement[][] = [];

        leftGroupMeasurements.forEach((group) => leftGroups.push(group.targets));
        rightGroupMeasurements.forEach((group) => rightGroups.push(group.targets));

        if (nextState !== "active") {
          [...leftGroups, ...rightGroups].forEach((groupTargets) => setGroupActive(groupTargets, false));
          return;
        }

        leftGroups.forEach((groupTargets) => setGroupActive(groupTargets, true));
        const timer = window.setTimeout(() => {
          pendingRightColumnTimers.delete(section);
          if (sectionStates.get(section) === "active") rightGroups.forEach((groupTargets) => setGroupActive(groupTargets, true));
          scheduleMotionUpdate();
        }, landingExhibitMotion.rightColumnDelayMs);
        pendingRightColumnTimers.set(section, timer);
      });
    };

    const scheduleMotionUpdate = () => {
      if (animationFrame !== null) return;
      animationFrame = window.requestAnimationFrame(updateMotion);
    };

    scrollContainer.addEventListener("scroll", scheduleMotionUpdate, { passive: true });
    window.addEventListener("resize", scheduleMotionUpdate);
    scheduleMotionUpdate();

    return () => {
      scrollContainer.removeEventListener("scroll", scheduleMotionUpdate);
      window.removeEventListener("resize", scheduleMotionUpdate);
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      pendingRightColumnTimers.forEach((timer) => window.clearTimeout(timer));
      targets.forEach((target) => {
        target.classList.remove("is-exhibit-active");
      });
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

        [data-exhibit-motion] {
          opacity: 0;
          transform: translate3d(0, ${landingExhibitMotion.maxTranslateY}px, 0);
          transition: opacity ${landingExhibitMotion.exitDurationMs}ms ease-out, transform ${landingExhibitMotion.exitDurationMs}ms ease-out;
          will-change: opacity, transform;
        }

        [data-exhibit-motion].is-exhibit-active {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          transition-duration: ${landingExhibitMotion.enterDurationMs}ms, ${landingExhibitMotion.enterDurationMs}ms;
        }

      `}</style>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 translate-y-[6px] px-6 py-5 text-white mix-blend-difference md:px-10">
        <div className="flex items-start justify-between">
          <nav aria-label="Archive home" className="pointer-events-auto inline-flex -translate-x-[6px] -translate-y-4 items-center text-xs tracking-tight">
            <Link href="/" onClick={returnToReel} className="font-bold text-inherit transition-opacity hover:opacity-60" style={{ fontWeight: 700 }}>huyk</Link>
          </nav>
          <nav aria-label="Archive eras" className={`pointer-events-auto grid origin-top-right -translate-x-[2px] -translate-y-4 scale-[1.15] justify-items-end gap-[6px] text-[15px] font-bold leading-[1.25] transition-opacity duration-700 md:text-[17px] ${phase === "eras" ? "opacity-100" : "pointer-events-none opacity-0"}`}>
            {indexEntries.map((entry) => (
              <Link key={entry.href} href={entry.href} onClick={entry.href === "/contact" ? returnToEnding : undefined} className="landing-era-link group cursor-pointer py-0.5 text-inherit transition-opacity duration-[600ms] hover:opacity-60">
                <span className="landing-era-label">{entry.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <div ref={exhibitionScrollRef} className="landing-exhibition-scroll h-full overflow-x-auto overflow-y-hidden">
        <div className="flex h-full min-w-max">
          <section ref={reelTransitionRef} className="relative h-full w-[194vw] shrink-0">
              <section ref={reelLayerRef} className="absolute left-0 top-0 h-full w-[100vw] overflow-hidden bg-[#EDEDED] will-change-transform">
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

            <section className="absolute left-[100vw] top-0 z-10 flex h-full w-[94vw] items-center gap-[10vw] bg-[#EDEDED] px-[10vw]">
              <img src={landingExhibition.introduceImage.src} alt={landingExhibition.introduceImage.alt} className="block h-[calc(100svh-10rem)] w-auto max-w-[42vw] translate-x-[110px] object-contain" />
              <div className="w-[32vw] min-w-[24rem] max-w-[34rem] text-left text-[15px] leading-[1.55] tracking-[-0.025em] [word-break:keep-all] [overflow-wrap:break-word]">
                <p>이 사이트에 방문 하신 것을 진심으로 환영합니다!</p>
                <p className="mt-6">단순한 포트폴리오 사이트처럼 작업물을 단순히 나열하지 않고 제가 이 분야를 작업하면서 보낸 시간의 흐름으로 성장 과정을 기록합니다.</p>
                <p className="mt-10">전체적인 방향은 전시(Gallery)와 회고록(Archive)의 중간 지점으로 기획해 제작했으며 방문자분들은 “이 사람이 어떤 과정을 거쳐 성장해왔는지”를 자연스럽게 봐주시면 감사하겠습니다.</p>
              </div>
            </section>
          </section>

          <section className="relative h-full min-w-[92vw] shrink-0 bg-[#EDEDED] px-[6vw]">
            <div data-exhibit-section className="landing-exhibit-section relative h-full">
              <div data-exhibit-motion="true" data-exhibit-motion-group="2023-copy" className="absolute left-[5vw] top-[calc(11svh+1.35rem)] w-[44vw] min-w-[22rem] max-w-none">
                <h2 className="text-[clamp(17px,1.8vw,31px)] font-normal leading-none tracking-[-0.05em]">2023</h2>
              </div>

              <div data-exhibit-motion="true" data-exhibit-motion-group="2023-copy" className="absolute bottom-[calc(53.063svh-0.1521rem)] left-[5vw] w-[44vw] min-w-[22rem] max-w-none text-[14px] leading-[1.4] tracking-[-0.04em] [word-break:keep-all] [overflow-wrap:break-word]">
                {(landingYearDescriptions.get("2023") ?? []).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>

              <div className="absolute left-[5vw] top-[calc(54svh+1.35rem)]">
                <ExhibitionPreview preview={landingExhibition.preview2023.imac} className="h-[calc(38.3328svh-1.1979rem)] aspect-video" />
              </div>

              <div className="absolute left-[calc(40vw-10px)] top-[calc(54svh+1.35rem)]">
                <ExhibitionPreview preview={landingExhibition.preview2023.toyWorld} className="h-[calc(35.937svh-1.1979rem)] aspect-video" />
              </div>
            </div>
          </section>

          <section className="relative h-full min-w-[92vw] shrink-0 bg-[#EDEDED] px-[6vw]">
            <div data-exhibit-section className="landing-exhibit-section relative h-full">
              <div data-exhibit-motion="true" data-exhibit-motion-group="2024-copy" className="absolute left-[5vw] top-[calc(11svh+1.35rem)] w-[36vw] min-w-[22rem] max-w-[42rem]">
                <h2 className="text-[clamp(17px,1.8vw,31px)] font-normal leading-none tracking-[-0.05em]">2024</h2>
              </div>

              <div data-exhibit-motion="true" data-exhibit-motion-group="2024-copy" className="absolute bottom-[calc(53.063svh-0.1521rem)] left-[5vw] w-[44vw] min-w-[22rem] max-w-none text-[14px] leading-[1.4] tracking-[-0.04em] [word-break:keep-all] [overflow-wrap:break-word]">
                {landingExhibition.preview2024Content.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>

              <div className="absolute left-[5vw] top-[calc(54svh+1.35rem)]">
                <ExhibitionPreview preview={landingExhibition.preview2024[0]} className="h-[calc(38.3328svh-1.1979rem)] aspect-video" />
              </div>

              <p data-exhibit-motion="true" data-exhibit-motion-group="2024-right-preview" className="absolute left-[calc(45vw-10px)] top-[calc(6svh+1.35rem)] text-sm font-bold tracking-tight">{landingExhibition.preview2024Content.eyebrow}</p>
              <div className="absolute left-[calc(45vw-10px)] top-[calc(11svh+1.35rem)]">
                <ExhibitionPreview preview={landingExhibition.preview2024[2]} motionGroup="2024-right-preview" className="h-[calc(35.937svh-1.1979rem)] aspect-video" />
              </div>
            </div>
          </section>

          <section className="relative h-full min-w-[92vw] shrink-0 bg-[#EDEDED] px-[6vw]">
            <div data-exhibit-section className="landing-exhibit-section relative h-full">
              <div className="absolute left-[15vw] top-[calc(11svh+1.35rem)]">
                <ExhibitionPreview preview={landingExhibition.preview2025.gameboy} className="h-[calc(35.937svh-1.1979rem)] aspect-video" />
              </div>

              <div data-exhibit-motion="true" className="absolute left-[calc(47vw-10px)] top-[calc(11svh+1.35rem)] w-[44vw] min-w-[22rem] max-w-none">
                <h2 className="text-[clamp(17px,1.8vw,31px)] font-normal leading-none tracking-[-0.05em]">2025</h2>
                <div className="mt-[4.5svh] text-[14px] leading-[1.4] tracking-[-0.04em] [word-break:keep-all] [overflow-wrap:break-word]">
                  {(landingYearDescriptions.get("2025") ?? []).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </div>

              <div className="absolute left-[calc(47vw-10px)] top-[calc(54svh+1.35rem)]">
                <ExhibitionPreview preview={landingExhibition.preview2025.angel} className="h-[calc(38.3328svh-1.1979rem)] aspect-video" />
              </div>
            </div>
          </section>

          <section ref={endingTransitionRef} className="relative h-full w-[236vw] shrink-0 bg-[#EDEDED]">
            <section ref={endingYearLayerRef} className="absolute left-0 top-0 h-full w-[136vw] bg-[#EDEDED] px-[6vw] will-change-transform">
              <div data-exhibit-section data-exhibit-year="2026" className="landing-exhibit-section relative h-full">
                <div data-exhibit-motion="true" className="absolute left-[15vw] top-[calc(11svh+1.35rem)] w-[44vw] min-w-[22rem] max-w-none">
                  <h2 className="text-[clamp(17px,1.8vw,31px)] font-normal leading-none tracking-[-0.05em]">2026</h2>
                  <div className="mt-[4.5svh] text-[14px] leading-[1.4] tracking-[-0.04em] [word-break:keep-all] [overflow-wrap:break-word]">
                    {(landingYearDescriptions.get("2026") ?? []).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                </div>

                <div className="absolute left-[15vw] top-[calc(54svh+1.35rem)]">
                  <ExhibitionPreview preview={landingExhibition.preview2026.galaxy} className="h-[calc(38.3328svh-1.1979rem)] aspect-video" />
                </div>

                <div ref={endingLastMediaGroupRef} className="absolute left-[calc(48vw-10px)] top-[calc(11svh+1.35rem)] flex gap-[2vw]">
                  <ExhibitionPreview preview={landingExhibition.preview2026.artworks} motionGroup="2026-right-preview" className="h-[calc(81.3328svh-1.1979rem)] aspect-[4/5]" />
                  <ExhibitionPreview preview={landingExhibition.preview2026.aiVideo} motionGroup="2026-right-preview" className="h-[calc(81.3328svh-1.1979rem)] aspect-[3712/4608]" />
                </div>
              </div>
            </section>

            <section ref={endingSectionRef} className="absolute left-[124vw] top-0 z-10 flex h-full w-[112vw] items-center justify-center bg-[#111111] px-[10vw] text-center text-[#F2F2F2]">
              <div ref={endingContentRef} className="space-y-9 text-[15px] leading-[1.45]">
                <div>
                  <p className="text-[16px] font-bold">Insta</p>
                  <a href="https://www.instagram.com/huyk_3d/" target="_blank" rel="noreferrer" className="mt-2 inline-block font-normal transition-opacity hover:opacity-60">huyk_3d</a>
                </div>
                <div>
                  <p className="text-[16px] font-bold">Discord</p>
                  <p className="mt-2 font-normal">kkkkkkh</p>
                </div>
                <div>
                  <p className="text-[16px] font-bold">Email</p>
                  <a href="mailto:kwonhy5300@naver.com" className="mt-2 inline-block font-normal transition-opacity hover:opacity-60">kwonhy5300@naver.com</a>
                </div>
              </div>
            </section>
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
