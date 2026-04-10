import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * List of permanently moved pages.
 * oldPath → newPath
 */
const PERMANENT_REDIRECTS: Record<string, string> = {
  "/snippets/hooks/useUrlState": "/snippets/hooks/useSearchParam",
};

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const newLocation = PERMANENT_REDIRECTS[pathname];

  if (!newLocation) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = newLocation;

  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)"],
};
