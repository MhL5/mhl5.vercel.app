"use client";

import { isBrowser } from "@/registry/utils/checks/checks";

function getDocumentCookies() {
  if (!isBrowser()) {
    // eslint-disable-next-line no-console
    console.error("getCookies is not available in the server");
    return {};
  }

  return document.cookie.split("; ").reduce(
    (acc, cookie) => {
      const [k, ...v] = cookie.split("=");
      acc[decodeURIComponent(k)] = decodeURIComponent(v.join("="));
      return acc;
    },
    {} as Record<string, string>,
  );
}

function getDocumentCookie<T = string>(name: string): T | null {
  const cookies = getDocumentCookies();

  if (!(name in cookies)) return null;
  const cookie = cookies[name];
  try {
    return JSON.parse(cookie);
  } catch {
    return cookie as T;
  }
}

type CookieOptions = {
  path?: string;
  expires?: Date | string;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
};

function setDocumentCookie(
  name: string,
  value: string,
  options: CookieOptions = {},
) {
  if (!isBrowser()) return;
  let encodedValue: string;

  if (typeof value === "string") encodedValue = encodeURIComponent(value);
  else encodedValue = encodeURIComponent(JSON.stringify(value));

  let cookieStr = `${encodeURIComponent(name)}=${encodedValue}`;
  if (options.path) cookieStr += `; path=${options.path}`;
  if (options.expires)
    cookieStr += `; expires=${options.expires instanceof Date ? options.expires.toUTCString() : options.expires}`;
  if (options.maxAge) cookieStr += `; max-age=${options.maxAge}`;
  if (options.domain) cookieStr += `; domain=${options.domain}`;
  if (options.secure) cookieStr += "; secure";
  if (options.sameSite) cookieStr += `; samesite=${options.sameSite}`;

  document.cookie = cookieStr;
}

export { getDocumentCookies, getDocumentCookie, setDocumentCookie };
