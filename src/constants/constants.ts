import { Code2, Package, Wrench } from "lucide-react";
import type { JSX } from "react";
import HookSvg from "@/components/icons/HookSvg";
import { isDev } from "@/registry/utils/checks/checks";

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
    icon: HookSvg,
    tailwindClass: "text-purple-600 dark:text-purple-400",
  },
  utils: {
    icon: Wrench,
    tailwindClass: "text-emerald-600 dark:text-emerald-400",
  },
} as const;

export type ShadcnRegistry = typeof shadcnRegistry;
export const shadcnRegistry = await import("~/registry.json").then(
  (res) => res.default,
);

type Links = {
  title: string;
  url: string;
  items?: {
    title: string;
    url: string;
  }[];
};

function generateNavigationLinks(shadcnRegistry: ShadcnRegistry): Links[] {
  type DefaultCategorizedItems = typeof defaultCategorizedItems;
  const defaultCategorizedItems: Record<
    "utils" | "actions" | "types" | "components" | "hooks",
    Links[]
  > = {
    components: [],
    hooks: [],
    actions: [],
    utils: [],
    types: [],
  } as const;
  const categorizedItems = shadcnRegistry.items.reduce<DefaultCategorizedItems>(
    (acc, item) => {
      const notPublished =
        "meta" in item &&
        typeof item.meta === "object" &&
        !!item.meta &&
        "notPublished" in item.meta &&
        item.meta.notPublished;

      if (notPublished === true && !isDev()) return acc;

      // Get the first file path to determine category
      const firstFilePath = item.files?.[0]?.path || "";

      let category: string = "components";

      if (firstFilePath.includes("components/")) category = "components";
      if (firstFilePath.includes("actions/")) category = "actions";
      if (firstFilePath.includes("utils/")) category = "utils";
      if (firstFilePath.includes("types/")) category = "types";
      if (firstFilePath.includes("hooks/")) category = "hooks";

      acc[category as keyof DefaultCategorizedItems].push({
        title: `${item.title} ${notPublished ? " - not published" : ""}`,
        url: `/snippets/${category}/${item.name}`,
      });

      return acc;
    },
    defaultCategorizedItems,
  );

  return Object.entries(categorizedItems).reduce<Links[]>(
    (acc, [category, items]) => {
      if (items.length > 0)
        acc.push({
          title: category,
          url: `/snippets/${category}`,
          items: items,
        });

      return acc;
    },
    [],
  );
}

export const navigationLinks = generateNavigationLinks(shadcnRegistry);
