"use client";

import type { StringWithAutoComplete } from "@/app/(with-navigation)/snippets/types/AutoComplete";
import SearchableLayout from "@/components/SearchableLayout";
import { snippetsCategoryConfig } from "@/constants/constants";
import { cn } from "@/lib/utils";
import { Code2, ExternalLink, Globe, Palette, Star } from "lucide-react";
import Link from "next/link";

const bookmarksData = [
  {
    id: "shadcn-extension",
    title: "Shadcn Extension",
    description: "Additional components and utilities for shadcn/ui.",
    url: "https://shadcn-extension.vercel.app/",
    category: "UI",
    tags: ["shadcn", "components", "ui", "react"],
  },
  {
    id: "shadcn-phone-input",
    title: "Shadcn Phone Input",
    description:
      "Phone input component for shadcn/ui with international format support.",
    url: "https://shadcn-phone-input.vercel.app/",
    category: "UI",
    tags: ["shadcn", "input", "phone", "form"],
  },
  {
    id: "shadcn-form-build",
    title: "Shadcn Form Builder",
    description: "Visual form builder and playground for shadcn/ui components.",
    url: "https://www.shadcn-form.com/",
    category: "UI",
    tags: ["shadcn", "form", "builder", "playground"],
  },
  {
    featured: true,
    id: "aceternity-ui",
    title: "Aceternity UI",
    description: "Beautiful and modern UI components built with Tailwind CSS.",
    url: "https://ui.aceternity.com/",
    category: "UI",
    tags: ["components", "tailwind", "ui", "modern"],
  },
  {
    featured: true,
    id: "magic-ui",
    title: "MagicUI",
    description: "Collection of magical UI components and effects.",
    url: "https://magicui.design/",
    category: "UI",
    tags: ["components", "effects", "animation", "design"],
  },
  {
    id: "shadcn/ui-expansions",
    title: "shadcn/ui expansions",
    description: "More components built on top of shadcn-ui.",
    url: "https://shadcnui-expansions.typeart.cc/",
    category: "UI",
    tags: ["shadcn", "textarea", "form", "component"],
  },
  {
    featured: true,
    id: "enhanced-button",
    title: "Enhanced Button",
    description:
      "Advanced button components with additional features and styles.",
    url: "https://enhanced-button.vercel.app/",
    category: "UI",
    tags: ["button", "component", "ui", "interactive"],
  },
  {
    id: "cult-ui",
    title: "Cult UI",
    description: "Modern UI component library with unique design approach.",
    url: "https://www.cult-ui.com/",
    category: "UI",
    tags: ["components", "design", "modern", "library"],
  },
  {
    id: "awesome-shadcn",
    title: "Awesome Shadcn UI",
    description: "Curated collection of shadcn/ui resources and components.",
    url: "https://awesome-shadcn-ui.vercel.app/",
    category: "UI",
    tags: ["shadcn", "collection", "resources", "components"],
  },
  {
    id: "eldora-bento",
    title: "EldoraUI BentoGrid",
    description: "Bento grid components and layouts for modern web design.",
    url: "https://www.eldoraui.site/",
    category: "UI",
    tags: ["bento", "grid", "layout", "design"],
  },
  {
    id: "wds-shadcn",
    title: "WDS Shadcn Registry",
    description: "Component registry for shadcn/ui by Web Dev Simplified.",
    url: "https://wds-shadcn-registry.netlify.app/",
    category: "UI",
    tags: ["shadcn", "registry", "components", "collection"],
  },
  {
    id: "motion-primitives",
    title: "Motion Primitives",
    description:
      "Animation primitives and components for modern web applications.",
    url: "https://motion-primitives.com/",
    category: "UI",
    tags: ["animation", "motion", "components", "interactive"],
  },
  {
    id: "origin-ui",
    title: "Origin UI",
    description:
      "Clean and minimal UI component library for modern applications.",
    url: "https://originui.com/",
    category: "UI",
    tags: ["components", "minimal", "modern", "library"],
  },
  {
    id: "dice-ui-kanban",
    title: "DiceUI Kanban",
    description:
      "A collection of composable, unstyled UI primitives for building accessible web applications.",
    url: "https://www.diceui.com/",
    category: "UI",
    tags: ["kanban", "components", "project-management", "interactive"],
  },
  {
    id: "21st-dev2",
    title: "21st.dev",
    description:
      "A collection of composable, unstyled UI primitives for building accessible web applications.",
    url: "https://21st.dev/home",
    category: "UI",
    tags: ["kanban", "components", "project-management", "interactive"],
  },

  {
    id: "simple-icons",
    title: "Simple Icons",
    description: "3334 SVG icons for popular brands",
    url: "https://simpleicons.org/",
    category: "Design",
    tags: ["icons", "svg", "brands", "resources"],
  },
  {
    id: "https://heroicons.com/",
    title: "Hero Icons",
    description:
      "Beautiful hand-crafted SVG icons, by the makers of Tailwind CSS.",
    url: "https://heroicons.com/",
    category: "Design",
    tags: ["icons", "svg", "brands", "resources"],
  },
  {
    id: "og-image-generator",
    title: "OG Image Generator",
    description:
      "Free Open Graph image generator for websites. Create beautiful social media preview images for your web pages.",
    url: "https://ogimage.click/",
    category: "Tools",
    tags: ["seo", "open-graph", "social-media", "images"],
  },

  {
    id: "eslint-plugin-jsx-a11y",
    title: "eslint-plugin-jsx-a11y",
    description:
      "Static AST checker for accessibility rules on JSX elements. Helps ensure your React applications are accessible to users with disabilities.",
    url: "https://www.npmjs.com/package/eslint-plugin-jsx-a11y",
    category: "Development",
    tags: ["accessibility", "eslint", "jsx", "react", "a11y"],
  },
  {
    id: "unlighthouse",
    title: "Unlighthouse",
    description:
      "Scan your entire website with Google Lighthouse️ - in 2 minutes. A powerful tool for automated Lighthouse auditing and performance analysis.",
    url: "https://next.unlighthouse.dev/",
    category: "Development",
    tags: ["performance", "lighthouse", "seo", "audit", "testing"],
  },
];

