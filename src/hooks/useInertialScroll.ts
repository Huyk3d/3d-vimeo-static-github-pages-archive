"use client";

import { useEffect } from "react";
import type { RefObject } from "react";

export const inertialScrollSettings = {
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

export const projectMediaLightboxStateEvent = "huyk:project-media-lightbox-state";

type ScrollAxis = "x" | "y";

export function useInertialScroll<T extends HTMLElement>(
  scrollContainerRef: RefObject<T>,
  axis: ScrollAxis = "x",
) {
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let animationFrame: number | null = null;
    let lastFrameTime: number | null = null;
    let targetScrollPosition = axis === "x" ? scrollContainer.scrollLeft : scrollContainer.scrollTop;
    let lastProgrammaticScrollPosition: number | null = null;

    const getCurrentScrollPosition = () => axis === "x" ? scrollContainer.scrollLeft : scrollContainer.scrollTop;
    const setCurrentScrollPosition = (value: number) => {
      if (axis === "x") scrollContainer.scrollLeft = value;
      else scrollContainer.scrollTop = value;
    };
    const getMaxScrollPosition = () => Math.max(0, axis === "x"
      ? scrollContainer.scrollWidth - scrollContainer.clientWidth
      : scrollContainer.scrollHeight - scrollContainer.clientHeight);
    const clampScrollPosition = (value: number) => Math.min(getMaxScrollPosition(), Math.max(0, value));

    const stopInertia = () => {
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      animationFrame = null;
      lastFrameTime = null;
    };

    const applyScrollPosition = (value: number) => {
      lastProgrammaticScrollPosition = value;
      setCurrentScrollPosition(value);
    };

    const syncTargetToActualScroll = () => {
      targetScrollPosition = clampScrollPosition(getCurrentScrollPosition());
      lastProgrammaticScrollPosition = null;
      stopInertia();
    };

    const stepInertia = (timestamp: number) => {
      const elapsedSeconds = lastFrameTime === null
        ? 1 / 60
        : Math.min(0.05, (timestamp - lastFrameTime) / 1000);
      lastFrameTime = timestamp;

      const currentScrollPosition = getCurrentScrollPosition();
      targetScrollPosition = clampScrollPosition(targetScrollPosition);
      const remainingDistance = targetScrollPosition - currentScrollPosition;

      if (Math.abs(remainingDistance) <= inertialScrollSettings.stopDistancePx) {
        if (currentScrollPosition !== targetScrollPosition) applyScrollPosition(targetScrollPosition);
        animationFrame = null;
        lastFrameTime = null;
        return;
      }

      const interpolation = 1 - Math.exp(-inertialScrollSettings.responsePerSecond * elapsedSeconds);
      const nextScrollPosition = clampScrollPosition(currentScrollPosition + remainingDistance * interpolation);
      applyScrollPosition(nextScrollPosition);

      if (nextScrollPosition === 0 || nextScrollPosition === getMaxScrollPosition()) {
        targetScrollPosition = nextScrollPosition;
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
      if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) return delta * inertialScrollSettings.lineDeltaPx;
      if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
        return delta * (axis === "x" ? scrollContainer.clientWidth : scrollContainer.clientHeight) * inertialScrollSettings.pageDeltaViewportRatio;
      }
      return delta;
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      const rawDelta = axis === "x"
        ? (event.deltaX !== 0 ? event.deltaX : event.deltaY)
        : event.deltaY;
      if (rawDelta === 0) return;

      const delta = normalizeWheelDelta(event, rawDelta);
      const isTrackpadLike = event.deltaMode === WheelEvent.DOM_DELTA_PIXEL
        && Math.abs(delta) < inertialScrollSettings.trackpadDeltaThresholdPx;
      const inputGain = isTrackpadLike
        ? inertialScrollSettings.trackpadInputGain
        : inertialScrollSettings.mouseWheelInputGain;
      const currentScrollPosition = getCurrentScrollPosition();
      const remainingDistance = targetScrollPosition - currentScrollPosition;

      if (Math.sign(delta) !== Math.sign(remainingDistance)
        && Math.abs(remainingDistance) > inertialScrollSettings.directionChangeThresholdPx) {
        targetScrollPosition = currentScrollPosition;
      }

      targetScrollPosition = clampScrollPosition(targetScrollPosition + delta * inputGain);
      startInertia();
    };

    const handleScroll = () => {
      const actualScrollPosition = getCurrentScrollPosition();
      if (lastProgrammaticScrollPosition !== null
        && Math.abs(actualScrollPosition - lastProgrammaticScrollPosition) <= inertialScrollSettings.recentWriteTolerancePx) {
        return;
      }

      syncTargetToActualScroll();
    };

    const handleResize = () => {
      const nextScrollPosition = clampScrollPosition(getCurrentScrollPosition());
      if (nextScrollPosition !== getCurrentScrollPosition()) applyScrollPosition(nextScrollPosition);
      syncTargetToActualScroll();
    };

    const handleLightboxState = () => {
      syncTargetToActualScroll();
    };

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    window.addEventListener("pageshow", syncTargetToActualScroll);
    window.addEventListener("popstate", syncTargetToActualScroll);
    window.addEventListener(projectMediaLightboxStateEvent, handleLightboxState);

    return () => {
      scrollContainer.removeEventListener("wheel", handleWheel);
      scrollContainer.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pageshow", syncTargetToActualScroll);
      window.removeEventListener("popstate", syncTargetToActualScroll);
      window.removeEventListener(projectMediaLightboxStateEvent, handleLightboxState);
      stopInertia();
    };
  }, [axis, scrollContainerRef]);
}
