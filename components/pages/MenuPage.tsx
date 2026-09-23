import { MenuBook } from "@/components/MenuBook";
import { SiteNav } from "@/components/SiteChrome";
import type { Locale } from "@/lib/i18n";

export function MenuPage({ locale }: { locale: Locale }) {
  return <main className={`menu-page${locale === "zh" ? " locale-zh" : ""}`} lang={locale === "zh" ? "zh-CN" : "en"}><SiteNav locale={locale} /><MenuBook locale={locale} /></main>;
}
