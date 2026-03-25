import { FallbackPage } from "@/registry/new-york/FallbackPages/FallbackPages";

export default function Unauthorized() {
  return (
    <FallbackPage
      className="h-[calc(100svh-var(--site-header-height))]"
      variant="unauthorized"
      loginPagePathname="/login"
    />
  );
}
