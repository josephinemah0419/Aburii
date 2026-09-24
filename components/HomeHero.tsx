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
          .addLabel("reveal", 0)
          .to(q(".lux-blackout"), { autoAlpha: 0, duration: .5 }, 0)
          .fromTo(q(".lux-wagyu-whole"), { autoAlpha: 0, scale: .94 }, { autoAlpha: 1, scale: 1, duration: 1.15, ease: "power3.out" }, .12)
          .to(q(".lux-bloom"), { opacity: .52, duration: .7 }, .35)
          .to(q(".lux-wagyu-whole"), { scale: mobile ? 1.025 : 1.045, duration: .9, ease: "power2.inOut" }, .82)
          .addLabel("cut", .88)
          .set(slices, { autoAlpha: 1 }, .88)
          .fromTo(q(".cut-1"), { autoAlpha: 0, scaleY: 0, yPercent: -12 }, { autoAlpha: .82, scaleY: 1, yPercent: 0, duration: .42, ease: "power3.inOut" }, .9)
          .to(slices[0], { x: mobile ? -2 : -3, duration: .42, ease: "power2.inOut" }, 1.16)
          .fromTo(q(".cut-2"), { autoAlpha: 0, scaleY: 0, yPercent: -12 }, { autoAlpha: .82, scaleY: 1, yPercent: 0, duration: .42, ease: "power3.inOut" }, 1.08)
          .to(slices[1], { x: mobile ? -1 : -2, duration: .42, ease: "power2.inOut" }, 1.34)
          .fromTo(q(".cut-3"), { autoAlpha: 0, scaleY: 0, yPercent: -12 }, { autoAlpha: .82, scaleY: 1, yPercent: 0, duration: .42, ease: "power3.inOut" }, 1.26)
          .to([slices[2], slices[3]], { x: (index: number) => index === 0 ? (mobile ? 1 : 2) : (mobile ? 2 : 3), duration: .42, ease: "power2.inOut" }, 1.52)
          .to(q(".lux-wagyu-whole"), { autoAlpha: 0, duration: .46, ease: "power2.inOut" }, 1.28)
          .to(q(".lux-cut-line"), { autoAlpha: .18, duration: .35, stagger: .06, ease: "power2.inOut" }, 1.58)
          .addLabel("separate", 1.58)
          .to(slices, { x: (index: number) => (index - 1.5) * (mobile ? 6 : 10), y: (index: number) => Math.abs(index - 1.5) * 3, rotateZ: (index: number) => (index - 1.5) * .55, duration: .7, stagger: .035, ease: "power3.inOut" }, 1.58)
          .addLabel("grill", 1.88)
          .to(q(".lux-grill"), { autoAlpha: 1, y: 0, yPercent: 0, duration: 1.02, ease: "power3.inOut" }, 1.88)
          .to(q(".lux-warmth"), { opacity: 1, duration: .68 }, 2.05)
          .to(q(".lux-smoke-warm"), { opacity: .72, duration: .72 }, 2.1)
          .to(q(".lux-cut-line"), { autoAlpha: 0, duration: .36, stagger: .04 }, 2.12)
          .addLabel("drop", 2.42)
          .to(slices, { y: mobile ? "16vh" : "7vh", x: (index: number) => (mobile ? ["7vw", "2vw", "-2vw", "-7vw"] : ["9vw", "3vw", "-3vw", "-9vw"])[index], rotateZ: (index: number) => [2, -1, 1, -2][index], scale: mobile ? .56 : .52, duration: 1.02, stagger: .075, ease: "power2.in" }, 2.42)
          .addLabel("ignite", 3.02)
          .to(q(".lux-reaction"), { autoAlpha: 1, scale: 1, duration: .3, ease: "power3.out" }, 3.08)
          .to(q(".lux-embers"), { autoAlpha: 1, duration: .22 }, 3.12)
          .to(q(".lux-reaction"), { opacity: .4, duration: .58 }, 3.34)
          .addLabel("final", 3.46)
          .to(q(".lux-final-copy"), { autoAlpha: 1, y: 0, duration: .72, ease: "power3.out" }, 3.48)
          .to(q(".lux-opening-mark"), { autoAlpha: 0, duration: .35 }, 3.34);

        const onControl = (event: Event) => {
          const action = (event as CustomEvent<{ action: string }>).detail.action;
          const controlTargets: Record<string, number> = { reveal: .78, cut: 1.72, grill: 2.62, drop: 3.2, ignite: 3.48, final: 4.18 };
          if (action === "play") timeline.play();
          else if (action === "pause") timeline.pause();
          else if (action === "restart") timeline.restart();
          else if (controlTargets[action] !== undefined && timeline.scrollTrigger) {
            const progress = controlTargets[action] / timeline.duration();
            const targetScroll = timeline.scrollTrigger.start + (timeline.scrollTrigger.end - timeline.scrollTrigger.start) * progress;
            window.scrollTo({ top: targetScroll, behavior: "auto" });
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
        {[0, 1, 2, 3].map((index) => <div className={`lux-wagyu-slice slice-${index + 1}`} style={{ backgroundImage: `url(${heroAssets.wagyuWhole})` }} key={index} />)}
      </div>
      <div className="lux-cut-lines" aria-hidden="true"><i className="lux-cut-line cut-1" /><i className="lux-cut-line cut-2" /><i className="lux-cut-line cut-3" /></div>
      <div className="lux-grill"><Image src={heroAssets.yakinikuGrill} alt="" fill sizes="(max-width: 800px) 94vw, 66vw" /></div>
      <div className="lux-warmth" aria-hidden="true" /><div className="lux-reaction" aria-hidden="true" />
      <div className="lux-smoke lux-smoke-cool" aria-hidden="true" /><div className="lux-smoke lux-smoke-warm" aria-hidden="true" />
      <div className="lux-embers" aria-hidden="true">{Array.from({ length: 7 }, (_, index) => <i key={index} />)}</div>
      <div className="lux-edge-shade" aria-hidden="true" /><div className="lux-blackout" aria-hidden="true" />
      <div className="lux-opening-mark" aria-hidden="true"><span>01</span><i /></div>
      <div className="lux-final-copy"><h1>ABURII</h1><p>{t.home.heroKicker}</p><p>{t.home.heroSub}</p><div className="lux-actions"><Link className="solid-button" href={localizedPath(locale, "/menu")}>{t.home.viewMenu}</Link><a className="ghost-button" href={RESERVATION_URL} target="_blank" rel="noopener noreferrer">{t.nav.reserve}</a></div></div>
      <span className="lux-scroll-cue">{t.home.scroll}</span>
      {process.env.NODE_ENV !== "production" && <div className="lux-dev-controls" aria-label="Hero scene controls">
        {[['reveal', 'Reveal'], ['cut', 'Cut Wagyu'], ['grill', 'Grill Up'], ['drop', 'Drop Wagyu'], ['ignite', 'Ignite'], ['final', 'Final']].map(([action, label]) => <button type="button" key={action} onClick={() => controlHero(action)}>{label}</button>)}
        <i aria-hidden="true" />
        {['play', 'pause', 'restart'].map((action) => <button type="button" key={action} onClick={() => controlHero(action)}>{action}</button>)}
      </div>}
    </div>
  </section>;
}
