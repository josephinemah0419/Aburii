import type { Metadata } from "next";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";

export const metadata: Metadata = { title: "Visit", description: "Find ABURII Japanese Yakiniku in TTDI, Kuala Lumpur." };
const directions = "https://www.google.com/maps/dir/?api=1&destination=Aburii+TTDI%2C+5+Lorong+Datuk+Sulaiman+7%2C+Kuala+Lumpur";

export default function VisitPage() {
  return (
    <main>
      <SiteNav />
      <section className="page-hero">
        <div className="page-hero-copy"><p className="eyebrow">Visit</p><h1>Find<br />us at<br />TTDI</h1><p className="page-hero-sub">A neighbourhood destination for Japanese yakiniku, good food and great company.</p></div>
        <div className="page-hero-image"><Image className="cover visit-hero-img image-warm" src="/images/visit-reference.png" alt="ABURII restaurant entrance in TTDI" fill priority sizes="(max-width: 900px) 100vw, 65vw" /></div>
      </section>
      <section className="visit-details">
        <div className="visit-info">
          <p className="eyebrow">Location</p><h2>ABURII TTDI</h2>
          <address className="address">5, Lorong Datuk Sulaiman 7<br />Taman Tun Dr Ismail<br />60000 Kuala Lumpur</address>
          <div className="contact-list"><a href="tel:+60109100267"><Phone size={18} />+6010 910 0267</a><a href="mailto:aburiittdi@gmail.com"><Mail size={18} />aburiittdi@gmail.com</a></div>
          <div className="social-row"><a className="social-link" href="https://www.instagram.com/aburii.kl/" target="_blank" rel="noreferrer" aria-label="ABURII on Instagram">IG</a><a className="social-link" href="https://www.facebook.com/aburii.kl/" target="_blank" rel="noreferrer" aria-label="ABURII on Facebook">FB</a></div>
          <div className="hours"><h3>Opening hours</h3><div className="hours-grid"><strong>Monday</strong><span>Closed</span><strong>Tuesday – Friday</strong><span>6:00 PM – 10:30 PM</span><strong>Saturday – Sunday</strong><span>12:00 PM – 2:30 PM<br />6:00 PM – 10:30 PM</span></div><a className="solid-button" href={directions} target="_blank" rel="noreferrer">Get directions</a></div>
        </div>
        <div className="map-wrap"><iframe title="Map showing ABURII TTDI" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Aburii%20TTDI%2C%205%20Lorong%20Datuk%20Sulaiman%207%2C%20Kuala%20Lumpur&output=embed" /></div>
      </section>
      <section className="visit-gallery" aria-label="ABURII interior gallery">
        <div className="gallery-image gallery-one"><Image className="cover" src="/images/visit-reference.png" alt="ABURII yakiniku table" fill sizes="(max-width: 640px) 100vw, 33vw" /></div>
        <div className="gallery-image gallery-two"><Image className="cover" src="/images/visit-reference.png" alt="ABURII entrance curtain" fill sizes="(max-width: 640px) 100vw, 33vw" /></div>
        <div className="gallery-image gallery-three"><Image className="cover" src="/images/visit-reference.png" alt="ABURII dining room" fill sizes="(max-width: 640px) 100vw, 33vw" /></div>
      </section>
      <SiteFooter />
    </main>
  );
}
