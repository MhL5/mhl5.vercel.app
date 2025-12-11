import { Code2, Globe, Package, Wrench } from "lucide-react";
import { cache } from "react";
import HookSvg from "@/components/icons/HookSvg";

type ShadcnRegistry = Awaited<ReturnType<typeof getShadcnRegistry>>;

const getShadcnRegistry = cache(() =>
  import("~/registry.json").then((res) => res.default),
);

const snippetsCategoryConfig = {
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

function getSnippetsCategoryConfig(
  category: keyof typeof snippetsCategoryConfig | string,
) {
  const fallback = {
    icon: Globe,
    tailwindClass: "text-gray-600 dark:text-gray-400",
  };
  const config =
    snippetsCategoryConfig?.[category as keyof typeof snippetsCategoryConfig];

  return config || fallback;
}

type Links = {
  title: string;
  url: string;
  items?: {
    title: string;
    url: string;
  }[];
};

const getSnippetsLinks = cache(async () => {
  const shadcnRegistry = await getShadcnRegistry();

  const initialLinks = Object.keys(snippetsCategoryConfig).reduce(
    (acc, category) => {
      acc[category as keyof typeof snippetsCategoryConfig] = {
        title: category,
        url: `/snippets/${category}`,
        items: [],
      };
      return acc;
    },
    {} as Record<keyof typeof snippetsCategoryConfig, Links>,
  );

  const linksWithItems = shadcnRegistry.items.reduce((acc, item) => {
    const category = item.meta.url.split("/")[2];
    const isValidCategory =
      category in acc &&
      typeof acc[category as keyof typeof acc] === "object" &&
      !!category;

    if (isValidCategory)
      acc[category as keyof typeof acc].items?.push({
        title: item.title,
        url: item.meta.url,
      });

    return acc;
  }, initialLinks);

  return [
    linksWithItems.components,
    linksWithItems.hooks,
    linksWithItems.utils,
    linksWithItems.types,
  ];
});

export {
  getShadcnRegistry,
  getSnippetsLinks,
  getSnippetsCategoryConfig,
  snippetsCategoryConfig,
  type ShadcnRegistry,
};
