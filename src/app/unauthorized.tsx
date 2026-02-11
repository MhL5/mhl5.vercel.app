import { FallbackPage } from "@/registry/new-york/FallbackPages/FallbackPages";

export default function Unauthorized() {
  return <FallbackPage variant="unauthorized" loginPagePathname="/login" />;
}
