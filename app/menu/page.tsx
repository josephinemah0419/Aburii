import type { Metadata } from "next";
import { MenuBook } from "@/components/MenuBook";
import { SiteNav } from "@/components/SiteChrome";

export const metadata: Metadata = { title: "Menu", description: "Explore ABURII's complete Japanese yakiniku menu." };

export default function MenuPage() {
  return <main className="menu-page"><SiteNav /><MenuBook /></main>;
}
