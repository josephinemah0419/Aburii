"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getTranslations, localizedPath, pathForLocale, RESERVATION_URL, type Locale, type SitePath } from "@/lib/i18n";
import { siteImages } from "@/lib/site-images";

export function Wordmark({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  return (
    <Link href={localizedPath(locale, "/")} className="wordmark" aria-label={t.accessibility.home}>
      <Image src="/brand/aburii-logo.png" alt="" width={2048} height={853} priority />
    </Link>
  );
}

export function SiteNav({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const t = getTranslations(locale);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setOpen(false));
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);
  const links: Array<[SitePath, string]> = [["/about", t.nav.about], ["/menu", t.nav.menu], ["/visit", t.nav.visit]];
  const englishPath = pathForLocale(pathname, "en");
  const chinesePath = pathForLocale(pathname, "zh");
  return (
    <>
      <nav className={`site-nav ${scrolled || pathname.endsWith("/menu") ? "scrolled" : ""}`} aria-label={t.accessibility.primaryNavigation}>
        <Wordmark locale={locale} />
        <div className="desktop-links">{links.map(([path, label]) => { const href = localizedPath(locale, path); return <Link key={path} href={href} className={`nav-link ${pathname === href ? "active" : ""}`}>{label}</Link>; })}</div>
        <div className="nav-actions">
          <div className="language-switcher" aria-label={t.accessibility.languageSelector}>
            <Link href={englishPath} className={locale === "en" ? "active" : ""} aria-current={locale === "en" ? "page" : undefined}>EN</Link>
            <span aria-hidden="true">/</span>
            <Link href={chinesePath} className={locale === "zh" ? "active" : ""} aria-current={locale === "zh" ? "page" : undefined}>中文</Link>
          </div>
          <a className="reserve-button" href={RESERVATION_URL} target="_blank" rel="noopener noreferrer">{t.nav.reserve}</a>
          <button className="menu-toggle" type="button" aria-label={open ? t.accessibility.closeMenu : t.accessibility.openMenu} aria-controls="mobile-navigation" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        </div>
      </nav>
      <div id="mobile-navigation" className={`mobile-panel ${open ? "open" : ""}`} role="dialog" aria-label={t.accessibility.navigationMenu} aria-modal="true" aria-hidden={!open}>
        <Link href={localizedPath(locale, "/")} onClick={() => setOpen(false)}>{t.nav.home}</Link>
        {links.map(([path, label]) => <Link key={path} href={localizedPath(locale, path)} onClick={() => setOpen(false)}>{label}</Link>)}
        <div className="mobile-language-switcher" aria-label={t.accessibility.languageSelector}>
          <Link href={englishPath} className={locale === "en" ? "active" : ""} aria-current={locale === "en" ? "page" : undefined} onClick={() => setOpen(false)}>EN</Link>
          <Link href={chinesePath} className={locale === "zh" ? "active" : ""} aria-current={locale === "zh" ? "page" : undefined} onClick={() => setOpen(false)}>中文</Link>
        </div>
        <a className="reserve-button" href={RESERVATION_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>{t.nav.reserve}</a>
      </div>
    </>
  );
}

export function ReserveBand({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  return (
    <section className="reserve-band">
      <div className="reserve-band-bg"><Image src={siteImages.binchotanCraft} alt={t.reserve.imageAlt} fill sizes="100vw" /></div>
      <div className="reserve-band-content"><h2>{t.reserve.title}</h2><a className="reserve-button" href={RESERVATION_URL} target="_blank" rel="noopener noreferrer">{t.reserve.button}</a></div>
    </section>
  );
}

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  return (
    <footer className="site-footer">
      <Wordmark locale={locale} />
      <div className="footer-links"><Link href={localizedPath(locale, "/about")}>{t.footer.about}</Link><Link href={localizedPath(locale, "/menu")}>{t.footer.menu}</Link><Link href={localizedPath(locale, "/visit")}>{t.footer.visit}</Link></div>
      <div className="footer-meta">
        <a className="social-link" href="https://www.instagram.com/aburii.kl/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram aria-hidden="true" /></a>
        <a className="social-link" href="https://www.facebook.com/aburii.kl/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF aria-hidden="true" /></a>
        <span>© {new Date().getFullYear()} ABURII</span>
      </div>
    </footer>
  );
}
