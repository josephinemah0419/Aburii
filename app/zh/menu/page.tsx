import { MenuPage } from "@/components/pages/MenuPage";
import { createPageMetadata } from "@/lib/i18n";

export const metadata = createPageMetadata("zh", "menu", "/menu");

export default function Page() {
  return <MenuPage locale="zh" />;
}
