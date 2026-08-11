"use client";

import BookmarkCard from "@/app/(with-navigation)/bookmarks/_components/BookmarkCard";
import BookmarkSidebar from "@/app/(with-navigation)/bookmarks/_components/BookmarkSidebar";
import {
  type BookmarkCategory,
  bookmarkCategories,
} from "@/app/(with-navigation)/bookmarks/_constants";
import {
  filterBookmarks,
  filterBookmarksByTags,
} from "@/app/(with-navigation)/bookmarks/_utils";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import DebouncedInput from "@/registry/new-york/DebouncedInput/DebouncedInput";
import { Search, SearchX, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { bookmarks as allBookmarks } from "../_constants";

function BookmarkSection() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<BookmarkCategory | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // `/` focuses the search input, like most docs sites
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey)
        return;

      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.isContentEditable ||
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement;
      if (isTyping) return;

      event.preventDefault();
      searchInputRef.current?.focus();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function toggleTag(tag: string) {
    setSelectedTags((tags) =>
      tags.includes(tag)
        ? tags.filter((selectedTag) => selectedTag !== tag)
        : [...tags, tag],
    );
  }

  const searchedBookmarks = filterBookmarksByTags(
    filterBookmarks(allBookmarks, query),
    selectedTags,
  );

  const counts = Object.fromEntries(
    Object.keys(bookmarkCategories).map((category) => [
      category,
      searchedBookmarks.filter((bookmark) => bookmark.category === category)
        .length,
    ]),
  ) as Record<BookmarkCategory, number>;

  const visibleBookmarks = selectedCategory
    ? searchedBookmarks.filter(
        (bookmark) => bookmark.category === selectedCategory,
      )
    : searchedBookmarks;

  const hasFilters =
    Boolean(query.trim()) ||
    selectedCategory !== null ||
    selectedTags.length > 0;

  return (
    <section className="grid gap-6 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-8">
      <BookmarkSidebar
        counts={counts}
        totalCount={searchedBookmarks.length}
        selectedCategory={selectedCategory}
        onSelectCategory={(category) => setSelectedCategory(category)}
      />

      <div className="min-w-0">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:max-w-sm">
            <Search
              aria-hidden
              className="pointer-events-none absolute inset-s-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <DebouncedInput
              ref={searchInputRef}
              type="search"
              aria-label="Search bookmarks"
              placeholder="Search bookmarks..."
              value={query}
              onDebouncedChange={(value) => setQuery(value)}
              className="ps-9 pe-10"
            />
            <Kbd className="absolute inset-e-3 top-1/2 -translate-y-1/2">/</Kbd>
          </div>

          <p
            aria-live="polite"
            className="text-sm text-muted-foreground sm:ms-auto"
          >
            {visibleBookmarks.length}{" "}
            {visibleBookmarks.length === 1 ? "bookmark" : "bookmarks"}
            {selectedCategory
              ? ` in ${bookmarkCategories[selectedCategory].label}`
              : null}
          </p>

          {hasFilters ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setQuery("");
                setSelectedCategory(null);
                setSelectedTags([]);
              }}
            >
              <X /> Clear
            </Button>
          ) : null}
        </div>

        {selectedTags.length > 0 ? (
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="text-xs tracking-widest text-muted-foreground/70 uppercase">
              Tags
            </span>

            {selectedTags.map((tag) => (
              <Button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                title={`Remove the ${tag} filter`}
                className="flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary/70 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                #{tag}
                <X aria-hidden className="size-3" />
              </Button>
            ))}
          </div>
        ) : null}

        <div className="rounded-2xl border border-border/60 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] bg-size-[16px_16px] p-3 sm:p-4">
          {visibleBookmarks.length > 0 ? (
            <div className="grid gap-3 transition-opacity sm:grid-cols-2 2xl:grid-cols-3">
              {visibleBookmarks.map((bookmark) => (
                <BookmarkCard
                  key={bookmark.url}
                  item={bookmark}
                  selectedTags={selectedTags}
                  onToggleTag={toggleTag}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
              <SearchX
                aria-hidden
                className="mb-4 size-10 text-muted-foreground/50"
              />
              <h2 className="mb-2 text-lg font-medium text-foreground">
                No bookmarks found
              </h2>
              <p className="max-w-md text-sm text-muted-foreground">
                Nothing matches{" "}
                {query.trim() ? (
                  <span className="font-medium text-foreground">
                    “{query.trim()}”
                  </span>
                ) : (
                  "the current filters"
                )}
                . Try a different search, remove a tag or pick another category.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export { BookmarkSection };
