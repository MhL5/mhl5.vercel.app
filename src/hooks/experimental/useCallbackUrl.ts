import { usePathname, useSearchParams } from "next/navigation";

export function useCallbackUrl() {
  const callbackUrlName = "callback-url";
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // clone params so we can safely mutate
  const params = new URLSearchParams(searchParams.toString());

  // prevent nesting: remove existing callback param
  params.delete(callbackUrlName);

  const query = params.toString();
  const rawCallbackUrl = query ? `${pathname}?${query}` : pathname;

  const encodedCallbackUrl = encodeURIComponent(rawCallbackUrl);

  function decodeCallbackUrl() {
    try {
      const value = searchParams.get(callbackUrlName);
      if (!value) return null;

      return decodeURIComponent(value);
    } catch {
      return null;
    }
  }

  return {
    callbackQuery: `${callbackUrlName}=${encodedCallbackUrl}`,
    decodedCallbackUrl: decodeCallbackUrl(),
    encodedCallbackUrl,
    rawCallbackUrl,
  };
}
