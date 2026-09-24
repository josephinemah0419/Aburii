"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { getTranslations, type Locale } from "@/lib/i18n";

const menuPages = Array.from({ length: 16 }, (_, index) => ({
  image: `/menu/page-${String(index + 1).padStart(2, "0")}.webp`,
  pageNumber: index + 1,
}));

type LayoutMode = "single" | "spread";
type TurnDirection = "previous" | "next";
type KillableTimeline = { kill: () => void };

export function MenuBook({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isTurning, setIsTurning] = useState(false);
  const [turnDirection, setTurnDirection] = useState<TurnDirection | null>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("spread");
  const [simpleMotion, setSimpleMotion] = useState(false);
  const [canFullscreen, setCanFullscreen] = useState(false);

  const bookRef = useRef<HTMLDivElement>(null);
  const closedBookRef = useRef<HTMLButtonElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const openBookRef = useRef<HTMLDivElement>(null);
  const leftPageRef = useRef<HTMLDivElement>(null);
  const rightPageRef = useRef<HTMLDivElement>(null);
  const openingLock = useRef(false);
  const turningLock = useRef(false);
  const layoutModeRef = useRef<LayoutMode>("spread");
  const activeTimeline = useRef<KillableTimeline | null>(null);
  const pointerStart = useRef<{ x: number; y: number; id: number } | null>(null);

  const isSinglePage = layoutMode === "single";
  const visiblePageIndex = isSinglePage ? pageIndex : pageIndex - (pageIndex % 2);
  const lastVisibleIndex = isSinglePage
    ? menuPages.length - 1
    : Math.floor((menuPages.length - 1) / 2) * 2;
  const rightPageIndex = isSinglePage
    ? visiblePageIndex
    : visiblePageIndex + 1 < menuPages.length
      ? visiblePageIndex + 1
      : null;

  const clearAnimatedStyles = useCallback(() => {
    for (const element of [closedBookRef.current, coverRef.current, openBookRef.current, leftPageRef.current, rightPageRef.current]) {
      if (!element) continue;
      element.style.removeProperty("transform");
      element.style.removeProperty("opacity");
      element.style.removeProperty("visibility");
      element.style.removeProperty("filter");
    }
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 820px), (max-width: 1100px) and (orientation: portrait)");
    const updateLayout = () => {
      const nextMode: LayoutMode = query.matches ? "single" : "spread";
      if (layoutModeRef.current === nextMode) return;
      activeTimeline.current?.kill();
      activeTimeline.current = null;
      clearAnimatedStyles();
      if (openingLock.current) setIsOpen(true);
      openingLock.current = false;
      turningLock.current = false;
      layoutModeRef.current = nextMode;
      setIsOpening(false);
      setIsTurning(false);
      setTurnDirection(null);
      setLayoutMode(nextMode);
    };

    updateLayout();
    query.addEventListener("change", updateLayout);
    setSimpleMotion(/iPad|iPhone|iPod/.test(window.navigator.userAgent));
    setCanFullscreen(Boolean(document.fullscreenEnabled && bookRef.current?.requestFullscreen));
    return () => {
      query.removeEventListener("change", updateLayout);
      activeTimeline.current?.kill();
    };
  }, [clearAnimatedStyles]);

  useEffect(() => {
    const nearby = new Set<number>();
    const step = isSinglePage ? 1 : 2;
    for (const index of [visiblePageIndex - step, visiblePageIndex, visiblePageIndex + 1, visiblePageIndex + step, visiblePageIndex + step + 1]) {
      if (index >= 0 && index < menuPages.length) nearby.add(index);
    }
    for (const index of nearby) {
      const preload = new window.Image();
      preload.src = menuPages[index].image;
    }
  }, [isSinglePage, visiblePageIndex]);

  const releaseTurnLock = useCallback(() => {
    activeTimeline.current = null;
    turningLock.current = false;
    setIsTurning(false);
    setTurnDirection(null);
  }, []);

  const openBook = useCallback(async () => {
    if (isOpen || openingLock.current) return;
    openingLock.current = true;
    setIsOpening(true);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setIsOpen(true);
      setIsOpening(false);
      openingLock.current = false;
      return;
    }

    const { gsap } = await import("gsap");
    const simplified = simpleMotion || isSinglePage;
    const timeline = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        activeTimeline.current = null;
        setIsOpen(true);
        setIsOpening(false);
        openingLock.current = false;
        clearAnimatedStyles();
      },
    });
    activeTimeline.current = timeline;

    if (simplified) {
      timeline
        .to(closedBookRef.current, { scale: 0.985, opacity: 0, duration: 0.28 })
        .fromTo(openBookRef.current, { autoAlpha: 0, scale: 0.97 }, { autoAlpha: 1, scale: 1, duration: 0.42 }, "-=0.12");
      return;
    }

    timeline
      .to(closedBookRef.current, { scale: 1.012, duration: 0.16 })
      .to(coverRef.current, { rotateY: -72, xPercent: -2, duration: 0.68, transformOrigin: "left center" })
      .to(closedBookRef.current, { autoAlpha: 0, duration: 0.2 }, "-=0.22")
      .fromTo(openBookRef.current, { autoAlpha: 0, scale: 0.94 }, { autoAlpha: 1, scale: 1, duration: 0.52 }, "-=0.2");
  }, [clearAnimatedStyles, isOpen, isSinglePage, simpleMotion]);

  const turnPage = useCallback(async (direction: TurnDirection) => {
    if (!isOpen || openingLock.current || turningLock.current) return;
    const step = isSinglePage ? 1 : 2;
    const target = Math.max(0, Math.min(lastVisibleIndex, visiblePageIndex + (direction === "next" ? step : -step)));
    if (target === visiblePageIndex) return;

    turningLock.current = true;
    setIsTurning(true);
    setTurnDirection(direction);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setPageIndex(target);
      releaseTurnLock();
      return;
    }

    const { gsap } = await import("gsap");
    const page = isSinglePage ? rightPageRef.current : direction === "next" ? rightPageRef.current : leftPageRef.current;
    if (!page) {
      setPageIndex(target);
      releaseTurnLock();
      return;
    }

    const simplified = simpleMotion || isSinglePage;
    const outgoingX = direction === "next" ? -18 : 18;
    const incomingX = -outgoingX;
    const outgoingAngle = direction === "next" ? -11 : 11;
    const incomingAngle = -outgoingAngle;
    const timeline = gsap.timeline({ defaults: { ease: "power2.inOut" }, onComplete: releaseTurnLock });
    activeTimeline.current = timeline;

    if (simplified) {
      timeline
        .to(page, { x: outgoingX, opacity: 0, duration: 0.2 })
        .call(() => flushSync(() => setPageIndex(target)))
        .set(page, { x: incomingX, opacity: 0 })
        .to(page, { x: 0, opacity: 1, duration: 0.24 });
      return;
    }

    timeline
      .to(page, { rotateY: outgoingAngle, filter: "brightness(.66)", opacity: 0.3, duration: 0.3, transformOrigin: direction === "next" ? "left center" : "right center" })
      .call(() => flushSync(() => setPageIndex(target)))
      .set(page, { rotateY: incomingAngle, filter: "brightness(.72)", opacity: 0.35 })
      .to(page, { rotateY: 0, filter: "brightness(1)", opacity: 1, duration: 0.34 });
  }, [isOpen, isSinglePage, lastVisibleIndex, releaseTurnLock, simpleMotion, visiblePageIndex]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, textarea, select, [contenteditable='true']")) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        turnPage("previous");
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        turnPage("next");
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [turnPage]);

  const handlePointerDown = (event: React.PointerEvent) => {
    if (!isOpen || !event.isPrimary) return;
    pointerStart.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
  };

  const handlePointerUp = (event: React.PointerEvent) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start || start.id !== event.pointerId) return;
    const movementX = event.clientX - start.x;
    const movementY = event.clientY - start.y;
    if (Math.abs(movementX) < 52 || Math.abs(movementX) < Math.abs(movementY) * 1.25) return;
    turnPage(movementX < 0 ? "next" : "previous");
  };

  const previousDisabled = !isOpen || isOpening || isTurning || visiblePageIndex <= 0;
  const nextDisabled = !isOpen || isOpening || isTurning || visiblePageIndex >= lastVisibleIndex;

  return (
    <div
      className="menu-stage"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => { pointerStart.current = null; }}
    >
      <div
        ref={bookRef}
        className={`digital-menu-book ${isOpen ? "is-open" : ""} ${isOpening ? "is-opening" : ""} ${simpleMotion ? "is-simple-motion" : ""}`}
        data-layout={layoutMode}
        data-turning={turnDirection ?? undefined}
      >
        <button ref={closedBookRef} className="closed-book" type="button" onClick={openBook} aria-label={t.menu.open} disabled={isOpening}>
          <span className="closed-book-pages" aria-hidden="true" />
          <span ref={coverRef} className="closed-book-cover">
            <span className="book-binding" aria-hidden="true" />
            <span className="book-cover-texture" aria-hidden="true" />
            <span className="book-brand">
              <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M19 45c-4-9 4-14 6-22 5 5 3 10 3 14 5-6 7-12 6-20 10 9 14 19 8 28-5 8-18 9-23 0Z" /><path d="M25 47c-2-5 2-8 5-12 1 4 0 7 2 10 3-3 4-6 4-9 4 5 4 10 0 13-4 4-9 2-11-2Z" /></svg>
              <span>ABURII</span>
            </span>
          </span>
        </button>

        <div ref={openBookRef} className="open-book-frame" aria-live="polite" aria-busy={isTurning}>
          <span className="open-book-cover-underlay" aria-hidden="true" />
          {!isSinglePage && (
            <div ref={leftPageRef} className="book-page book-page-left">
              <Image src={menuPages[visiblePageIndex].image} alt={t.menu.imageAlt(menuPages[visiblePageIndex].pageNumber)} fill sizes="(max-width: 1023px) 86vw, 42vw" priority={visiblePageIndex < 4} draggable={false} />
            </div>
          )}
          <div ref={rightPageRef} className="book-page book-page-right">
            {rightPageIndex === null ? (
              <span className="book-page-blank" aria-hidden="true" />
            ) : (
              <Image src={menuPages[rightPageIndex].image} alt={t.menu.imageAlt(menuPages[rightPageIndex].pageNumber)} fill sizes={isSinglePage ? "(max-width: 1023px) 92vw, 560px" : "42vw"} priority={rightPageIndex < 4} draggable={false} />
            )}
          </div>
          <span className="book-gutter" aria-hidden="true" />
        </div>

        <button className="book-nav-button book-nav-previous" type="button" aria-label={t.menu.previous} disabled={previousDisabled} onClick={() => turnPage("previous")}><ChevronLeft /></button>
        <button className="book-nav-button book-nav-next" type="button" aria-label={t.menu.next} disabled={nextDisabled} onClick={() => turnPage("next")}><ChevronRight /></button>

        {isOpen && <>
          <span className="book-page-counter" role="status">{isSinglePage ? t.menu.page(visiblePageIndex + 1, menuPages.length) : t.menu.pages(visiblePageIndex + 1, (rightPageIndex ?? visiblePageIndex) + 1, menuPages.length)}</span>
          {canFullscreen && <button className="book-fullscreen" type="button" onClick={() => bookRef.current?.requestFullscreen?.()} aria-label={t.menu.fullscreen}><Maximize2 size={16} /><span>{t.menu.fullscreenText}</span></button>}
        </>}
      </div>
    </div>
  );
}
