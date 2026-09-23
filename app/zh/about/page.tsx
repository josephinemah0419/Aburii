import { AboutPage } from "@/components/pages/AboutPage";
import { createPageMetadata } from "@/lib/i18n";

export const metadata = createPageMetadata("zh", "about", "/about");

export default function Page() {
  return <AboutPage locale="zh" />;
}
