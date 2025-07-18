"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Search,
  ExternalLink,
  Code2,
  Palette,
  Zap,
  BookOpen,
  Wrench,
  Monitor,
  Globe,
  Star,
  Calendar,
} from "lucide-react";
import { useState, useMemo } from "react";

// Bookmark data structure
interface Bookmark {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  addedDate: string;
  featured?: boolean;
}

// Sample bookmark data - replace with your actual bookmarks
const bookmarksData: Bookmark[] = [
  {
    id: "1",
    title: "Framer Motion",
    description:
      "A production-ready motion library for React. Perfect for creating smooth animations and transitions.",
    url: "https://www.framer.com/motion/",
    category: "Development",
    tags: ["react", "animation", "motion", "ui"],
    addedDate: "2024-01-15",
    featured: true,
  },
  {
    id: "2",
    title: "Coolors",
    description:
      "The super fast color schemes generator! Create beautiful color palettes with ease.",
    url: "https://coolors.co/",
    category: "Design",
    tags: ["colors", "palette", "design", "tools"],
    addedDate: "2024-01-12",
    featured: true,
  },
  {
    id: "3",
    title: "CSS Tricks",
    description:
      "Daily articles about CSS, HTML, JavaScript, and all things related to web design and development.",
    url: "https://css-tricks.com/",
    category: "Learning",
    tags: ["css", "html", "javascript", "tutorials"],
    addedDate: "2024-01-10",
  },
  {
    id: "4",
    title: "React Hook Form",
    description:
      "Performant, flexible and extensible forms with easy validation for React applications.",
    url: "https://react-hook-form.com/",
    category: "Development",
    tags: ["react", "forms", "validation", "performance"],
    addedDate: "2024-01-08",
  },
  {
    id: "5",
    title: "Vercel AI SDK",
    description:
      "The AI Toolkit for TypeScript developers. Build AI-powered applications with ease.",
    url: "https://sdk.vercel.ai/",
    category: "AI/ML",
    tags: ["ai", "typescript", "sdk", "vercel"],
    addedDate: "2024-01-05",
    featured: true,
  },
  {
    id: "6",
    title: "Dribbble",
    description:
      "Discover the world's top designers & creatives. Get inspired by beautiful design work.",
    url: "https://dribbble.com/",
    category: "Design",
    tags: ["inspiration", "design", "creative", "portfolio"],
    addedDate: "2024-01-03",
  },
  {
    id: "7",
    title: "MDN Web Docs",
    description:
      "The definitive resource for web developers. Comprehensive documentation for web technologies.",
    url: "https://developer.mozilla.org/",
    category: "Learning",
    tags: ["documentation", "web", "javascript", "css", "html"],
    addedDate: "2024-01-01",
  },
  {
    id: "8",
    title: "Raycast",
    description:
      "Blazingly fast, totally extendable launcher. Control your tools with a few keystrokes.",
    url: "https://raycast.com/",
    category: "Tools",
    tags: ["productivity", "launcher", "macos", "extensions"],
    addedDate: "2023-12-28",
  },
];

// Category configuration
const categoryConfig = {
  Development: { icon: Code2, color: "text-blue-600 dark:text-blue-400" },
  Design: { icon: Palette, color: "text-purple-600 dark:text-purple-400" },
  "AI/ML": { icon: Zap, color: "text-yellow-600 dark:text-yellow-400" },
  Learning: { icon: BookOpen, color: "text-green-600 dark:text-green-400" },
  Tools: { icon: Wrench, color: "text-orange-600 dark:text-orange-400" },
  General: { icon: Globe, color: "text-gray-600 dark:text-gray-400" },
};

function BookmarkCard({ bookmark }: { bookmark: Bookmark }) {
  const categoryInfo =
    categoryConfig[bookmark.category as keyof typeof categoryConfig] ||
    categoryConfig.General;
  const CategoryIcon = categoryInfo.icon;

  return (
    <div className="group bg-card relative rounded-lg border p-6 transition-all hover:shadow-md hover:shadow-black/5 dark:hover:shadow-white/5">
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
