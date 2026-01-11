"use client";

import {
  type Bookmark,
  bookmarkCategoryConfig,
} from "@/app/(with-navigation)/bookmarks/_constants/bookmarksConstants";
import { LinkButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

export default function BookmarkCard({ item }: { item: Bookmark }) {
  const categoryInfo =
    bookmarkCategoryConfig[
      item.category as keyof typeof bookmarkCategoryConfig
    ];
  const CategoryIcon = categoryInfo.icon;

  return (
    <LinkButton
      variant="outline"
      prefetch={false}
      href={item.url}
      target={item.url.startsWith("http") ? "_blank" : undefined}
      rel={item.url.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={`Open ${item.title}`}
      className="group relative flex h-full w-full items-start gap-3 p-3"
    >
      <div
        className={cn(
          "flex h-full w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10",
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

        <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
          {item.description}
        </p>
      </div>
    </LinkButton>
  );
}
