"use client";

import {
  type Bookmark,
  bookmarkCategoryConfig,
  getBookmarkFaviconUrl,
  getBookmarkHostname,
} from "@/app/(with-navigation)/bookmarks/_constants/bookmarksConstants";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/utils";
import Img from "@/registry/new-york/Img/Img";
import { ArrowUpRight, Star } from "lucide-react";
import { useState } from "react";

type BookmarkCardProps = {
  item: Bookmark;
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
};

export default function BookmarkCard({
  item,
  selectedTags,
  onToggleTag,
}: BookmarkCardProps) {
  const [hasFaviconError, setHasFaviconError] = useState(false);
  const {
    icon: CategoryIcon,
    color,
    hoverColor,
    label,
  } = bookmarkCategoryConfig[item.category];
  const hostname = getBookmarkHostname(item.url);

  return (
    <div className="group relative flex h-full flex-col gap-3 rounded-xl border border-border/60 bg-card/60 p-4 transition-colors focus-within:border-ring hover:border-ring/40 hover:bg-accent/40">
      <div className="flex items-start justify-between gap-2">
        <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border/60 bg-background">
          {hasFaviconError ? (
            <CategoryIcon className={cn("size-5", color)} />
          ) : (
            <Img
              src={getBookmarkFaviconUrl(item.url)}
              alt=""
              width={32}
              height={32}
              loading="lazy"
              onError={() => setHasFaviconError(true)}
              className="size-6 object-contain"
            />
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {item.featured ? (
            <Star
              aria-hidden
              className="size-4 fill-amber-400/30 text-amber-500 dark:text-amber-400"
            />
          ) : null}
          <ArrowUpRight
            aria-hidden
            className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
          />
        </div>
      </div>

      <div className="min-w-0">
        <h3
          className={cn(
            "font-semibold text-foreground transition-colors",
            hoverColor,
          )}
        >
          <Link
            unStyled
            prefetch={false}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${item.title} (${hostname})`}
            className="after:absolute after:inset-0 after:rounded-xl after:content-[''] focus-visible:outline-none"
          >
            {item.title}
          </Link>
        </h3>

        <p className="mt-1.5 line-clamp-3 text-sm text-muted-foreground">
          {item.description}
        </p>
      </div>

      {item.tags?.length ? (
        <ul className="relative flex flex-wrap gap-1.5">
          {item.tags.map((tag) => {
            const isSelected = selectedTags.includes(tag);

            return (
              <li key={tag}>
                <Button
                  type="button"
                  variant={isSelected ? "secondary" : "outline"}
                  aria-pressed={isSelected}
                  onClick={() => onToggleTag(tag)}
                  title={
                    isSelected ? `Remove the ${tag} filter` : `Filter by ${tag}`
                  }
                  data-selected={isSelected}
                  className="h-fit px-2 py-1 text-xs data-[selected=true]:border data-[selected=true]:border-transparent"
                >
                  #{tag}
                </Button>
              </li>
            );
          })}
        </ul>
      ) : null}

      <div className="mt-auto flex items-center gap-2 text-xs text-muted-foreground/70">
        <CategoryIcon aria-hidden className={cn("size-3.5", color)} />
        <span className="sr-only">{label}</span>
        <span className="truncate">{hostname}</span>
      </div>
    </div>
  );
}
