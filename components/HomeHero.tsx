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
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      const compact = window.innerWidth < 800;
      const ctx = gsap.context(() => {
        const q = gsap.utils.selector(root);
        gsap.set(q(".aburii-fire-stage, .aburii-final-stage, .aburii-hero-cta, .aburii-hero-embers"), { autoAlpha: 0 });
        gsap.set(q(".aburii-hero-plate"), { scale: 1.02 });
        const timeline = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: compact ? .65 : 1 } });
        timeline
          .to(q(".aburii-hero-plate"), { scale: compact ? 1.12 : 1.22, yPercent: -3, duration: 1.05, ease: "power2.inOut" }, 0)
          .to(q(".aburii-hero-opening-copy"), { autoAlpha: .18, y: -22, duration: .62, ease: "power2.out" }, .28)
          .to(q(".aburii-hero-heat"), { opacity: 1, duration: .6, ease: "power2.out" }, .88)
          .to(q(".aburii-hero-plate"), { autoAlpha: 0, scale: compact ? 1.18 : 1.3, duration: .9, ease: "power2.in" }, 1.45)
          .to(q(".aburii-fire-stage"), { autoAlpha: 1, yPercent: 0, duration: .9, ease: "power3.out" }, 1.5)
          .to(q(".aburii-hero-smoke"), { opacity: .82, duration: .72, ease: "power2.out" }, 1.75)
          .to(q(".aburii-hero-embers"), { autoAlpha: 1, duration: .3, ease: "power2.out" }, 2.1)
          .to(q(".aburii-hero-firelight"), { opacity: 1, duration: .42, ease: "power2.out" }, 2.1)
          .to(q(".aburii-hero-opening-copy"), { autoAlpha: 0, duration: .28 }, 2.52)
          .to(q(".aburii-final-stage"), { autoAlpha: 1, scale: 1, duration: .78, ease: "power3.out" }, 2.48)
          .to(q(".aburii-fire-stage"), { autoAlpha: .7, yPercent: 7, duration: .6, ease: "power2.out" }, 2.58)
          .to(q(".aburii-hero-cta"), { autoAlpha: 1, y: 0, duration: .6, ease: "power3.out" }, 2.78);
      }, root);
      const onPointerMove = (event: PointerEvent) => {
        if (window.innerWidth < 1024 || !root.current) return;
        const x = (event.clientX / window.innerWidth - .5) * 11;
        const y = (event.clientY / window.innerHeight - .5) * 8;
        gsap.to(root.current.querySelectorAll(".aburii-hero-depth-far"), { x: x * .25, y: y * .25, duration: 1.3, ease: "power2.out", overwrite: true });
        gsap.to(root.current.querySelectorAll(".aburii-hero-depth-near"), { x: x * .58, y: y * .48, duration: 1.15, ease: "power2.out", overwrite: true });
      };
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      cleanup = () => { window.removeEventListener("pointermove", onPointerMove); ctx.revert(); };
    })();
    return () => cleanup();
  }, []);

  return <section ref={root} className="aburii-hero" aria-label={t.home.heroLabel}>
    <SiteNav locale={locale} />
    <div className="aburii-hero-pin">
      <div className="aburii-hero-grain aburii-hero-depth-far" aria-hidden="true" />
      <div className="aburii-hero-opening aburii-hero-depth-far"><Image src={siteImages.wagyuPlatter} alt="" fill priority sizes="100vw" /></div>
      <div className="aburii-hero-plate aburii-hero-depth-near"><Image src={siteImages.wagyuPlatter} alt={t.home.imageAlts.wagyuPlatter} fill priority sizes="100vw" /></div>
      <div className="aburii-hero-heat" aria-hidden="true" />
      <div className="aburii-fire-stage aburii-hero-depth-near"><Image src={siteImages.wagyuGrill} alt={t.home.imageAlts.wagyuGrill} fill sizes="100vw" /></div>
      <div className="aburii-hero-smoke" aria-hidden="true" /><div className="aburii-hero-firelight" aria-hidden="true" />
      <div className="aburii-hero-embers" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
      <div className="aburii-final-stage aburii-hero-depth-far"><Image src={siteImages.wagyuGrill} alt="" fill sizes="100vw" /><div className="aburii-final-platter"><Image src={siteImages.wagyuPlatter} alt="" fill sizes="46vw" /></div></div>
      <div className="aburii-hero-shade" aria-hidden="true" />
      <div className="aburii-hero-copy aburii-hero-opening-copy"><h1>ABURII</h1><p>{t.home.heroKicker}</p><p>{t.home.heroSub}</p></div>
      <div className="aburii-hero-copy aburii-hero-cta"><h1>ABURII</h1><p>{t.home.heroKicker}</p><p>{t.home.heroSub}</p><div className="aburii-hero-actions"><Link className="solid-button" href={localizedPath(locale, "/menu")}>{t.home.viewMenu}</Link><a className="ghost-button" href={RESERVATION_URL} target="_blank" rel="noopener noreferrer">{t.nav.reserve}</a></div></div>
      <span className="aburii-hero-scroll">{t.home.scroll}</span>
    </div>
  </section>;
}
