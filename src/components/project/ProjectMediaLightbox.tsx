"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent, ReactNode } from "react";
import { createPortal } from "react-dom";

export type ProjectMediaItem =
  | { type: "image"; src: string; alt: string }
  | {
      type: "vimeo" | "youtube";
      src: string;
      title: string;
      thumbnailSrc: string;
      aspectRatio: string;
    };

function withAutoplay(src: string) {
  return `${src}${src.includes("?") ? "&" : "?"}autoplay=1`;
}

export function ProjectMediaButton({
  className = "",
  label,
  onOpen,
  children,
  onPointerEnter,
  onPointerMove,
  onPointerLeave,
}: {
  className?: string;
  label: string;
  onOpen: () => void;
  children: ReactNode;
  onPointerEnter?: (event: PointerEvent<HTMLButtonElement>) => void;
  onPointerMove?: (event: PointerEvent<HTMLButtonElement>) => void;
  onPointerLeave?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`group select-none overflow-hidden border-0 bg-transparent p-0 [-webkit-user-select:none] ${className}`}
      onClick={onOpen}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </button>
  );
}

export function ProjectVideoThumbnail({
  thumbnailSrc,
  title,
  className = "",
  onOpen,
}: {
  thumbnailSrc: string;
  title: string;
  className?: string;
  onOpen: () => void;
}) {
  const cursorLabelRef = useRef<HTMLDivElement>(null);
  const [isCursorLabelVisible, setIsCursorLabelVisible] = useState(false);

  const moveCursorLabel = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;

    const label = cursorLabelRef.current;
    if (!label) return;

    const edge = 8;
    const x = Math.min(event.clientX + 16, window.innerWidth - label.offsetWidth - edge);
    const y = Math.min(event.clientY + 18, window.innerHeight - label.offsetHeight - edge);
    label.style.transform = `translate3d(${Math.max(edge, x)}px, ${Math.max(edge, y)}px, 0)`;
  };

  const showCursorLabel = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;

    setIsCursorLabelVisible(true);
    moveCursorLabel(event);
    requestAnimationFrame(() => moveCursorLabel(event));
  };

  return (
    <>
      <ProjectMediaButton
        label={`Open ${title} video`}
        className={`relative text-white ${className}`}
        onOpen={onOpen}
        onPointerEnter={showCursorLabel}
        onPointerMove={moveCursorLabel}
        onPointerLeave={() => setIsCursorLabelVisible(false)}
      >
        <img
          src={thumbnailSrc}
          alt={`${title} video thumbnail`}
          draggable={false}
          className="h-full w-full object-cover transition-transform duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025] group-hover:duration-[2200ms]"
        />
        <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[34px] leading-none">▶</span>
      </ProjectMediaButton>
      <div
        ref={cursorLabelRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] whitespace-nowrap rounded-[2px] bg-black px-[9px] py-[6px] text-[11px] leading-none text-white transition-[opacity,transform] duration-[180ms] ease-out"
        style={{
          opacity: isCursorLabelVisible ? 1 : 0,
          transform: "translate3d(-200px, -200px, 0)",
          transitionDuration: "180ms, 55ms",
          willChange: "transform, opacity",
        }}
      >
        Play
      </div>
    </>
  );
}

export function ProjectMediaLightbox({
  media,
  activeIndex,
  onClose,
  onNavigate,
}: {
  media: readonly ProjectMediaItem[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const imageElementRef = useRef<HTMLImageElement>(null);
  const videoElementRef = useRef<HTMLDivElement>(null);
  const activeMedia = activeIndex === null ? null : media[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, onClose]);

  if (!activeMedia || typeof document === "undefined") return null;

  const videoAspectParts = activeMedia.type === "image" ? [] : activeMedia.aspectRatio.split("/").map(Number);
  const videoAspectRatio = videoAspectParts.length === 2 && videoAspectParts[0] > 0 && videoAspectParts[1] > 0
    ? videoAspectParts[0] / videoAspectParts[1]
    : 1;

  const navigate = (direction: -1 | 1) => {
    if (activeIndex === null) return;

    if (activeIndex === 0 && direction === -1) {
      onClose();
      return;
    }

    const nextIndex = activeIndex + direction;
    if (nextIndex >= 0 && nextIndex < media.length) onNavigate(nextIndex);
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={activeMedia.type === "image" ? activeMedia.alt : activeMedia.title}
      className="fixed inset-0 z-[200] flex select-none items-center justify-center bg-black/[0.8] p-2 [-webkit-user-select:none]"
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;

        const bounds = (activeMedia.type === "image" ? imageElementRef.current : videoElementRef.current)?.getBoundingClientRect();
        if (!bounds || event.clientY < bounds.top || event.clientY > bounds.bottom) return;
        if (event.clientX < bounds.left) navigate(-1);
        if (event.clientX > bounds.right) navigate(1);
      }}
      onWheel={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        aria-label="Close media"
        className="fixed right-6 top-[2px] text-[38px] font-normal leading-none text-neutral-400 transition-colors hover:text-white"
        onClick={onClose}
      >
        ×
      </button>
      {activeMedia.type === "image" ? (
        <img
          ref={imageElementRef}
          src={activeMedia.src}
          alt={activeMedia.alt}
          draggable={false}
          className="block h-auto w-auto max-h-[calc(100svh-1rem)] max-w-[99vw]"
        />
      ) : (
        <div
          ref={videoElementRef}
          className="w-auto max-w-[99vw] overflow-hidden bg-black"
          style={{ aspectRatio: activeMedia.aspectRatio, height: `min(calc(100svh - 1rem), calc(99vw / ${videoAspectRatio}))` }}
        >
          <iframe
            key={activeIndex}
            src={withAutoplay(activeMedia.src)}
            title={activeMedia.title}
            className="h-full w-full border-0"
            allow={activeMedia.type === "youtube" ? "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" : "autoplay; fullscreen; picture-in-picture"}
            allowFullScreen
          />
        </div>
      )}
    </div>,
    document.body,
  );
}

export function useProjectMediaLightbox(media: readonly ProjectMediaItem[]) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return {
    openMedia: setActiveIndex,
    lightbox: (
      <ProjectMediaLightbox
        media={media}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    ),
  };
}
