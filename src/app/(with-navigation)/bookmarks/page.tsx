"use client";

import type { StringWithAutoComplete } from "@/app/(with-navigation)/snippets/types/AutoComplete";
import { Button } from "@/components/ui/button";
import { snippetsCategoryConfig } from "@/constants/constants";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Code2,
  ExternalLink,
  Globe,
  Monitor,
  Palette,
  Search,
  Star,
} from "lucide-react";
import { useMemo, useState } from "react";

// Bookmark data structure
interface Bookmark {
  id: string;
  title: string;
  description: string;
  url: string;
  category: StringWithAutoComplete<"UI">;
  tags: string[];
  addedDate: string;
  featured?: boolean;
}

// Sample bookmark data - replace with your actual bookmarks
const bookmarksData: Bookmark[] = [
  {
    id: "shadcn-extension",
    title: "Shadcn Extension",
    description: "Additional components and utilities for shadcn/ui.",
    url: "https://shadcn-extension.vercel.app/",
    category: "UI",
    tags: ["shadcn", "components", "ui", "react"],
    addedDate: "2024-01-20",
  },
  {
    id: "shadcn-phone-input",
    title: "Shadcn Phone Input",
    description:
      "Phone input component for shadcn/ui with international format support.",
    url: "https://shadcn-phone-input.vercel.app/",
    category: "UI",
    tags: ["shadcn", "input", "phone", "form"],
    addedDate: "2024-01-20",
  },
  {
    id: "shadcn-form-build",
    title: "Shadcn Form Builder",
    description: "Visual form builder and playground for shadcn/ui components.",
    url: "https://www.shadcn-form.com/",
    category: "UI",
    tags: ["shadcn", "form", "builder", "playground"],
    addedDate: "2024-01-20",
  },
  {
    featured: true,
    id: "aceternity-ui",
    title: "Aceternity UI",
    description: "Beautiful and modern UI components built with Tailwind CSS.",
    url: "https://ui.aceternity.com/",
    category: "UI",
    tags: ["components", "tailwind", "ui", "modern"],
    addedDate: "2024-01-20",
  },
  {
    featured: true,
    id: "magic-ui",
    title: "MagicUI",
    description: "Collection of magical UI components and effects.",
    url: "https://magicui.design/",
    category: "UI",
    tags: ["components", "effects", "animation", "design"],
    addedDate: "2024-01-20",
  },
  {
    id: "shadcn/ui-expansions",
    title: "shadcn/ui expansions",
    description: "More components built on top of shadcn-ui.",
    url: "https://shadcnui-expansions.typeart.cc/",
    category: "UI",
    tags: ["shadcn", "textarea", "form", "component"],
    addedDate: "2024-01-20",
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
    addedDate: "2024-01-20",
  },
  {
    id: "cult-ui",
    title: "Cult UI",
    description: "Modern UI component library with unique design approach.",
    url: "https://www.cult-ui.com/",
    category: "UI",
    tags: ["components", "design", "modern", "library"],
    addedDate: "2024-01-20",
  },
  {
    id: "awesome-shadcn",
    title: "Awesome Shadcn UI",
    description: "Curated collection of shadcn/ui resources and components.",
    url: "https://awesome-shadcn-ui.vercel.app/",
    category: "UI",
    tags: ["shadcn", "collection", "resources", "components"],
    addedDate: "2024-01-20",
  },
  {
    id: "eldora-bento",
    title: "EldoraUI BentoGrid",
    description: "Bento grid components and layouts for modern web design.",
    url: "https://www.eldoraui.site/",
    category: "UI",
    tags: ["bento", "grid", "layout", "design"],
    addedDate: "2024-01-20",
  },
  {
    id: "wds-shadcn",
    title: "WDS Shadcn Registry",
    description: "Component registry for shadcn/ui by Web Dev Simplified.",
    url: "https://wds-shadcn-registry.netlify.app/",
    category: "UI",
    tags: ["shadcn", "registry", "components", "collection"],
    addedDate: "2024-01-20",
  },
  {
    id: "motion-primitives",
    title: "Motion Primitives",
    description:
      "Animation primitives and components for modern web applications.",
    url: "https://motion-primitives.com/",
    category: "UI",
    tags: ["animation", "motion", "components", "interactive"],
    addedDate: "2024-01-20",
  },
  {
    id: "origin-ui",
    title: "Origin UI",
    description:
      "Clean and minimal UI component library for modern applications.",
    url: "https://originui.com/",
    category: "UI",
    tags: ["components", "minimal", "modern", "library"],
    addedDate: "2024-01-20",
  },
  {
    id: "dice-ui-kanban",
    title: "DiceUI Kanban",
    description:
      "A collection of composable, unstyled UI primitives for building accessible web applications.",
    url: "https://www.diceui.com/",
    category: "UI",
    tags: ["kanban", "components", "project-management", "interactive"],
    addedDate: "2024-01-20",
  },
  {
    id: "21st-dev2",
    title: "21st.dev",
    description:
      "A collection of composable, unstyled UI primitives for building accessible web applications.",
    url: "https://21st.dev/home",
    category: "UI",
    tags: ["kanban", "components", "project-management", "interactive"],
    addedDate: "2024-01-20",
  },

  {
    id: "simple-icons",
    title: "Simple Icons",
    description: "3334 SVG icons for popular brands",
    url: "https://simpleicons.org/",
    category: "Design",
    tags: ["icons", "svg", "brands", "resources"],
    addedDate: "2024-01-20",
  },
  {
    id: "og-image-generator",
    title: "OG Image Generator",
    description:
      "Free Open Graph image generator for websites. Create beautiful social media preview images for your web pages.",
    url: "https://ogimage.click/",
    category: "Tools",
    tags: ["seo", "open-graph", "social-media", "images"],
    addedDate: "2024-01-20",
  },

  {
    id: "eslint-plugin-jsx-a11y",
    title: "eslint-plugin-jsx-a11y",
    description:
      "Static AST checker for accessibility rules on JSX elements. Helps ensure your React applications are accessible to users with disabilities.",
    url: "https://www.npmjs.com/package/eslint-plugin-jsx-a11y",
    category: "Development",
    tags: ["accessibility", "eslint", "jsx", "react", "a11y"],
    addedDate: "2024-01-20",
  },
  {
    id: "unlighthouse",
    title: "Unlighthouse",
    description:
      "Scan your entire website with Google Lighthouse️ - in 2 minutes. A powerful tool for automated Lighthouse auditing and performance analysis.",
    url: "https://next.unlighthouse.dev/",
    category: "Development",
    tags: ["performance", "lighthouse", "seo", "audit", "testing"],
    addedDate: "2024-01-20",
  },
];

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

