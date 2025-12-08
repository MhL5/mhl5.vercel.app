"use client";

import { Monitor, Search } from "lucide-react";
import { useState, useTransition, ViewTransition } from "react";
import BookmarkCard from "@/app/(with-navigation)/bookmarks/_components/BookmarkCard";
import {
  allBookmarks,
  bookmarkCategoryConfig,
} from "@/app/(with-navigation)/bookmarks/_constants/bookmarksConstants";
import { Button } from "@/components/ui/button";
import { toSentenceCase } from "@/registry/utils/formatters/formatters";

export default function BookmarkMain() {
  return (
    <section className="mx-auto min-h-svh max-w-7xl px-4 py-8 md:px-6">
      <div className="mb-8">
        <h1 className="flex items-center gap-3 font-bold text-4xl text-foreground capitalize tracking-tight sm:gap-4 sm:text-5xl">
          Bookmarks
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          A curated collection of interesting links, articles, and resources
          I've saved. From development tools to design inspiration, these are
          the digital gems I keep coming back to.
        </p>
      </div>

      <BookmarkMainHeader />
      {/* <SearchableLayoutGrid {...props} /> */}
    </section>
  );
}

function BookmarkMainHeader() {
  const [bookmarks, setBookmarks] = useState(allBookmarks);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [, startTransition] = useTransition();

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search bookmarks..."
            onChange={(e) => {
              startTransition(() => {
                const searchQuery = e.target.value.toLowerCase().trim();

                const filteredBookmarks = allBookmarks.filter((bookmark) => {
                  const bookmarkTitle = bookmark.title.toLowerCase().trim();
                  const bookmarkDescription = bookmark.description
                    .toLowerCase()
                    .trim();

                  return (
                    bookmarkTitle.includes(searchQuery) ||
                    bookmarkDescription.includes(searchQuery)
                  );
                });

                setBookmarks(filteredBookmarks);
              });
            }}
            className="w-full rounded-lg border bg-background py-2 pr-4 pl-10 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {Object.keys(bookmarkCategoryConfig).map((category, i) => {
            if (!category) return null;

            return (
              <Button
                key={`${category + i}-bookmark-main-header-button`}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  startTransition(() => {
                    if (selectedCategory === category) {
                      setSelectedCategory("All");
                      setBookmarks(allBookmarks);
                      return;
                    }
                    const filteredBookmarks = allBookmarks.reduce(
                      (acc, bookmark) => {
                        if (bookmark.category === category) {
                          acc.unshift(bookmark);
                          return acc;
                        }
                        acc.push(bookmark);
                        return acc;
                      },
                      [] as typeof allBookmarks,
                    );

                    setSelectedCategory(category);
                    setBookmarks(filteredBookmarks);
                  });
                }}
                className="text-xs"
              >
                {toSentenceCase(category)}
              </Button>
            );
          })}
        </div>
      </div>

      <section className="min-h-[50svh]">
        {bookmarks.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bookmarks.map((bookmark) => (
              <ViewTransition key={bookmark.title}>
                <BookmarkCard item={bookmark} />
              </ViewTransition>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Monitor className="mb-4 h-12 w-12 text-muted-foreground/50" />
            <h3 className="mb-2 font-medium text-foreground text-lg">
              No items found
            </h3>
            <p className="max-w-md text-muted-foreground">
              Try adjusting your search query or selected category to find what
              you&apos;re looking for.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
