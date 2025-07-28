"use client";

import BookmarkCard from "@/app/(with-navigation)/bookmarks/_components/BookmarkCard";
import { allBookmarks } from "@/app/(with-navigation)/bookmarks/_constants/bookmarksConstants";
import SearchableLayout from "@/components/SearchableLayout";

export default function BookmarksPage() {
  return (
    <SearchableLayout
      title="Bookmarks"
      description="A curated collection of interesting links, articles, and resources I've saved. From development tools to design inspiration, these are the digital gems I keep coming back to."
      items={allBookmarks}
      render={(item) => <BookmarkCard key={item.title} item={item} />}
      filter={(item, searchQuery, selectedCategory) => {
        const matchesSearch =
          searchQuery === "" ||
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory =
          selectedCategory === "All" || item.category === selectedCategory;

        return matchesSearch && matchesCategory;
      }}
      categories={allBookmarks.map((item) => item.category)}
    />
  );
}
