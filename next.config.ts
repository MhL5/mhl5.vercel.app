import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  transpilePackages: ["next-mdx-remote"],
  experimental: {
    staleTimes: {
      dynamic: 10,
    },
  },
  typedRoutes: true,
};

export default nextConfig;
