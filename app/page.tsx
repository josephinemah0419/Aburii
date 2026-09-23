import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HomeHero } from "@/components/HomeHero";
import { ReserveBand, SiteFooter } from "@/components/SiteChrome";

const cards = [
  { href: "/about", title: "About", copy: "The story, philosophy and space behind Aburii.", image: "/images/about-reference.png", position: "50% 12%" },
  { href: "/menu", title: "Menu", copy: "Explore the original ABURII menu as a digital book.", image: "/menu/page-03.jpg", position: "50% 42%" },
  { href: "/visit", title: "Visit", copy: "Find us in the heart of TTDI.", image: "/images/visit-reference.png", position: "50% 10%" },
];

export default function Home() {
  return (
    <main>
      <HomeHero />
      <section className="editorial-section intro-grid" aria-labelledby="built-around-fire">
        <div className="intro-image image-frame">
          <Image src="/images/hero-grill.png" alt="Miyazaki A5 Wagyu over a glowing charcoal grill" fill sizes="(max-width: 768px) 100vw, 50vw" className="cover image-warm" />
        </div>
        <div className="intro-copy">
          <p className="eyebrow">ABURII · TTDI</p>
          <h2 id="built-around-fire">Built around fire</h2>
          <p>Aburii brings together premium Japanese ingredients, carefully selected Wagyu and the ritual of yakiniku.</p>
          <p>Built around the grill, our dining experience encourages guests to slow down, share the table and enjoy every cut at its best.</p>
          <Link className="text-link" href="/about">Discover Aburii <ArrowUpRight aria-hidden="true" size={16} /></Link>
        </div>
      </section>
      <section className="editorial-section route-cards" aria-label="Explore Aburii">
        {cards.map((card) => (
          <Link className="route-card" href={card.href} key={card.href}>
            <Image src={card.image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" className="cover" style={{ objectPosition: card.position }} />
            <span className="route-card-shade" />
            <span className="route-card-copy">
              <span className="route-card-title">{card.title}</span>
              <span className="route-card-description">{card.copy}</span>
              <ArrowUpRight aria-hidden="true" />
            </span>
          </Link>
        ))}
      </section>
      <ReserveBand />
      <SiteFooter />
    </main>
  );
}
