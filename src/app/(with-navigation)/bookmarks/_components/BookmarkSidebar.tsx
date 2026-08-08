"use client";

import {
  type BookmarkCategory,
  type BookmarkGroup,
  bookmarkCategories,
  bookmarkCategoryConfig,
  bookmarkGroupConfig,
} from "@/app/(with-navigation)/bookmarks/_constants/bookmarksConstants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Library } from "lucide-react";
import type { ComponentProps } from "react";

type BookmarkSidebarProps = {
  counts: Record<BookmarkCategory, number>;
  totalCount: number;
  selectedCategory: BookmarkCategory | null;
  onSelectCategory: (category: BookmarkCategory | null) => void;
};

const groups = Object.keys(bookmarkGroupConfig) as BookmarkGroup[];

export default function BookmarkSidebar({
  totalCount,
  selectedCategory,
  onSelectCategory,
}: BookmarkSidebarProps) {
  return (
    <nav
      aria-label="Bookmark categories"
      className="flex flex-wrap gap-2 p-0.5 lg:sticky lg:top-[calc(var(--site-header-height)+2rem)] lg:block lg:max-h-[calc(100svh-var(--site-header-height)-4rem)] lg:gap-0 lg:space-y-6 lg:overflow-y-auto"
    >
      <CategoryButton
        isSelected={selectedCategory === null}
        onClick={() => onSelectCategory(null)}
        className="w-full"
      >
        <Library />
        <>All bookmarks</>
        <span className="ms-auto inline-block">{totalCount}</span>
      </CategoryButton>

      {groups.map((group) => (
        <div key={group} className="contents lg:block">
          <p className="hidden text-xs font-medium tracking-widest text-muted-foreground/70 uppercase lg:mb-2 lg:block">
            {bookmarkGroupConfig[group].label}
          </p>

          <div className="contents lg:grid lg:gap-0.5">
            {bookmarkCategories
              .filter(
                (category) => bookmarkCategoryConfig[category].group === group,
              )
              .map((category, i) => {
                const { icon, label, color } = bookmarkCategoryConfig[category];
                const Icon = icon;
                return (
                  <CategoryButton
                    key={category + i}
                    isSelected={selectedCategory === category}
                    className={color}
                    onClick={() =>
                      onSelectCategory(
                        selectedCategory === category ? null : category,
                      )
                    }
                  >
                    <Icon />
                    <span>{label}</span>
                  </CategoryButton>
                );
              })}
          </div>
        </div>
      ))}
    </nav>
  );
}

function CategoryButton({
  className,
  isSelected,
  ...props
}: ComponentProps<typeof Button> & { isSelected: boolean }) {
  return (
    <Button
      variant={isSelected ? "secondary" : "ghost"}
      className={cn(`justify-start`, className)}
      size="sm"
      {...props}
    />
  );
}
