import { snippetsLinks } from "@/constants/snippetsLinks";
import { Code2, Hammer, Package, Wrench, Zap } from "lucide-react";
import type { JSX } from "react";

export const snippetsCategoryConfig: Record<
  string,
  { icon: JSX.ElementType; tailwindClass: string }
> = {
  types: {
    icon: Code2,
    tailwindClass: "text-blue-600 dark:text-blue-400",
  },
  components: {
    icon: Package,
    tailwindClass: "text-orange-600 dark:text-orange-400",
  },
  hooks: {
    icon: Zap,
    tailwindClass: "text-purple-600 dark:text-purple-400",
  },
  utils: {
    icon: Wrench,
    tailwindClass: "text-emerald-600 dark:text-emerald-400",
  },
  actions: {
    icon: Hammer,
    tailwindClass: "text-red-600 dark:text-red-400",
  },
} as const;

export const snippetsPageLink =
  snippetsLinks?.[0]?.items && snippetsLinks[0].items[0]?.url;
