import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "ABURII · Japanese Yakiniku TTDI", template: "%s · ABURII" },
  description: "Premium Japanese yakiniku and Miyazaki A5 Wagyu in TTDI, Kuala Lumpur.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
