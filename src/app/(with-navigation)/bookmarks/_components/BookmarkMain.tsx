"use client";

import BookmarkCard from "@/app/(with-navigation)/bookmarks/_components/BookmarkCard";
import {
  allBookmarks,
  bookmarkCategoryConfig,
} from "@/app/(with-navigation)/bookmarks/_constants/bookmarksConstants";
import { Button } from "@/components/ui/button";
import DebouncedInput from "@/registry/new-york/DebouncedInput/DebouncedInput";
import { toSentenceCase } from "@/registry/utils/formatters/formatters";
import { Monitor, Search } from "lucide-react";
import { ViewTransition, useState, useTransition } from "react";

export default function BookmarkMain() {
  return (
    <section className="mx-auto min-h-svh max-w-7xl px-4 py-8 md:px-6">
      <div className="mb-8">
        <h1 className="flex items-center gap-3 text-4xl font-bold tracking-tight text-foreground capitalize sm:gap-4 sm:text-5xl">
          Bookmarks
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          A collection of interesting links, articles, and resources I&rsquo;ve
          saved. From development tools to design inspiration, these are the
          digital gems I keep coming back to.
        </p>
      </div>

      <BookmarkMainContent />
    </section>
  );
}

function BookmarkMainContent() {
  const [bookmarks, setBookmarks] = useState(allBookmarks);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [, startTransition] = useTransition();

  return (
    <>
      <div
        id="main"
        className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="relative max-w-md flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <DebouncedInput
            type="text"
            placeholder="Search bookmarks..."
            onDebouncedChange={(value) => {
              startTransition(() => {
                const searchQuery = value.toLowerCase().trim();

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
            className="py-2 pr-4 pl-10 text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {Object.keys(bookmarkCategoryConfig).map((category) => {
            if (!category) return null;

            return (
              <Button
                key={`${category}-bookmark-main-header-button`}
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
            <h3 className="mb-2 text-lg font-medium text-foreground">
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
