"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { getTranslations, localizedPath, RESERVATION_URL, type Locale } from "@/lib/i18n";
import { heroAssets } from "@/lib/hero-assets";
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
      const mobile = window.innerWidth < 800;
      let removeControl = () => {};
      const ctx = gsap.context(() => {
        const q = gsap.utils.selector(root);
        const slices = q<HTMLElement>(".lux-wagyu-slice");
        const timeline = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: mobile ? .6 : 1 },
        });

        timeline
          .addLabel("scene1", 0)
          .to(q(".lux-blackout"), { autoAlpha: 0, duration: .5 }, 0)
          .fromTo(q(".lux-wagyu-whole"), { autoAlpha: 0, scale: .94 }, { autoAlpha: 1, scale: 1, duration: 1.15, ease: "power3.out" }, .12)
          .to(q(".lux-bloom"), { opacity: .52, duration: .7 }, .35)
          .to(q(".lux-wagyu-whole"), { scale: mobile ? 1.035 : 1.07, duration: .78 }, 1.05)
          .addLabel("scene2", 1.48)
          .set(slices, { autoAlpha: 1 }, 1.62)
          .set(q(".lux-wagyu-whole"), { autoAlpha: 0 }, 1.62)
          .fromTo(q(".lux-blade-trace"), { autoAlpha: 0, xPercent: -85 }, { autoAlpha: .74, xPercent: 85, duration: .34, ease: "power3.inOut" }, 1.52)
          .to(q(".lux-blade-trace"), { autoAlpha: 0, duration: .16 }, 1.82)
          .to(slices, { x: (index: number) => (index - 1.5) * (mobile ? 8 : 15), y: (index: number) => Math.abs(index - 1.5) * 5, rotateZ: (index: number) => (index - 1.5) * 1.2, duration: .72, stagger: .035, ease: "power3.out" }, 1.78)
          .addLabel("scene3", 2.12)
          .to(q(".lux-grill"), { autoAlpha: 1, y: 0, yPercent: 0, duration: .92, ease: "power3.out" }, 2.15)
          .to(q(".lux-warmth"), { opacity: 1, duration: .55 }, 2.32)
          .to(q(".lux-smoke-warm"), { opacity: .72, duration: .6 }, 2.38)
          .addLabel("scene4", 2.68)
          .to(slices, { y: mobile ? "16vh" : "7vh", x: (index: number) => (mobile ? ["18vw", "6vw", "-6vw", "-18vw"] : ["10vw", "3.5vw", "-3.5vw", "-10vw"])[index], rotateZ: (index: number) => [3, -2, 2, -3][index], scale: mobile ? .56 : .52, duration: .92, stagger: .085, ease: "power2.in" }, 2.72)
          .addLabel("scene5", 3.3)
          .to(q(".lux-reaction"), { autoAlpha: 1, scale: 1, duration: .28, ease: "power3.out" }, 3.35)
          .to(q(".lux-embers"), { autoAlpha: 1, duration: .2 }, 3.38)
          .to(q(".lux-reaction"), { opacity: .4, duration: .55 }, 3.58)
          .addLabel("final", 3.68)
          .to(q(".lux-final-copy"), { autoAlpha: 1, y: 0, duration: .7, ease: "power3.out" }, 3.7)
          .to(q(".lux-opening-mark"), { autoAlpha: 0, duration: .35 }, 3.58);

        const onControl = (event: Event) => {
          const action = (event as CustomEvent<{ action: string }>).detail.action;
          const controlTargets: Record<string, number> = { scene1: 1.22, scene2: 2.1, scene3: 3.04, scene4: 3.5, scene5: 3.82, final: 4.38 };
          if (action === "play") timeline.play();
          else if (action === "pause") timeline.pause();
          else if (action === "restart") timeline.restart();
          else if (controlTargets[action] !== undefined && timeline.scrollTrigger) {
            const progress = controlTargets[action] / timeline.duration();
            const targetScroll = timeline.scrollTrigger.start + (timeline.scrollTrigger.end - timeline.scrollTrigger.start) * progress;
            window.scrollTo({ top: targetScroll, behavior: "smooth" });
          }
        };
        window.addEventListener("aburii:hero-control", onControl);
        removeControl = () => window.removeEventListener("aburii:hero-control", onControl);
      }, root);

      cleanup = () => { removeControl(); ctx.revert(); };
    })();
    return () => cleanup();
  }, []);

  const controlHero = (action: string) => window.dispatchEvent(new CustomEvent("aburii:hero-control", { detail: { action } }));

  return <section ref={root} className="lux-hero" aria-label={t.home.heroLabel}>
    <SiteNav locale={locale} />
    <div className="lux-hero-pin">
      <div className="lux-bloom" aria-hidden="true" />
      <div className="lux-wagyu-whole lux-depth"><Image src={heroAssets.wagyuWhole} alt={t.home.imageAlts.wagyuPlatter} fill priority sizes="(max-width: 800px) 92vw, 72vw" /></div>
      <div className="lux-slices lux-depth" aria-hidden="true">
        {[0, 1, 2, 3].map((index) => <div className={`lux-wagyu-slice slice-${index + 1}`} style={{ backgroundImage: `url(${heroAssets.wagyuSlices})` }} key={index} />)}
      </div>
      <div className="lux-blade-trace" aria-hidden="true" />
      <div className="lux-grill"><Image src={heroAssets.yakinikuGrill} alt="" fill sizes="(max-width: 800px) 94vw, 66vw" /></div>
      <div className="lux-warmth" aria-hidden="true" /><div className="lux-reaction" aria-hidden="true" />
      <div className="lux-smoke lux-smoke-cool" aria-hidden="true" /><div className="lux-smoke lux-smoke-warm" aria-hidden="true" />
      <div className="lux-embers" aria-hidden="true">{Array.from({ length: 7 }, (_, index) => <i key={index} />)}</div>
      <div className="lux-edge-shade" aria-hidden="true" /><div className="lux-blackout" aria-hidden="true" />
      <div className="lux-opening-mark" aria-hidden="true"><span>01</span><i /></div>
      <div className="lux-final-copy"><h1>ABURII</h1><p>{t.home.heroKicker}</p><p>{t.home.heroSub}</p><div className="lux-actions"><Link className="solid-button" href={localizedPath(locale, "/menu")}>{t.home.viewMenu}</Link><a className="ghost-button" href={RESERVATION_URL} target="_blank" rel="noopener noreferrer">{t.nav.reserve}</a></div></div>
      <span className="lux-scroll-cue">{t.home.scroll}</span>
      {process.env.NODE_ENV !== "production" && <div className="lux-dev-controls" aria-label="Hero scene controls">
        {[['scene1', 'Scene 1'], ['scene2', 'Slice Wagyu'], ['scene3', 'Grill Up'], ['scene4', 'Drop Wagyu'], ['scene5', 'Ignite'], ['final', 'Final']].map(([action, label]) => <button type="button" key={action} onClick={() => controlHero(action)}>{label}</button>)}
        <i aria-hidden="true" />
        {['play', 'pause', 'restart'].map((action) => <button type="button" key={action} onClick={() => controlHero(action)}>{action}</button>)}
      </div>}
    </div>
  </section>;
}
