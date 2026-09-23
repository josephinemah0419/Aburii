import { HomePage } from "@/components/pages/HomePage";
import { createPageMetadata } from "@/lib/i18n";

export const metadata = createPageMetadata("zh", "home", "/");

export default function Page() {
  return <HomePage locale="zh" />;
}
