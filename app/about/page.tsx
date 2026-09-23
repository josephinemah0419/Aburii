import type { Metadata } from "next";
import Image from "next/image";
import { ReserveBand, SiteFooter, SiteNav } from "@/components/SiteChrome";

export const metadata: Metadata = { title: "About", description: "The story, philosophy and space behind ABURII Japanese Yakiniku." };

export default function AboutPage() {
  return (
    <main>
      <SiteNav />
      <section className="page-hero">
        <div className="page-hero-copy"><p className="eyebrow">About us</p><h1>This is<br />ABURII</h1><p className="page-hero-sub">Japanese Yakiniku<br />in the heart of TTDI</p></div>
        <div className="page-hero-image"><Image className="cover about-hero-img image-warm" src="/images/about-reference.png" alt="Wagyu held over charcoal fire" fill priority sizes="(max-width: 900px) 100vw, 65vw" /></div>
      </section>
      <section className="story-section">
        <div className="story-copy"><p className="eyebrow">Our story</p><h2>A shared<br />experience</h2><p>Aburii was created from a simple idea: to bring people together over exceptional Japanese ingredients, thoughtful preparation and the ritual of yakiniku.</p><p>We believe great dining is about more than food. It is about the moments shared around the grill, the conversations that flow and the people who make it special.</p></div>
        <div className="story-image"><Image className="cover image-warm" src="/images/about-reference.png" alt="Dark, intimate ABURII dining room" fill sizes="(max-width: 900px) 100vw, 57vw" /></div>
      </section>
      <section className="philosophy-section">
        <div className="philosophy-head">
          <div><p className="eyebrow">Our philosophy</p><h2>Exceptional<br />by nature</h2></div>
          <p className="philosophy-copy">We are committed to quality in every detail, from the ingredients we select to the way we prepare and serve them. Our focus is on honest flavours, precise techniques and a dining experience that feels effortless and genuine.</p>
        </div>
        <div className="philosophy-cards">
          <div className="philosophy-card quality"><Image className="cover image-warm" src="/images/about-reference.png" alt="Premium A5 Wagyu" fill sizes="(max-width: 640px) 100vw, 33vw" /><h3>Quality</h3></div>
          <div className="philosophy-card craft"><Image className="cover image-warm" src="/images/hero-grill.png" alt="Glowing charcoal grilling process" fill sizes="(max-width: 640px) 100vw, 33vw" /><h3>Craft</h3></div>
          <div className="philosophy-card experience"><Image className="cover image-warm" src="/images/about-reference.png" alt="Sake served at the table" fill sizes="(max-width: 640px) 100vw, 33vw" /><h3>Experience</h3></div>
        </div>
      </section>
      <section className="space-section">
        <div className="space-image"><Image className="cover image-warm" src="/images/about-reference.png" alt="ABURII restaurant interior with charcoal grills" fill sizes="(max-width: 900px) 100vw, 60vw" /></div>
        <div className="space-copy"><p className="eyebrow">The space</p><h2>Crafted for meaningful moments</h2><p>Our space is designed for long dinners, good company and moments that linger beyond the meal.</p><p>Whether it is an intimate gathering or a larger celebration, Aburii offers a setting that feels both refined and welcoming.</p></div>
      </section>
      <ReserveBand /><SiteFooter />
    </main>
  );
}
