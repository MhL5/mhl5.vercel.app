import { FallbackPageForbidden } from "@/registry/new-york/FallbackPages/FallbackPages";

export default function Forbidden() {
  return (
    <FallbackPageForbidden className="h-[calc(100svh-var(--site-header-height))]" />
  );
}
