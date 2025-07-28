"use client";

import {
  bookmarkCategoryConfig,
  type Bookmark,
} from "@/app/(with-navigation)/bookmarks/_constants/bookmarksConstants";
import { cn } from "@/lib/utils";
import { ExternalLink, Star } from "lucide-react";
import Link from "next/link";

export default function BookmarkCard({ item }: { item: Bookmark }) {
  const categoryInfo =
    bookmarkCategoryConfig[
      item.category as keyof typeof bookmarkCategoryConfig
    ] || bookmarkCategoryConfig.General;
  const CategoryIcon = categoryInfo.icon;

  return (
    <div className="bg-card group relative rounded-lg border p-3 transition-all hover:shadow-md hover:shadow-black/5 dark:hover:shadow-white/5">
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
        </div>
      </div>

      <Link
        prefetch={false}
        href={item.url}
        target={item.url.startsWith("http") ? "_blank" : undefined}
        rel={item.url.startsWith("http") ? "noopener noreferrer" : undefined}
        className="absolute inset-0 size-full rounded-lg"
        aria-label={`Open ${item.title}`}
      />
    </div>
  );
}