function BookmarkCard({ bookmark }: { bookmark: Bookmark }) {
  const categoryInfo =
    categoryConfig[bookmark.category as keyof typeof categoryConfig] ||
    categoryConfig.General;
  const CategoryIcon = categoryInfo.icon;

  return (
    <div className="bg-card group relative rounded-lg border p-6 transition-all hover:shadow-md hover:shadow-black/5 dark:hover:shadow-white/5">
      {bookmark.featured && (
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
              {bookmark.title}
            </h3>
            <ExternalLink className="text-muted-foreground h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
          </div>

          <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
            {bookmark.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-1">
            {bookmark.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="bg-secondary text-secondary-foreground inline-block rounded-md px-2 py-1 text-xs"
              >
                #{tag}
              </span>
            ))}
            {bookmark.tags.length > 3 && (
              <span className="bg-secondary text-secondary-foreground inline-block rounded-md px-2 py-1 text-xs">
                +{bookmark.tags.length - 3}
              </span>
            )}
          </div>

          <div className="text-muted-foreground mt-3 flex items-center gap-2 text-xs">
            <Calendar className="h-3 w-3" />
            {new Date(bookmark.addedDate).toLocaleDateString()}
          </div>
        </div>
      </div>

      <a
        href={bookmark.url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 rounded-lg"
        aria-label={`Open ${bookmark.title}`}
      />
    </div>
  );
}

export default function BookmarksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    ...Array.from(new Set(bookmarksData.map((b) => b.category))),
  ];

  const filteredBookmarks = useMemo(() => {
    return bookmarksData.filter((bookmark) => {
      const matchesSearch =
        searchQuery === "" ||
        bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bookmark.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        bookmark.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      const matchesCategory =
        selectedCategory === "All" || bookmark.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const featuredBookmarks = bookmarksData.filter((b) => b.featured);

  return (
    <main className="mx-auto min-h-svh max-w-7xl px-4 py-8 md:px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl">
          Bookmarks
        </h1>
        <p className="text-muted-foreground mt-4 max-w-2xl text-lg">
          A curated collection of interesting links, articles, and resources
          I&apos;ve saved. From development tools to design inspiration, these
          are the digital gems I keep coming back to.
        </p>
      </div>

      {/* Featured Section */}
      {featuredBookmarks.length > 0 && (
        <section className="mb-12">
          <div className="mb-6 flex items-center gap-2">
            <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
            <h2 className="text-foreground text-2xl font-semibold">Featured</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredBookmarks.map((bookmark) => (
              <BookmarkCard key={bookmark.id} bookmark={bookmark} />
            ))}
          </div>
        </section>
      )}

      {/* Search and Filter */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search bookmarks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-background focus:ring-ring w-full rounded-lg border py-2 pr-4 pl-10 text-sm focus:border-transparent focus:ring-2 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="text-xs"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Bookmarks Grid */}
      <section className="min-h-[50svh]">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-foreground text-xl font-semibold">
            All Bookmarks
            <span className="text-muted-foreground ml-2 text-sm font-normal">
              ({filteredBookmarks.length})
            </span>
          </h2>
        </div>

        {filteredBookmarks.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBookmarks.map((bookmark) => (
              <BookmarkCard key={bookmark.id} bookmark={bookmark} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Monitor className="text-muted-foreground/50 mb-4 h-12 w-12" />
            <h3 className="text-foreground mb-2 text-lg font-medium">
              No bookmarks found
            </h3>
            <p className="text-muted-foreground max-w-md">
              Try adjusting your search query or selected category to find what
              you&apos;re looking for.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
