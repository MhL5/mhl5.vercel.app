import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  transpilePackages: ["next-mdx-remote"],
  cacheComponents: true,
  reactCompiler: true,
  typedRoutes: true,

  experimental: {
    turbopackFileSystemCacheForDev: true,
    typedEnv: true,
  },

  async rewrites() {
    return [
      {
        source: "/js/script.js",
        destination: "https://measured-one.vercel.app/js/script.js",
      },
      {
        source: "/api/session",
        destination: "https://measured-one.vercel.app/api/session",
      },
    ];
  },
};

export default nextConfig;
