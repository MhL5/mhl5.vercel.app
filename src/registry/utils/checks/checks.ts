export const isServer = () => typeof window === "undefined";
export const isClient = () => typeof window !== "undefined";

export const isDev = () => process.env.NODE_ENV === "development";
export const isProd = () => process.env.NODE_ENV === "production";
export const isTest = () => process.env.NODE_ENV === "test";

// Next.js runtime checks
export const isNode = () => process.env.NEXT_RUNTIME === "nodejs";
export const isEdge = () => process.env.NEXT_RUNTIME === "edge";
