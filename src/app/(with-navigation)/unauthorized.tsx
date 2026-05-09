import { FallbackPageUnAuthorized } from "@/registry/new-york/FallbackPages/FallbackPages";

export default function Unauthorized() {
  return (
    <FallbackPageUnAuthorized className="h-[calc(100svh-var(--site-header-height))]" />
  );
}
