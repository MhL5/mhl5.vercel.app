import SnippetsList from "@/app/(with-navigation)/snippets/_components/SnippetsList";
import MDXRemoteComponent from "@/MDXRemote";
import { fileReader } from "@/utils/fileReader";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Code Snippets Collection",
    description:
      "React snippets collections, built on top of shadcn/ui for use inside React and Next.js projects.",
  };
}

export default async function Page() {
  const content = await fileReader("contents/snippets/snippets.mdx");

  return (
    <>
      <MDXRemoteComponent source={content} />

      <div className="mt-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Snippets Collection
          </h2>
          <p className="text-muted-foreground mt-2">
            Browse through our categorized collection of React and Next.js code
            snippets
          </p>
        </div>
        <SnippetsList />
      </div>
    </>
  );
}
