import { isProd } from "@/registry/utils/checks/checks";

export const domainUrl = isProd()
  ? `${process.env.NEXT_PUBLIC_FRONTEND_DOMAIN}`
  : `http://localhost:${process.env.PORT || 7777}`;

/**
 * Generates an absolute URL for the given path
 *
 * @example absoluteUrl("/blogs") => "https://mhl5.vercel.app/blogs"
 */
export const absoluteUrl = (path: `/${string}`) => `${domainUrl}${path}`;
