import type { Metadata } from "next";
import Image from "next/image";
import { ReserveBand, SiteFooter, SiteNav } from "@/components/SiteChrome";
import { siteImages } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "About",
  description: "The story, philosophy and space behind ABURII Japanese Yakiniku.",
};

export default function AboutPage() {
  return (
    <main className="about-page">
      <SiteNav />

      <section className="about-hero">
        <div className="about-hero-media">
          <Image
            src={siteImages.wagyuGrill}
            alt="Miyazaki A5 Wagyu held above the charcoal grill"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="about-hero-shade" />
        <div className="about-hero-copy">
          <p className="eyebrow">About us</p>
          <h1>This is<br />ABURII</h1>
          <p className="about-hero-sub">Japanese Yakiniku<br />in the heart of TTDI</p>
        </div>
      </section>

      <section className="about-story">
        <div className="about-story-copy">
          <p className="eyebrow">Our story</p>
          <h2>A shared<br />experience</h2>
          <p>Aburii was created from a simple idea: to bring people together over exceptional Japanese ingredients, thoughtful preparation and the ritual of yakiniku.</p>
          <p>We believe great dining is about more than food. It is about the moments shared around the grill, the conversations that flow and the people who make it special.</p>
        </div>
        <div className="about-story-media">
          <Image src={siteImages.diningRoom} alt="Dark, intimate ABURII dining room" fill sizes="(max-width: 900px) 100vw, 54vw" />
        </div>
      </section>

      <section className="about-philosophy">
        <div className="about-philosophy-head">
          <div>
            <p className="eyebrow">Our philosophy</p>
            <h2>Exceptional<br />by nature</h2>
          </div>
          <p>We are committed to quality in every detail, from the ingredients we select to the way we prepare and serve them. Our focus is on honest flavours, precise techniques and a dining experience that feels effortless and genuine.</p>
        </div>

        <div className="about-values">
          <div className="about-value about-value-quality">
            <Image src={siteImages.wagyuPlatter} alt="Premium A5 Wagyu" fill sizes="(max-width: 680px) 100vw, 33vw" />
            <h3>Quality</h3>
          </div>
          <div className="about-value about-value-craft">
            <Image src={siteImages.binchotanCraft} alt="Glowing charcoal and grilling process" fill sizes="(max-width: 680px) 100vw, 33vw" />
            <h3>Craft</h3>
          </div>
          <div className="about-value about-value-experience">
            <Image src={siteImages.sakeService} alt="Sake poured at the table" fill sizes="(max-width: 680px) 100vw, 33vw" />
            <h3>Experience</h3>
          </div>
        </div>
      </section>

      <section className="about-space">
        <div className="about-space-media">
          <Image src={siteImages.diningRoom} alt="ABURII dining room with charcoal grills" fill sizes="(max-width: 900px) 100vw, 58vw" />
        </div>
        <div className="about-space-copy">
          <p className="eyebrow">The space</p>
          <h2>Crafted for<br />meaningful<br />moments</h2>
          <p>Our space is designed for long dinners, good company and moments that linger beyond the meal.</p>
          <p>Whether it is an intimate gathering or a larger celebration, Aburii offers a setting that feels both refined and welcoming.</p>
        </div>
      </section>

      <ReserveBand />
      <SiteFooter />
    </main>
  );
}