export default function BookmarksPage() {
  return (
    <>
      <SearchableLayout
        title="Bookmarks"
        description="A curated collection of interesting links, articles, and resources I've saved. From development tools to design inspiration, these are the digital gems I keep coming back to."
        items={bookmarksData}
        render={(item) => <BookmarkCard key={item.title} item={item} />}
        filter={(item, searchQuery, selectedCategory) => {
          const matchesSearch =
            searchQuery === "" ||
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            item.tags?.some((tag) =>
              tag.toLowerCase().includes(searchQuery.toLowerCase()),
            );

          const matchesCategory =
            selectedCategory === "All" || item.category === selectedCategory;

          return matchesSearch && matchesCategory;
        }}
        categories={bookmarksData.map((item) => item.category)}
      />
    </>
  );
}

const categoryConfig = {
  Development: { icon: Code2, color: "text-blue-600 dark:text-blue-400" },
  Design: { icon: Palette, color: "text-purple-600 dark:text-purple-400" },
  Tools: {
    icon: snippetsCategoryConfig["utils"].icon,
    color: snippetsCategoryConfig["utils"].tailwindClass,
  },
  General: { icon: Globe, color: "text-gray-600 dark:text-gray-400" },
  UI: {
    icon: snippetsCategoryConfig["components"].icon,
    color: snippetsCategoryConfig["components"].tailwindClass,
  },
};

function BookmarkCard({
  item,
}: {
  item: {
    title: string;
    description: string;
    url: string;
    category?: StringWithAutoComplete<"UI">;
    tags?: string[];
    featured?: boolean;
  };
}) {
  const categoryInfo =
    categoryConfig[item.category as keyof typeof categoryConfig] ||
    categoryConfig.General;
  const CategoryIcon = categoryInfo.icon;

  return (
    <div className="bg-card group relative rounded-lg border p-6 transition-all hover:shadow-md hover:shadow-black/5 dark:hover:shadow-white/5">
      {item.featured && (
        <div className="absolute -top-2 -right-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30">
            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
          </div>
        </div>
      )}

      <div className="flex items-start gap-3">
        <div
          className={cn(
            "bg-muted flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
            categoryInfo.color,
          )}
        >
          <CategoryIcon className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-foreground group-hover:text-primary font-semibold transition-colors">
              {item.title}
            </h3>
            <ExternalLink className="text-muted-foreground h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
          </div>

          <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
            {item.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-1">
            {item.tags
              ? item.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="bg-secondary text-secondary-foreground inline-block rounded-md px-2 py-1 text-xs"
                  >
                    #{tag}
                  </span>
                ))
              : null}
            {item.tags && item.tags.length > 3 && (
              <span className="bg-secondary text-secondary-foreground inline-block rounded-md px-2 py-1 text-xs">
                +{item.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      <Link
        href={item.url}
        target={item.url.startsWith("http") ? "_blank" : undefined}
        rel={item.url.startsWith("http") ? "noopener noreferrer" : undefined}
        className="absolute inset-0 rounded-lg"
        aria-label={`Open ${item.title}`}
      />
    </div>
  );
}
