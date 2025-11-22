import { isProd } from "@/registry/utils/checks/checks";

export const domainUrl = isProd()
  ? `${process.env.NEXT_PUBLIC_FRONTEND_DOMAIN}`
  : `http://localhost:${process.env.PORT || 7777}`;

/**
 * Generates an absolute URL for the given path
 * removes ending slash and duplicate slashes
 *
 * @example absoluteUrl("/blogs") => "https://mhl5.vercel.app/blogs"
 */
export const absoluteUrl = (path: `/${string}`) =>
  _removeEndingSlash(new URL(_normalizePath(path), domainUrl).href);

const _normalizePath = (path: `/${string}`) =>
  path === "/" ? "" : path.replace(/\/{2,}/g, "/");

const _removeEndingSlash = (path: string) =>
  path.endsWith("/") ? path.slice(0, -1) : path;
