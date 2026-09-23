"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { getTranslations, localizedPath, RESERVATION_URL, type Locale } from "@/lib/i18n";
import { siteImages } from "@/lib/site-images";
import { SiteNav } from "./SiteChrome";

export function HomeHero({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cleanup = () => {};
    (async () => {
      const gsapModule = await import("gsap");
      const triggerModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.gsap;
      const ScrollTrigger = triggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        const scenes = gsap.utils.toArray<HTMLElement>(".hero-scene");
        const viewportWidth = window.innerWidth;
        const sceneScale = viewportWidth < 640 ? 1.045 : viewportWidth < 1024 ? 1.07 : 1.12;
        const exitScale = viewportWidth < 640 ? 1.035 : viewportWidth < 1024 ? 1.055 : 1.08;
        gsap.set(scenes[1], { opacity: 0, scale: 1.04 });
        gsap.set(scenes[2], { opacity: 0, scale: 1.05 });
        const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 1 } });
        tl.to(scenes[0], { scale: sceneScale, opacity: 0, duration: 1.15, ease: "none" }, 0)
          .to(scenes[1], { opacity: 1, scale: 1, duration: .85, ease: "none" }, .55)
          .to(scenes[1], { opacity: 0, scale: exitScale, duration: .9, ease: "none" }, 1.55)
          .to(scenes[2], { opacity: 1, scale: 1, duration: 1.05, ease: "none" }, 1.45);
      }, root);
      const onMove = (event: PointerEvent) => {
        if (window.innerWidth < 1024 || !root.current) return;
        const x = (event.clientX / window.innerWidth - .5) * 10;
        const y = (event.clientY / window.innerHeight - .5) * 7;
        gsap.to(root.current.querySelectorAll(".hero-scene img"), { x, y, duration: 1.4, ease: "power2.out", overwrite: true });
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      cleanup = () => { window.removeEventListener("pointermove", onMove); ctx.revert(); };
    })();
    return () => cleanup();
  }, []);

  return (
    <section className="home-hero" ref={root} aria-label={t.home.heroLabel}>
      <SiteNav locale={locale} />
      <div className="hero-sticky">
        <div className="hero-scene scene-one"><Image src={siteImages.wagyuPlatter} alt={t.home.imageAlts.wagyuPlatter} fill priority sizes="100vw" /></div>
        <div className="hero-scene scene-two"><Image src={siteImages.wagyuGrill} alt={t.home.imageAlts.wagyuGrill} fill priority sizes="100vw" /></div>
        <div className="hero-scene scene-final"><Image src={siteImages.diningRoom} alt={t.home.imageAlts.diningRoom} fill priority sizes="100vw" /></div>
        <div className="hero-vignette" />
        <div className="hero-copy">
          <h1>ABURII</h1><p className="hero-kicker">{t.home.heroKicker}</p><p className="hero-sub">{t.home.heroSub}</p>
          <div className="hero-buttons"><Link className="solid-button" href={localizedPath(locale, "/menu")}>{t.home.viewMenu}</Link><a className="ghost-button" href={RESERVATION_URL} target="_blank" rel="noopener noreferrer">{t.nav.reserve}</a></div>
        </div>
        <span className="scroll-cue">{t.home.scroll}</span>
      </div>
    </section>
  );
}
