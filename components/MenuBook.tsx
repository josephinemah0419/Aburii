"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const pages = Array.from({ length: 16 }, (_, i) => `/menu/page-${String(i + 1).padStart(2, "0")}.jpg`);

export function MenuBook() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [direction, setDirection] = useState<"next" | "prev" | "">("");
  const [mobile, setMobile] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const touchStart = useRef(0);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 900px)");
    const update = () => setMobile(media.matches);
    update(); media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  const maxIndex = mobile ? 15 : 14;
  const step = mobile ? 1 : 2;
  const turn = (dir: "next" | "prev") => {
    setDirection(dir);
    window.setTimeout(() => {
      setPage((current) => Math.max(0, Math.min(maxIndex, current + (dir === "next" ? step : -step))));
      setDirection("");
    }, 185);
  };
  const onTouchEnd = (event: React.TouchEvent) => {
    const distance = event.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(distance) > 45) turn(distance < 0 ? "next" : "prev");
  };
  const rightPage = mobile ? page : Math.min(page + 1, pages.length - 1);
  return (
    <div className="menu-stage" onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }} onTouchEnd={onTouchEnd}>
      <div ref={root} className={`menu-book ${open ? "open" : ""} ${direction ? `page-turning ${direction}` : ""}`}>
        <button className="book-closed" type="button" onClick={() => setOpen(true)} aria-label="Open ABURII menu book"><Image src="/images/menu-closed.png" alt="ABURII premium black menu book" fill priority sizes="80vw" /></button>
        <div className="book-open" aria-live="polite">
          <div className="menu-sheet left"><Image src={pages[page]} alt={`ABURII menu page ${page + 1}`} fill sizes="40vw" priority={page < 4} /></div>
          <div className="menu-sheet right"><Image src={pages[rightPage]} alt={`ABURII menu page ${rightPage + 1}`} fill sizes="(max-width: 900px) 82vw, 40vw" priority={rightPage < 4} /></div>
          <div className="book-spine" />
        </div>
        {open && <>
          <button className="menu-arrow prev" type="button" aria-label="Previous menu pages" disabled={page <= (mobile ? 0 : 1)} onClick={() => turn("prev")}><ChevronLeft /></button>
          <button className="menu-arrow next" type="button" aria-label="Next menu pages" disabled={page >= maxIndex} onClick={() => turn("next")}><ChevronRight /></button>
          <span className="menu-counter">{mobile ? `Page ${page + 1} of 16` : `Pages ${page + 1}–${Math.min(page + 2, 16)} of 16`}</span>
          <button className="fullscreen-button" type="button" onClick={() => root.current?.requestFullscreen?.()} aria-label="View menu fullscreen"><Maximize2 size={16} /><span>Fullscreen</span></button>
        </>}
      </div>
    </div>
  );
}
