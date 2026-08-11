import { type Bookmark } from "@/app/(with-navigation)/bookmarks/_constants";

/**
 * Everything a bookmark can be matched against: title, description, tags,
 * hostname and the category label. Built once per bookmark.
 */
const searchIndexCache = new WeakMap<Bookmark, string>();

function getSearchIndex(bookmark: Bookmark) {
  const cached = searchIndexCache.get(bookmark);
  if (cached) return cached;

  const searchIndex = [
    bookmark.title,
    bookmark.description,
    bookmark.tags?.join(" ") ?? "",
    getBookmarkHostname(bookmark.url),
    bookmark.category,
  ]
    .join(" ")
    .toLowerCase();

  searchIndexCache.set(bookmark, searchIndex);
  return searchIndex;
}

/** Every whitespace separated term has to match, order does not matter. */
function filterBookmarks(bookmarks: Bookmark[], query: string) {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return bookmarks;

  return bookmarks.filter((bookmark) => {
    const searchIndex = getSearchIndex(bookmark);
    return terms.every((term) => searchIndex.includes(term));
  });
}

/** Selected tags narrow the list down, a bookmark has to carry all of them. */
function filterBookmarksByTags(bookmarks: Bookmark[], tags: string[]) {
  if (tags.length === 0) return bookmarks;

  return bookmarks.filter((bookmark) =>
    tags.every((tag) => bookmark.tags?.includes(tag)),
  );
}

function getBookmarkHostname(url: string) {
  return new URL(url).hostname.replace(/^www\./, "");
}

function getBookmarkFaviconUrl(url: string) {
  return `https://www.google.com/s2/favicons?domain=${getBookmarkHostname(url)}&sz=64`;
}

export {
  filterBookmarks,
  filterBookmarksByTags,
  getBookmarkFaviconUrl,
  getBookmarkHostname,
};
