import { VisitPage } from "@/components/pages/VisitPage";
import { createPageMetadata } from "@/lib/i18n";

export const metadata = createPageMetadata("zh", "visit", "/visit");

export default function Page() {
  return <VisitPage locale="zh" />;
}
