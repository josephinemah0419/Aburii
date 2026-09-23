"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteImages } from "@/lib/site-images";

export const RESERVATION_URL = "https://reservation.umai.io/en/widget/aburii-ttdi";

export function Wordmark() {
  return <Link href="/" className="wordmark" aria-label="ABURII home">ABURII <span className="seal" aria-hidden="true">焙</span></Link>;
}

export function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);
  const links = [["/about", "About"], ["/menu", "Menu"], ["/visit", "Visit"]];
  return (
    <>
      <nav className={`site-nav ${scrolled || pathname === "/menu" ? "scrolled" : ""}`} aria-label="Primary navigation">
        <Wordmark />
        <div className="desktop-links">{links.map(([href, label]) => <Link key={href} href={href} className={`nav-link ${pathname === href ? "active" : ""}`}>{label}</Link>)}</div>
        <div className="nav-actions">
          <a className="reserve-button" href={RESERVATION_URL} target="_blank" rel="noreferrer">Reserve a table</a>
          <button className="menu-toggle" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        </div>
      </nav>
      <div className={`mobile-panel ${open ? "open" : ""}`} aria-hidden={!open}>
        <Link href="/">Home</Link>
        {links.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
        <a className="reserve-button" href={RESERVATION_URL} target="_blank" rel="noreferrer">Reserve a table</a>
      </div>
    </>
  );
}

export function ReserveBand() {
  return (
    <section className="reserve-band">
      <div className="reserve-band-bg"><Image src={siteImages.binchotanCraft} alt="Glowing binchotan charcoal" fill sizes="100vw" /></div>
      <div className="reserve-band-content"><h2>Reserve your table</h2><a className="reserve-button" href={RESERVATION_URL} target="_blank" rel="noreferrer">Reserve a table</a></div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Wordmark />
      <div className="footer-links"><Link href="/about">About</Link><Link href="/menu">Menu</Link><Link href="/visit">Visit</Link></div>
      <div className="footer-meta">
        <a className="social-link" href="https://www.instagram.com/aburii.kl/" target="_blank" rel="noreferrer" aria-label="ABURII on Instagram">IG</a>
        <a className="social-link" href="https://www.facebook.com/aburii.kl/" target="_blank" rel="noreferrer" aria-label="ABURII on Facebook">FB</a>
        <span>© {new Date().getFullYear()} ABURII</span>
      </div>
    </footer>
  );
}
