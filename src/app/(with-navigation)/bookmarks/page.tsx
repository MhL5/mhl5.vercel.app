import { BookmarkSection } from "./_components/BookmarkSection";

export default function Page() {
  return (
    <section className="mx-auto min-h-svh w-full max-w-7xl px-4 py-8 md:px-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Bookmarks
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Hand-picked links, tools and resources I keep coming back to — from
          component libraries and design systems to the things I read to stay
          current.
        </p>
      </header>

      <BookmarkSection />
    </section>
  );
}
