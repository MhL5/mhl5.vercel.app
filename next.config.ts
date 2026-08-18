import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  typedRoutes: true,
  images: {
    remotePatterns: [
      { hostname: "localhost" },
      // favicons of the links on /bookmarks
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "/s2/favicons",
      },
    ],
  },
  logging: { browserToTerminal: true },
  experimental: {
    typedEnv: true,
    authInterrupts: true,
  },
};

export default nextConfig;
