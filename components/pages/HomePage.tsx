import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HomeHero } from "@/components/HomeHero";
import { ReserveBand, SiteFooter } from "@/components/SiteChrome";
import { getTranslations, localizedPath, type Locale, type SitePath } from "@/lib/i18n";
import { siteImages } from "@/lib/site-images";

const cardDetails = [
  { path: "/about" as SitePath, key: "about" as const, image: siteImages.diningRoom, position: "50% 44%" },
  { path: "/menu" as SitePath, key: "menu" as const, image: siteImages.wagyuPlatter, position: "66% 58%" },
  { path: "/visit" as SitePath, key: "visit" as const, image: siteImages.entrance, position: "62% 46%" },
];

export function HomePage({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

  return (
    <main className={locale === "zh" ? "locale-zh" : undefined} lang={locale === "zh" ? "zh-CN" : "en"}>
      <HomeHero locale={locale} />
      <section className="editorial-section intro-grid" aria-labelledby={`built-around-fire-${locale}`}>
        <div className="intro-image image-frame">
          <Image src={siteImages.binchotanCraft} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="cover image-warm" />
        </div>
        <div className="intro-copy">
          <p className="eyebrow">{t.home.introEyebrow}</p>
          <h2 id={`built-around-fire-${locale}`}>{t.home.introTitle}</h2>
          <p>{t.home.introBodyOne}</p>
          <p>{t.home.introBodyTwo}</p>
          <Link className="text-link" href={localizedPath(locale, "/about")}>{t.home.discover} <ArrowUpRight aria-hidden="true" size={16} /></Link>
        </div>
      </section>
      <section className="editorial-section route-cards" aria-label={t.home.cardsLabel}>
        {cardDetails.map((card) => {
          const copy = t.home.cards[card.key];
          return (
            <Link className="route-card" href={localizedPath(locale, card.path)} key={card.path}>
              <Image src={card.image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" className="cover" style={{ objectPosition: card.position }} />
              <span className="route-card-shade" />
              <span className="route-card-copy">
                <span className="route-card-title">{copy.title}</span>
                <span className="route-card-description">{copy.copy}</span>
                <ArrowUpRight aria-hidden="true" />
              </span>
            </Link>
          );
        })}
      </section>
      <ReserveBand locale={locale} />
      <SiteFooter locale={locale} />
    </main>
  );
}
