"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const menuPages = Array.from({ length: 16 }, (_, index) => ({
  image: `/menu/page-${String(index + 1).padStart(2, "0")}.webp`,
  pageNumber: index + 1,
}));

export function MenuBook() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isTurning, setIsTurning] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const bookRef = useRef<HTMLDivElement>(null);
  const closedBookRef = useRef<HTMLButtonElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const openBookRef = useRef<HTMLDivElement>(null);
  const leftPageRef = useRef<HTMLDivElement>(null);
  const rightPageRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef(0);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 760px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const firstPage = 0;
  const lastPage = isMobile ? menuPages.length - 1 : menuPages.length - 2;
  const pageStep = isMobile ? 1 : 2;
  const visiblePageIndex = isMobile ? pageIndex : pageIndex - (pageIndex % 2);

  const openBook = async () => {
    if (isOpen || isOpening) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setIsOpen(true);
      return;
    }

    setIsOpening(true);
    const { gsap } = await import("gsap");
    const timeline = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        setIsOpen(true);
        setIsOpening(false);
      },
    });
    timeline
      .to(closedBookRef.current, { scale: 1.025, duration: 0.18 })
      .to(coverRef.current, { rotateY: -68, y: -8, duration: 0.7, transformOrigin: "left center" })
      .to(closedBookRef.current, { autoAlpha: 0, duration: 0.22 }, "-=0.25")
      .fromTo(openBookRef.current, { autoAlpha: 0, scale: 0.91 }, { autoAlpha: 1, scale: 1, duration: 0.58 }, "-=0.24");
  };

  const turnPage = useCallback(async (direction: "previous" | "next") => {
    if (!isOpen || isTurning) return;
    const target = Math.max(firstPage, Math.min(lastPage, visiblePageIndex + (direction === "next" ? pageStep : -pageStep)));
    if (target === visiblePageIndex) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setPageIndex(target);
      return;
    }

    setIsTurning(true);
    const { gsap } = await import("gsap");
    const page = direction === "next" ? rightPageRef.current : leftPageRef.current;
    const outgoingAngle = direction === "next" ? -9 : 9;
    const incomingAngle = -outgoingAngle;
    const timeline = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => setIsTurning(false),
    });
    timeline
      .to(page, { rotateY: outgoingAngle, filter: "brightness(.62)", opacity: 0.42, duration: 0.36, transformOrigin: direction === "next" ? "left center" : "right center" })
      .call(() => setPageIndex(target))
      .set(page, { rotateY: incomingAngle })
      .to(page, { rotateY: 0, filter: "brightness(1)", opacity: 1, duration: 0.4 });
  }, [firstPage, isOpen, isTurning, lastPage, pageStep, visiblePageIndex]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") turnPage("previous");
      if (event.key === "ArrowRight") turnPage("next");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [turnPage]);

  const rightPageIndex = isMobile ? visiblePageIndex : Math.min(visiblePageIndex + 1, menuPages.length - 1);
  const handleTouchEnd = (event: React.TouchEvent) => {
    const movement = event.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(movement) > 45) turnPage(movement < 0 ? "next" : "previous");
  };

  return (
    <div
      className="menu-stage"
      onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }}
      onTouchEnd={handleTouchEnd}
    >
      <div ref={bookRef} className={`digital-menu-book ${isOpen ? "is-open" : ""} ${isOpening ? "is-opening" : ""}`}>
        <button ref={closedBookRef} className="closed-book" type="button" onClick={openBook} aria-label="Open ABURII menu book">
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

        <div ref={openBookRef} className="open-book-frame" aria-live="polite">
          <span className="open-book-cover-underlay" aria-hidden="true" />
          <div ref={leftPageRef} className="book-page book-page-left">
            <Image src={menuPages[visiblePageIndex].image} alt={`ABURII menu page ${menuPages[visiblePageIndex].pageNumber}`} fill sizes="(max-width: 760px) 88vw, 42vw" priority={visiblePageIndex < 4} />
          </div>
          <div ref={rightPageRef} className="book-page book-page-right">
            <Image src={menuPages[rightPageIndex].image} alt={`ABURII menu page ${menuPages[rightPageIndex].pageNumber}`} fill sizes="(max-width: 760px) 88vw, 42vw" priority={rightPageIndex < 4} />
          </div>
          <span className="book-gutter" aria-hidden="true" />
        </div>

        <button className="book-nav-button book-nav-previous" type="button" aria-label="Previous menu page" disabled={!isOpen || visiblePageIndex <= firstPage || isTurning} onClick={() => turnPage("previous")}><ChevronLeft /></button>
        <button className="book-nav-button book-nav-next" type="button" aria-label="Next menu page" disabled={!isOpen || visiblePageIndex >= lastPage || isTurning} onClick={() => turnPage("next")}><ChevronRight /></button>

        {isOpen && <>
          <span className="book-page-counter">{isMobile ? `Page ${visiblePageIndex + 1} of ${menuPages.length}` : `Pages ${visiblePageIndex + 1}–${rightPageIndex + 1} of ${menuPages.length}`}</span>
          <button className="book-fullscreen" type="button" onClick={() => bookRef.current?.requestFullscreen?.()} aria-label="View menu fullscreen"><Maximize2 size={16} /><span>Fullscreen</span></button>
        </>}
      </div>
    </div>
  );
}
