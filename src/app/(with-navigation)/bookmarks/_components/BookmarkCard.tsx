"use client";

import { ExternalLink, Star } from "lucide-react";
import Link from "next/link";
import {
  type Bookmark,
  bookmarkCategoryConfig,
} from "@/app/(with-navigation)/bookmarks/_constants/bookmarksConstants";
import { cn } from "@/lib/utils";

export default function BookmarkCard({ item }: { item: Bookmark }) {
  const categoryInfo =
    bookmarkCategoryConfig[
      item.category as keyof typeof bookmarkCategoryConfig
    ];
  const CategoryIcon = categoryInfo.icon;

  return (
    <div className="group relative rounded-lg border bg-card p-3 transition-all hover:shadow-black/5 hover:shadow-md dark:hover:shadow-white/5">
      {item.featured && (
        <div className="-top-2 -right-2 absolute">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30">
            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
          </div>
        </div>
      )}

      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted",
            categoryInfo.color,
          )}
        >
          <CategoryIcon className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground transition-colors group-hover:text-primary">
              {item.title}
            </h3>
            <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </div>

          <p className="mt-1 line-clamp-1 text-muted-foreground text-sm">
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
